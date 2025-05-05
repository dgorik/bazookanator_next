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

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ msg: string }[]>([]); //this means you are storing an array of objects with initial value []

  const PostUsers = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setErrors([{ msg: "Enter a password and an email" }]);
      return;
    }
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
    setErrors(data);
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
        <div style={{ color: "red" }}>
          {errors.map((err, index) => (
            <p key={index}>{err.msg}</p>
          ))}
        </div>
      </CardContent>
    </Card>
    // </div>
  );
}
