"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/other/card";
import { Input } from "@/components/ui/other/input";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/buttons/button";
import { ScrollArea } from "@/components/ui/other/scroll-area";
import { useState } from "react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "How can I help you?",
      sender: "bot",
    },
  ]);

  const [inputValue, setInputValue] = useState("");

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    try {
      const response = await fetch("/api/sales/us_consolidated", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userQuestion: inputValue }), // key must match backend
      });

      const data = await response.json();

      const botReply: Message = {
        id: (Date.now() + 1).toString(),
        content: data.summary || "Sorry, I didn’t catch that.",
        sender: "bot",
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: "Something went wrong. Please try again.",
          sender: "bot",
        },
      ]);
    }
  };

  return (
    <Card className="flex flex-col h-[80vh] bg-white shadow-lg">
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-full pr-4">
          <div className="flex flex-col gap-3 p-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[80%] px-3 py-2 rounded-md text-sm ${
                  msg.sender === "user"
                    ? "ml-auto bg-blue-100 text-right"
                    : "mr-auto bg-gray-100 text-left"
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 pt-0 border-t bg-gray-50">
        <div className="flex w-full gap-2">
          <Input
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button onClick={handleSend} size="icon" type="button">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
