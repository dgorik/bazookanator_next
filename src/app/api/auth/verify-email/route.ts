// app/api/verify-email.ts
import { NextRequest, NextResponse  } from 'next/server';
import { connectMongoDB } from '@/lib/clients/mongodb';
import PendingUser from '@/(models)/PendingUser'
import addUser from '@/lib/auth/addUser';

export async function GET (req: NextRequest) {

  try{
    const url = new URL(req.url);
    const token = url.searchParams.get('token');
    await connectMongoDB()
    const pendingUser = await PendingUser.findOne({ verification_token: token})

    const current_time = new Date()

    if(pendingUser.expiresAt < current_time){
      return NextResponse.json({ error: "Token has expired" }, { status: 401 });
    }

    if (!pendingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await addUser(pendingUser.email, pendingUser.password, pendingUser.first_name, pendingUser.last_name);

    await PendingUser.deleteOne({ _id: pendingUser._id });

    return NextResponse.json({ message: 'Verified, redirecting....' });

  }

  catch(err){
    return NextResponse.json({ error: "Please try again" }, { status: 401 });
  }
  
}
