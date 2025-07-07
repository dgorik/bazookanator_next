import PasswordResetToken from "@/(models)/PasswordResetToken";
import { connectMongoDB } from "../../config/clients/mongodb";

export async function addPasswordResetToken(
  email: string,
  hashedToken: string,
  expiresAt: Date
) {
  await connectMongoDB()
  const newToken = new PasswordResetToken({
    email,
    hashedToken,
    expiresAt,
  });

  await newToken.save();
}
