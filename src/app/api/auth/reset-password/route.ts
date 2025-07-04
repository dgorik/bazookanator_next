import User from "@/(models)/User"
import compareTokens from "@/lib/auth/compareTokens"
import { NextRequest, NextResponse  } from 'next/server';
import { connectMongoDB } from '@/config/clients/mongodb';
import { addUser } from '@/lib/db/users';

export async function GET(req: NextRequest) {
  try {

    return NextResponse.json({ message: 'Verified, redirecting....' });
  } catch (err) {
    return NextResponse.json({ error: "Please try again" }, { status: 500 });
  }
}
