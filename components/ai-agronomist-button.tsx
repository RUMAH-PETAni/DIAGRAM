"use client";

import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { ChatSheet } from "@/components/chat-sheet";

export function AIAgronomistButton() {
  return (
    <ChatSheet>
      <Button
        variant="default"
        size="lg"
        className="fixed bottom-24 right-6 rounded-full shadow-lg w-16 h-16 flex items-center justify-center p-0 z-40"
        aria-label="AI Agronomist"
      >
        <Bot className="h-10 w-10" />
      </Button>
    </ChatSheet>
  );
}