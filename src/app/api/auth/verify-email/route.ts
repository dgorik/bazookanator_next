import { NextRequest, NextResponse  } from 'next/server';
import { connectMongoDB } from '@/lib/clients/mongodb';
import User from "@/(models)/User"
import PendingUser from '@/(models)/PendingUser'
import { addUser } from '@/lib/db/users';
import { verifyToken } from '@/lib/auth/verifyToken';

export async function GET(req: NextRequest) {
  try {
    const result = await verifyToken(req.url, "Pending")

    if (!result.valid) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    const pendingUser = result.user;

    await connectMongoDB();
    
    await addUser(pendingUser.email, pendingUser.password, pendingUser.first_name, pendingUser.last_name);

    await PendingUser.deleteOne({ _id: pendingUser._id });

    return NextResponse.json({ message: 'Verified, redirecting....' });
  } catch (err) {
    return NextResponse.json({ error: "Please try again" }, { status: 500 });
  }
}
