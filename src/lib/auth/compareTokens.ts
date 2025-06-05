import bcrypt from "bcryptjs";

export default async function compareTokens(rawToken: string, hashedToken: string){
  return bcrypt.compare(rawToken, hashedToken);
}