"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (token) {
      fetch(`/api/auth/verify-email?token=${token}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            setStatus(data.message);
            setTimeout(() => {
              router.push("/");
            }, 5000);
          } else setStatus(data.error || "Verification failed");
        })
        .catch(() => setStatus("Verification failed"));
    }
  }, [token]);

  return <div>{status}</div>;
}
