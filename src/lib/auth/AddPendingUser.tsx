import React from "react";
import PendingUser from "@/(models)/PendingUser";

export default async function AddPendingUser(
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  verification_token: string,
  createdAt: Date
) {
  const newUser = new PendingUser({
    email,
    password,
    first_name,
    last_name,
    verification_token,
    createdAt,
  });

  await newUser.save();
}
