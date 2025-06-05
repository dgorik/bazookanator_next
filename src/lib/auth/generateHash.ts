import bcrypt from "bcryptjs"

export default async function generateHash(value: string){
    return bcrypt.hash(value, 10);
}