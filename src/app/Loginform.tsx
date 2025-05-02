"use client";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ValidationError = {
  msg: string;
};

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const PostUsers = async () => {
    const res = await fetch("/api/auth/login", {
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

    const data = await res.json();
    console.log(data);
    setMessage(data.message);
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
              <Input
                id="password"
                type="password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" onClick={PostUsers}>
              Login
            </Button>
            {/* {errors.length > 0 && (
              <ul style={{ color: "red" }}>
                {errors.map((error, idx) => (
                  <li key={idx}>{error.msg}</li>
                ))}
              </ul>
            )} */}
            <Link href="/signup">
              <Button variant="outline" className="w-full">
                Sign Up
              </Button>
            </Link>
            <Button
              type="submit"
              className="w-1/2 mx-auto" //
              // onClick={}
            >
              Forgot Password
            </Button>
          </div>
        </form>
        <div>{message ? message : "Loading"}</div>
      </CardContent>
    </Card>
    // </div>
  );
}
