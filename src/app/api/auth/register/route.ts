import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import connectEmail from "../../../../config/connect_email"
import AddPendingUser from "@/lib/auth/AddPendingUser"
import hashPassword from "@/lib/auth/hashPassword"

// Email transporter setup
const transporter = await connectEmail()

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

    await AddPendingUser(email, hashed_password, first_name, last_name, verification_token, createdAt);

    // Here you would create the user in your database
    // For example:
    // const hashedPassword = await hashPassword(password)
    // const user = await db.user.create({
    //   data: {
    //     email,
    //     name,
    //     password: hashedPassword,
    //     verificationToken,
    //     verificationExpires,
    //     isVerified: false,
    //   },
    // })

    // Generate verification URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    const verificationUrl = `${baseUrl}/verify-email?token=${verification_token}&email=${encodeURIComponent(email)}`

    // Send verification email
    await transporter.sendMail({
      from: `"Your App" <${process.env.EMAIL_USERNAME}>`,
      to: "dg186533@gmail.com",
      subject: "Please verify your email address",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h1 style="color: #333; text-align: center;">Email Verification</h1>
          <p>Hello</p>
          <p>Thank you for registering. Please verify your email by clicking the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">Verify Email</a>
          </div>
          <p>If the button doesn't work, you can also click on this link or copy it to your browser:</p>
          <p><a href="${verificationUrl}">${verificationUrl}</a></p>
          <p>This link will expire at ${verification_token_expires}.</p>
          <p>If you did not create an account, please ignore this email.</p>
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #666; font-size: 12px;">
            <p>This is an automated email, please do not reply.</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({
      success: true,
      message: "Registration successful. Please check your email to verify your account.",
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ success: false, message: "An error occurred during registration" }, { status: 500 })
  }
}
