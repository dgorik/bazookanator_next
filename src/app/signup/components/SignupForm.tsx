import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/(components)/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/(components)/ui/card";
import { Input } from "@/(components)/ui/input";
import { Label } from "@/(components)/ui/label";

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    // <div className={cn("flex flex-col gap-6", className)} {...props}>
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>Enter your information to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-2">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" type="text" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="first-name">Last Name</Label>
                <Input id="first-name" type="text" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="@bazooka-inc.com"
                // required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <Link href="/verify">
              <Button type="submit" className="w-full">
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
