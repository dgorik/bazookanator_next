import crypto from "crypto"
import generateHash from "@/lib/auth/generateHash" 
import User from "@/(models)/User"
import { NextRequest, NextResponse } from "next/server"
import { sendPasswordResetEmail } from "@/lib/auth/sendResetPasswordEmail";

export async function POST (request: NextRequest){
    try{
        const body = await request.json()
        const {email} = body
        const user = await User.findOne({ email })

        const token = crypto.randomBytes(32).toString("hex")
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) //change this
        const hashed_token = await generateHash(token)

        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
        const verificationUrl = `${baseUrl}/auth/verify-token?token=${hashed_token}`
        
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