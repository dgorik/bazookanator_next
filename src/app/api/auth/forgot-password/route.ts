import { NextRequest, NextResponse } from "next/server"
import User from "@/(models)/User"
import crypto from "crypto"
import generateHash from "@/lib/auth/generateHash"
import { addPasswordResetToken } from "@/lib/db/passwordResetToken"
import { sendPasswordResetEmail } from "@/lib/auth/sendResetPasswordEmail"

export async function POST(req: NextRequest) {
  let body

  try {
    body = await req.json()
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid JSON request.",
      },
      { status: 400 }
    )
  }

  const { email } = body

  if (!email || typeof email !== "string") {
    return NextResponse.json(
      {
        success: false,
        message: "Email is required.",
      },
      { status: 400 }
    )
  }

  let user
  try {
    user = await User.findOne({ email })
  } catch (error) {
    console.error("DB error while finding user:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    )
  }

  if (!user) {
    return NextResponse.json({
      success: true,
      message: "If an account with that email exists, a password reset email has been sent.",
    })
  }

  const token = crypto.randomBytes(32).toString("hex")
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  const hashed_token = await generateHash(token)

  try {
    await addPasswordResetToken(email, hashed_token, expiresAt)
  } catch (error) {
    console.error("Error saving reset token:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to save the token to the database.",
      },
      { status: 500 }
    )
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  const verificationUrl = `${baseUrl}/auth/reset-password?token=${token}`

  try {
    await sendPasswordResetEmail(verificationUrl, expiresAt)
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send an email with a token.",
      },
      { status: 500 }
    )
  }

  return NextResponse.json({
    success: true,
    message: "If an account with that email exists, a password reset email has been sent.",
  })
}
