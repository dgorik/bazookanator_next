import PasswordResetToken from "@/(models)/PasswordResetToken";
import { connectMongoDB } from "../clients/mongodb";

export async function addPasswordResetToken(
  email: string,
  hashed_token: string,
  expiresAt: Date
) {
  await connectMongoDB()
  const newToken = new PasswordResetToken({
    email,
    hashed_token,
    expiresAt,
  });

  await newToken.save();
}
