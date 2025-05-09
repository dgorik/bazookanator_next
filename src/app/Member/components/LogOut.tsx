import React from "react";
import Link from "next/link";

const LogOut = () => {
  return (
    <div>
      <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
    </div>
  );
};

export default LogOut;
