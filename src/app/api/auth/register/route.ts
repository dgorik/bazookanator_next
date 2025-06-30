import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import addPendingUser from "@/lib/auth/addPendingUser"
import hashPassword from "@/lib/auth/hashPassword"
import { sendVerificationEmail } from "@/lib/auth/sendVerificationEmail"
import { connectMongoDB } from "@/lib/clients/mongodb"

// Email transporter setup

export async function POST(request: NextRequest) {
  try {
    await connectMongoDB()
    const body = await request.json()
    const { email, password, first_name, last_name} = body

    
    const verification_token = crypto.randomBytes(32).toString("hex")
    const expiresAt = new Date(Date.now() + 1000) //change this
    const verification_token_expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // change this
    const hashed_password = await hashPassword(password)

    await addPendingUser(email, hashed_password, first_name, last_name, verification_token, expiresAt);


    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    const verificationUrl = `${baseUrl}/auth/verify-email?token=${verification_token}`

    await sendVerificationEmail(verificationUrl, verification_token_expires)

    
    return NextResponse.json({
      success: true,
      message: "Registration successful. Please check your email to verify your account.",
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ success: false, message: "An error occurred during registration" }, { status: 500 })
  }
}
