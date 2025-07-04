"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/other/card";
import { useState } from "react";
import { Button } from "../../../../components/ui/buttons/button";
import { Input } from "../../../../components/ui/other/input";
import { Label } from "../../../../components/ui/other/label";

export default function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage(
          "If the email is registered, a password reset link has been sent."
        );
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Network booom");
    }
  };
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6 mb-3 ">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required={true}
                placeholder="@bazooka-inc.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              onClick={handleResetPassword}
            >
              Reset
            </Button>
          </div>
        </form>
        <div>
          <p> {message}</p>
        </div>
      </CardContent>
    </Card>
  );
}
