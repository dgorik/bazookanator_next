import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/(models)/User";
import bcrypt from "bcryptjs";
import validator from "validator";

type Credentials = {
    email: string;
    password: string;
  };

export const options = {
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
        },
      },
      async authorize(credentials: Credentials | undefined) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

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
        return user
      },
    }),
  ],
};
