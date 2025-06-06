// app/api/verify-email.ts
import { NextResponse } from 'next/server';

export async function GET (req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');
  console.log(token)
  return NextResponse.json({ message: 'Email verification endpoint' });
}
