"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [errors, setErrors] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: string[] = [];

    // Validation logic
    if (!email) {
      newErrors.push("Email is required.");
    } else if (!email.endsWith("@bazooka-inc.com")) {
      newErrors.push("Please enter a @bazooka-inc email");
    }

    if (password.length < 6) {
      newErrors.push("Password must be at least 6 characters.");
    }

    // If there are validation errors, update the state
    if (newErrors.length >= 1) {
      //returns a length of the array
      //if (newErrors) is always truthy because an object is never falsy in Javascript
      setErrors(newErrors);
      return; // Prevent form submission if there are errors
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
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" type="text" required={true} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" type="text" required={true} />
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
              {/* {errors.email && <p className="text-red-600">{errors.email}</p>} */}
              {/* if errors.email is truthy it will render a warning, if not - it won't render anything */}
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
              {/* {errors.password && (
                <p className="text-red-600">{errors.password}</p>
              )} */}
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </form>
        <div className="flex justify-center mt-2 text-red-600">
          {errors.map((err, index) => (
            <p key={index}>{err}</p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
