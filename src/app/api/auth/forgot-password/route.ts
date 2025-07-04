import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import generateHash from "@/lib/auth/generateHash"
import { addPasswordResetToken } from "@/lib/db/passwordResetToken"
import { sendPasswordResetEmail } from "@/lib/auth/sendResetPasswordEmail"

export async function POST (req: NextRequest){
    try{
        const body = await req.json()
        const {email} = body

        const token = crypto.randomBytes(32).toString("hex")
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) //change this
        const hashed_token = await generateHash(token)
        await addPasswordResetToken(email, hashed_token, expiresAt)

        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
        const verificationUrl = `${baseUrl}/auth/reset-password?token=${hashed_token}`
        
        await sendPasswordResetEmail(verificationUrl, expiresAt)

        return NextResponse.json({
            success: true,
            message: email
        })

    }
    catch(error){
        return NextResponse.json({
            success: false,
            message: "If an account with that email exists, a password reset email has been sent.",
        })
    }
}