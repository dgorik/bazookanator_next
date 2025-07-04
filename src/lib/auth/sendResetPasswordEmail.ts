import connectEmail from "@/config/clients/gmail_transporter"

const transporter = await connectEmail()

export async function sendPasswordResetEmail(resetUrl: string, resetTokenExpires: Date ){
  await transporter.sendMail({
  from: `"Your App" <${process.env.EMAIL_USERNAME}>`,
  to: "dg186533@gmail.com", 
  subject: "Reset your password",
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <h1 style="color: #333; text-align: center;">Password Reset Request</h1>
      <p>Hello,</p>
      <p>We received a request to reset the password for your account.</p>
      <p>If you made this request, you can reset your password by clicking the button below:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">Reset Password</a>
      </div>
      <p>If the button doesn't work, you can also click or copy and paste this link into your browser:</p>
      <p><a href="${resetUrl}">${resetUrl}</a></p>
      <p>This link will expire at <strong>${resetTokenExpires}</strong>.</p>
      <p>If you did not request a password reset, please ignore this email. Your password will remain unchanged.</p>
      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #666; font-size: 12px;">
        <p>This is an automated message — please do not reply.</p>
      </div>
    </div>`
  })
}