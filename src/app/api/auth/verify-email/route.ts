import PendingUser from '@/(models)/PendingUser'
import compareTokens from "@/lib/auth/compareTokens"
import { NextRequest, NextResponse  } from 'next/server';
import { connectMongoDB } from '@/lib/clients/mongodb';
import { addUser } from '@/lib/db/users';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');
    const email = url.searchParams.get('email');

    if (!token || !email) {
      return NextResponse.json({ error: "Missing token or email" }, { status: 400 });
    }

    await connectMongoDB();

    const pendingUser = await PendingUser.findOne({ email });

    if (!pendingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isValid = await compareTokens(token, pendingUser.hashed_token);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    const current_time = new Date();
    if (pendingUser.expiresAt < current_time) {
      return NextResponse.json({ error: "Token has expired" }, { status: 401 });
    }

    await addUser(pendingUser.email, pendingUser.password, pendingUser.first_name, pendingUser.last_name);

    await PendingUser.deleteOne({ _id: pendingUser._id });

    return NextResponse.json({ message: 'Verified, redirecting....' });
  } catch (err) {
    return NextResponse.json({ error: "Please try again" }, { status: 500 });
  }
}
