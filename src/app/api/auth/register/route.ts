import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import User from "@/(models)/User"
import generateHash from "@/lib/auth/generateHash"
import {addPendingUser} from "@/lib/db/users"
import { sendVerificationEmail } from "@/lib/auth/sendVerificationEmail"

// Email transporter setup

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
    const { email, password, first_name, last_name} = body

    if (!email || !password || !first_name || !last_name) {
        return NextResponse.json(
          {
            success: false,
            message: "All fields are required",
          },
          { status: 400 }
        )
      }

      try {
        const user = await User.findOne({ email })
        if (user) {
        return NextResponse.json({
          success: false,
          message: "A user with this email already exists",
        })
      }
      } catch (error) {
        return NextResponse.json(
          {
            success: false,
            message: "Unkown error",
          },
          { status: 500 }
        )
      }
     

    const verification_token = crypto.randomBytes(32).toString("hex")
    const hashed_token = await generateHash(verification_token)
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) 
    const hashed_password = await generateHash(password)

    try {
        await addPendingUser(email, hashed_password, first_name, last_name, hashed_token, expiresAt);
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
    const verificationUrl = `${baseUrl}/auth/verify-email?token=${verification_token}&email=${encodeURIComponent(email)}`

    try {
       await sendVerificationEmail("dg186533@gmail.com", verificationUrl, expiresAt)
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
      message: "Registration successful. Please check your email to verify your account.",
    })
}
