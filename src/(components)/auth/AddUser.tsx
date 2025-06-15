import React from "react";
import User from "@/(models)/User";

export default async function AddUser(
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  verification_token: string
) {
  const newUser = new User({
    email,
    password,
    first_name,
    last_name,
    verification_token,
    verified: true,
  });

  await newUser.save();
}
