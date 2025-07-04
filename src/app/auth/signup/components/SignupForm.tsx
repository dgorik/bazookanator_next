"use client";
import { useState } from "react";
import { Button } from "../../../../components/ui/buttons/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/other/card";
import { Input } from "../../../../components/ui/other/input";
import { Label } from "../../../../components/ui/other/label";

export default function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [status, setStatus] = useState({ type: "", message: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setStatus({ type: "error", message: "Email is required." });
    } else if (!email.endsWith("@bazooka-inc.com")) {
      setStatus({
        type: "error",
        message: "Please enter a @bazooka-inc email.",
      });
    }

    if (password.length < 6) {
      setStatus({
        type: "error",
        message: "Password must be at least 6 characters.",
      });
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, first_name, last_name }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus({ type: "error", message: data.message });
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
      } else {
        setStatus({ type: "success", message: data.message });
      }
    } catch (error) {
      setStatus({ type: "success", message: "An unknown error occurred" });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>Enter your information to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-2">
              <div className="grid gap-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  type="first_name"
                  value={first_name}
                  required={true}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Bazooka"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  type="last_name"
                  value={last_name}
                  required={true}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Joe"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="@bazooka-inc.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                required={true}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </form>

        {status.type === "success" && (
          <div className="flex justify-center mt-2 text-green-600">
            {status.message}
          </div>
        )}
        {status.type === "error" && (
          <div className="flex justify-center mt-2 text-red-600">
            {status.message}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
