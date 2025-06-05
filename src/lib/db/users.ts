import User from "@/(models)/User";
import PendingUser from "@/(models)/PendingUser";


export async function addUser(
  email: string,
  password: string,
  first_name: string,
  last_name: string,
) {
  const newUser = new User({
    email,
    password,
    first_name,
    last_name,
  });

  await newUser.save();
}


export async function addPendingUser(
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  hashed_token: string,
  expiresAt: Date
) {
  const newPendingUser = new PendingUser({
    email,
    password,
    first_name,
    last_name,
    hashed_token,
    expiresAt,
  });

  await newPendingUser.save();
}
