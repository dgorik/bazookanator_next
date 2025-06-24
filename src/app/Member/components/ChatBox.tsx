"use client";

import { Textarea } from "@/components/ui/other/textarea";
import { Button } from "@/components/ui/buttons/button";
import { useState } from "react";

export default function ChatBox({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [userQuestion, setUserQuestion] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/sales/us_consolidated", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userQuestion }),
      });

      const data = await response.json();
    } catch (error) {
      setErrors(["An unexpected error occurred. Please try again."]);
    }
  };
  return (
    <div className="flex flex-col h-[80vh]">
      <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
        <Textarea
          className="flex-grow "
          placeholder="Type your message here."
          value={userQuestion}
          onChange={(e) => setUserQuestion(e.target.value)}
        />
        <div>
          <Button type="submit">Fire away a question</Button>
        </div>
      </form>
    </div>
  );
}
