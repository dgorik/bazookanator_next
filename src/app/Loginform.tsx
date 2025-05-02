"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "../components/ui/button";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const PostUsers = async () => {
    console.log(password);
    console.log(email);

    fetch("/api/auth/login", {
      //google the differnce between pages and app folders
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  };

  return (
    // <div className={cn("flex flex-col gap-6", className)} {...props}>
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6 mb-3">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="@bazooka-inc.com"
                onChange={(event) => setEmail(event.target.value)}
                // required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              {/* <div className="flex items-center">
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div> */}
              <Input
                id="password"
                type="password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" onClick={PostUsers}>
              Login
            </Button>
            <Link href="/signup">
              <Button variant="outline" className="w-full">
                Sign Up
              </Button>
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
    // </div>
  );
}
