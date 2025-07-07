import PendingUser from '@/(models)/PendingUser'
import User from '@/(models)/User';
import { connectMongoDB } from '@/config/clients/mongodb';
import compareTokens from "@/lib/auth/compareTokens"

export async function verifyToken(urlStr: string, collection_type: string) {
  try {
    const url = new URL(urlStr); // correct usage
    const token = url.searchParams.get('token');
    const email = url.searchParams.get('email');

    if (!token || !email) {
      return { valid: false, error: "Missing token or email" };
    }

    await connectMongoDB();

    if (collection_type === "Pending") {
      const pendingUser = await PendingUser.findOne({ email });
      if (!pendingUser) {
        return { valid: false, error: 'User not found' };
      }

      const isValid = await compareTokens(token, pendingUser.hashed_token);
      if (!isValid) {
        return { valid: false, error: 'Invalid Token' };
      }

      const now = new Date();
      if (pendingUser.expiresAt < now) {
        return { valid: false, error: 'Token has expired' };
      }

      return { valid: true, user: pendingUser }; // ✅ return user if needed
    }

    if (collection_type === "User") {
      const user = await User.findOne({ email });
      if (!user) {
        return { valid: false, error: 'User not found' };
      }

      const isValid = await compareTokens(token, user.hashed_token);
      if (!isValid) {
        return { valid: false, error: 'Invalid Token' };
      }

      const now = new Date();
      if (user.expiresAt < now) {
        return { valid: false, error: 'Token has expired' };
      }

      return { valid: true, user };
    }

    return { valid: false, error: "Unknown collection type" };

  } catch (err) {
    console.error("Token verification error:", err);
    return { valid: false, error: "Server error" };
  }
}
