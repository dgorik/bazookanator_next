import connectEmail from "@/config/connect_email"

const transporter = await connectEmail()

export async function sendPasswordResetEmail(verificationUrl: string, verification_token_expires: Date ){
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
    
}