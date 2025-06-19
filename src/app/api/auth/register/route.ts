import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import addPendingUser from "@/lib/auth/addPendingUser"
import hashPassword from "@/lib/auth/hashPassword"
import { sendVerificationEmail } from "@/lib/auth/sendVerificationEmail"

// Email transporter setup

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json()
    const { email, password, first_name, last_name} = body

    // Here you would check if the user already exists in your database
    // For example:
    // const existingUser = await db.user.findUnique({ where: { email } })
    // if (existingUser) {
    //   return NextResponse.json(
    //     { success: false, message: "User already exists" },
    //     { status: 400 }
    //   )
    // }

    // Generate verification token
    const verification_token = crypto.randomBytes(32).toString("hex")
    const createdAt = new Date(Date.now())
    const verification_token_expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    const hashed_password = await hashPassword(password)

    await addPendingUser(email, hashed_password, first_name, last_name, verification_token, createdAt);


    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    const verificationUrl = `${baseUrl}/verify-email?token=${verification_token}`

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
