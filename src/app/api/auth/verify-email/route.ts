// app/api/verify-email.ts
import { NextRequest, NextResponse  } from 'next/server';
import PendingUser from '@/(models)/PendingUser'
import addUser from '@/lib/auth/addUser';

export async function GET (req: NextRequest) {

  try{
    const url = new URL(req.url);
    const token = url.searchParams.get('token');
    const pendingUser = await PendingUser.findOne({ verification_token: token})

    if(!pendingUser){
      console.log("User not found")
    }

    await addUser(pendingUser.email, pendingUser.password, pendingUser.first_name, pendingUser.last_name);

    await PendingUser.deleteOne({ _id: pendingUser._id });

    return NextResponse.json({ message: 'Verified, redirecting....' });

  }

  catch(err){
    return NextResponse.json({ error: 'Token invalid or expired' }, { status: 401 });
  }
  
}
