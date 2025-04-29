import  { NextRequest, NextResponse } from "next/server";
import validator from 'validator';
import User from "@/(models)/User";

type Credentials = {
  email: string;
  password: string;
};

type ValidationError = { msg: string }[]; // ValidationError is an array of objects

export async function POST( ///google this more
  req: NextRequest,
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
  
    if (ValidationErrors.length) {
      return NextResponse.json(ValidationErrors)
    }
    let normalized_email = validator.normalizeEmail(email, {
      gmail_remove_dots: false,
    });

    return NextResponse.json([{msg: "Got it!"}])

  } else {
    // Handle other HTTP methods (e.g., GET)
    return NextResponse.json({ message: "Method Not Allowed" });
  }
}
