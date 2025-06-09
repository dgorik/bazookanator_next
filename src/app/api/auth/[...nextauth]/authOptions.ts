import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../../(models)/User";
import bcrypt from "bcryptjs";
import validator from "validator";
import { connectMongoDB } from "@/lib/clients/mongodb";

type Credentials = {
    email: string;
    password: string;
  };

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "text",
          placeholder: "your-email@bazooka-inc.com",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your-password",
        }
      },
      async authorize(credentials: Credentials | undefined) {
        await connectMongoDB()
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        //it would make more sense to check the validity of inputs (format) on the client site (unless we are checking the credintials against the database)

        if (!validator.isEmail(credentials.email)) {
          throw new Error("Please enter a valid email address");
        }

        if (!credentials.email.endsWith("@bazooka-inc.com")) {
          throw new Error("Please use a bazooka-inc.com email");
        }
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found with this email");
        }

        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isMatch) {
          throw new Error("Incorrect password");
        }
        return {
          email: user.email,
          name: user.first_name,
          image: null, 
          role: null
        } as any
      }
    })
  ],
  session: {
    maxAge: 180, 
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  // callbacks: {
  //   // // async jwt({ token, user }: { token: any; user?: any }) { //revisit these types
  //   // //   if (user) token.role = user.role;
  //   // //   return token;
  //   // // },
  //   // async session({ session, token }:{ session?: any; token: any }) {
  //   //   if (session?.user) session.user.role = token.role;
  //   //   return session;
  //   // },
  // },
};
