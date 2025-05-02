import  { NextRequest, NextResponse } from "next/server";
import validator from 'validator';

type LoginRequestBody = {
  email: string;
  password: string;
};

type ValidationError = {
  msg: string;
};

export async function POST( ///google this more
  req: NextRequest,
  res: NextResponse
) {
  if (req.method === "POST") {
    const {email, password} = await req.json()
    const ValidationError = []

    if (!validator.isEmail(email))
      ValidationError.push({ msg: "Please enter a valid email address." });
    if (!email.endsWith('@bazooka-inc.com')){
      ValidationError.push({ msg: "Please enter bazooka-inc.com emails." });
    }
    if (!ValidationError.length) {
      return NextResponse.json({ message: "hiiiii"}, { status: 200 });
    }

    // Log the email and name to the console
    console.log("Received email:", email);
    console.log("Received name:", password);

    // Respond with a success message
    return NextResponse.json({ message: "Data received successfully!" });
  } else {
    // Handle other HTTP methods (e.g., GET)
    return NextResponse.json({ message: "Method Not Allowed" });
  }
}
