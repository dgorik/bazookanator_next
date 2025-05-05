import  { NextRequest, NextResponse } from "next/server";
import validator, { normalizeEmail } from 'validator';
import User from "@/models/User";

type Credentials = {
  email: string;
  password: number;
};

type ValidationError = { msg: string }[]; // ValidationError is an array of objects

export async function POST( ///google this more
  req: NextRequest,
  res: NextResponse //this is a response object in app route
) {
  if (req.method === "POST") {
    const ValidationErrors: ValidationError =  []

    const {email, password}: Credentials = await req.json()

    if(!email || !password){
      ValidationErrors.push({ msg: "Email and password are required" });
    }

    if (!validator.isEmail(email))
      ValidationErrors.push({ msg: "Please enter a valid email address." });
    if (!email.endsWith('@bazooka-inc.com')){
      ValidationErrors.push({ msg: "Please enter bazooka-inc.com email." });
    }
    if (validator.isEmpty(email))
      ValidationErrors.push({ msg: "Password cannot be blank." });
  
    if (ValidationErrors.length) {
      return NextResponse.json(ValidationErrors)
    }
    let normalized_email = validator.normalizeEmail(email, {
      gmail_remove_dots: false,
    });
    return NextResponse.json([{msg: `${normalized_email}`}])

  } else {
    // Handle other HTTP methods (e.g., GET)
    return NextResponse.json({ message: "Method Not Allowed" });
  }
}
