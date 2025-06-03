// app/api/verify-email.ts
import { NextRequest, NextResponse  } from 'next/server';
import PendingUser from '@/(models)/PendingUser';
import User from '@/(models)/User';

export async function GET (req: NextRequest) {

  try{
    const url = new URL(req.url);
    const token = url.searchParams.get('token');
    const pendingUser = await PendingUser.findOne({ verification_token: token})

    await User.create({
      email: pendingUser.email,
      password: pendingUser.password,
      first_name: pendingUser.first_name,
      last_name: pendingUser.last_name,
    })

    if(!pendingUser){
      console.log("User not found")
    }

    return NextResponse.json({ message: 'Verified, redirecting....' });

  }

  catch(err){
    return NextResponse.json({ error: 'Token invalid or expired' }, { status: 401 });
  }
  
}
