import { NextRequest, NextResponse } from "next/server";

export async function POST( ///google this more
  req: NextRequest,
  res: NextResponse
) {
  if (req.method === "POST") {
    // Extract email and name from the request body
    const { email, password } = await req.json()

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
