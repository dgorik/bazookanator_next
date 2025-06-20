"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ButtonLoading } from "@/(components)/ui/button_loading";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (token) {
      fetch(`/api/auth/verify-email?token=${token}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            setMessage(data.message);
            setTimeout(() => {
              router.push("/");
            }, 5000);
          } else {
            setMessage(data.error || "Verification failed");
          }
        })
        .catch(() => setMessage("Verification failed, please try again"))
        .finally(() => setLoading(false));
    }
  }, [token]);

  return (
    <div>
      {loading ? (
        <div className="flex flex-col items-center">
          <ButtonLoading />
        </div>
      ) : (
        <p className="text-center mt-4 text-sm text-muted-foreground">
          {message}
        </p>
      )}
    </div>
  );
}
