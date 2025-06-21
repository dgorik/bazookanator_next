// components/HeaderWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function HeaderWrapper() {
  const pathname = usePathname();

  if (pathname.startsWith("/Member")) return null;

  return <Header />;
}
