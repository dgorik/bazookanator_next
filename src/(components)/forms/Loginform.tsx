"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "@/(components)/ui/input";
import { Label } from "@/(components)/ui/label";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState(""); //this means you are storing an array of objects with initial value []
  const router = useRouter();

  const handlePostUsers = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false, // Do not redirect immediately after signIn
      email,
      password,
    });

    if (res?.error) {
      setErrors(res.error);
    } else {
      router.push("/Member");
    }
  };

  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  useEffect(() => {
    if (message) {
      setErrors(message);
    }
  }, [message]);

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
                required={true}
                placeholder="@bazooka-inc.com"
                onChange={(e) => setEmail(e.target.value)}
                // required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required={true}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <Button type="submit" className="w-full" onClick={handlePostUsers}>
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
        <div>
          {<p className="flex justify-center text-red-600">{errors}</p>}
        </div>
      </CardContent>
    </Card>
    // </div>
  );
}
