import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/buttons/button";

const LogOut = () => {
  return (
    <Link href="/api/auth/signout?callbackUrl=/">
      <Button className="w-full" variant="outline">
        Logout
      </Button>
    </Link>
  );
};

export default LogOut;
