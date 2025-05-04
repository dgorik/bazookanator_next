import  { NextRequest, NextResponse } from "next/server";
import validator from 'validator';

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
    const {email, password} = await req.json()
    const ValidationError = []

    if (!validator.isEmail(email))
      ValidationError.push({ msg: "Please enter a valid email address." });
    if (!email.endsWith('@bazooka-inc.com')){
      ValidationError.push({ msg: "Please enter bazooka-inc.com email." });
    }
    if (validator.isEmpty(password))
      ValidationError.push({ msg: "Password cannot be blank." });

    if (!validator.isLength(password, { min: 8 }))
      ValidationError.push({
        msg: "Password must be at least 8 characters long",
      });
  
    if (ValidationError.length) {
      return NextResponse.json(ValidationError)
    }
  } else {
    // Handle other HTTP methods (e.g., GET)
    return NextResponse.json({ message: "Method Not Allowed" });
  }
}
