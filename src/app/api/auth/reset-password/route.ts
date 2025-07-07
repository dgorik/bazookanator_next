import { NextRequest, NextResponse  } from 'next/server';
import { verifyToken } from '@/lib/auth/verifyToken';

export async function GET(req: NextRequest) {
  try {

    const result = await verifyToken(req.url, "User")

    if (!result.valid) {
          return NextResponse.json({ error: result.error }, { status: 400 });
        }
    const user = result.user;

    console.log(user)

    return NextResponse.json({ valid: true});
  } catch (err) {
    return NextResponse.json({ error: "Please try again" }, { status: 500 });
  }
}
