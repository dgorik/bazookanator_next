"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import AddUser from "./AddUser";

export default function SetPassword({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState(""); //this means you are storing an array of objects with initial value []
  const router = useRouter();

  const handlePostUsers = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password != confirm_password) {
      setErrors("Passwords must match");
    } else {
      router.push("/");
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
    <Card className="w-full max-w-md mx-auto">
      <CardContent>
        <form>
          <div className="flex flex-col gap-6 mb-3">
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
            <div className="grid gap-2">
              <Label htmlFor="password">Confirm Password</Label>
              <Input
                id="confirm_password"
                type="password"
                required={true}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
            <Button type="submit" className="w-full" onClick={handlePostUsers}>
              Set Password
            </Button>
          </div>
        </form>
        <div>
          {<p className="flex justify-center mt-2 text-red-600">{errors}</p>}
        </div>
      </CardContent>
    </Card>
  );
}
