"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRealtimeChat } from "./use-realtime-chat";
import { useChatScroll } from "./use-chat-scroll";
import { ChatMessageItem } from "./chat-message";

interface Message {
  id: string;
  message: string;
  name: string;
  user_id: string;
  created_at: string;
}

interface RealtimeChatProps {
  roomId: string;
  currentUserId: string;
  currentUserDisplayName: string;
  initialMessages: Message[];
}

export function RealtimeChat({
  roomId,
  currentUserId,
  currentUserDisplayName,
  initialMessages,
}: RealtimeChatProps) {
  const [message, setMessage] = useState("");
  const { messages, sendMessage, isConnected } = useRealtimeChat({
    roomId,
    currentUserId,
    currentUserDisplayName,
    initialMessages,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useChatScroll({
    chatContainerRef: messagesEndRef as React.RefObject<HTMLDivElement>,
    dependencies: [messages],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === "") return;

    sendMessage(message);
    setMessage("");
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {messages.map((msg) => (
            <ChatMessageItem
              key={msg.id}
              {...msg}
              currentUserId={currentUserId}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={!isConnected}
          />
          <Button type="submit" disabled={!isConnected || message.trim() === ""}>
            Send
          </Button>
        </form>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {isConnected ? "Connected" : "Connecting..."}
        </p>
      </div>
    </div>
  );
}