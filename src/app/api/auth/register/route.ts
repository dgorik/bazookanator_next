import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import User from "@/(models)/User"
import generateHash from "@/lib/auth/generateHash"
import {addPendingUser} from "@/lib/db/users"
import { sendVerificationEmail } from "@/lib/auth/sendVerificationEmail"

// Email transporter setup

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, first_name, last_name} = body

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        success: false,
        error: "A user with this email already exists.",
      }, { status: 400 });
    }

    const verification_token = crypto.randomBytes(32).toString("hex")
    const hashed_token = await generateHash(verification_token)
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) 
    const hashed_password = await generateHash(password)

    await addPendingUser(email, hashed_password, first_name, last_name, hashed_token, expiresAt);

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    const verificationUrl = `${baseUrl}/auth/verify-email?token=${verification_token}&email=${encodeURIComponent(email)}`

    await sendVerificationEmail("dg186533@gmail.com", verificationUrl, expiresAt)

    return NextResponse.json({
      success: true,
      message: "Registration successful. Please check your email to verify your account.",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "An error occurred during registration" }, { status: 500 })
  }
}
