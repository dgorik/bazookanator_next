import PendingUser from "@/(models)/PendingUser";

export default async function addPendingUser(
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  verification_token: string,
  expiresAt: Date
) {
  const newUser = new PendingUser({
    email,
    password,
    first_name,
    last_name,
    verification_token,
    expiresAt,
  });

  await newUser.save();
}
