import  { NextRequest, NextResponse } from "next/server";
import validator from 'validator';
import User from "@/models/User";

// type LoginRequestBody = {
//   email: string;
//   password: number;
// };

type ValidationError = {
  msg: string;
};

export async function POST( ///google this more
  req: NextRequest,
  res: NextResponse //this is a response object in app route
) {
  if (req.method === "POST") {
    const ValidationError = []

    let {email, password} = await req.json()

    if(!email || !password){
      ValidationError.push({ msg: "Email and password are required" });
    }

    if (!validator.isEmail(email))
      ValidationError.push({ msg: "Please enter a valid email address." });
    if (!email.endsWith('@bazooka-inc.com')){
      ValidationError.push({ msg: "Please enter bazooka-inc.com email." });
    }
    if (validator.isEmpty(email))
      ValidationError.push({ msg: "Password cannot be blank." });
  
    if (ValidationError.length) {
      return NextResponse.json(ValidationError)
    }
    email = validator.normalizeEmail(email, {
      gmail_remove_dots: false,
    });
    return NextResponse.json([{msg: `${email}`}])

  } else {
    // Handle other HTTP methods (e.g., GET)
    return NextResponse.json({ message: "Method Not Allowed" });
  }
}
