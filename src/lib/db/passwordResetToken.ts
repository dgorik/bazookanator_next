import PasswordResetToken from "@/(models)/PasswordResetToken";

export async function addPasswordResetToken(
  email: string,
  hashed_token: string,
  expiresAt: Date
) {
  const newToken = new PasswordResetToken({
    email,
    hashed_token,
    expiresAt,
  });

  await newToken.save();
}
