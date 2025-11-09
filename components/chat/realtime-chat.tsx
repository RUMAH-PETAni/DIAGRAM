"use client";

import { useRef, useState, useEffect } from "react";
import { Input } from "@/components/retroui/InputCustom";
import { Button } from "@/components/retroui/ButtonCustom";
import { useRealtimeChat } from "./use-realtime-chat";
import { useChatScroll } from "./use-chat-scroll";
import { ChatMessageItem } from "./chat-message";
import { Send } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

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
  const { t } = useLanguage();
  const [message, setMessage] = useState("");
  const { messages, sendMessage: originalSendMessage, isConnected } = useRealtimeChat({
    roomId,
    currentUserId,
    currentUserDisplayName,
    initialMessages,
  });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useChatScroll({
    chatContainerRef: scrollContainerRef as React.RefObject<HTMLDivElement>,
    dependencies: [messages],
  });

  // Wrapper to send message and ensure scroll to bottom
  const sendMessage = async (msg: string) => {
    const result = await originalSendMessage(msg);
    // Ensure scroll to bottom after sending
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
      }
    }, 10);
    return result;
  };

  // Effect to scroll to bottom on initial load
  useEffect(() => {
    if (messages.length > 0 && scrollContainerRef.current) {
      // Wait a bit to ensure DOM is fully rendered
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
      }, 100);
    }
  }, [messages.length]); // Run when messages change



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === "") return;

    sendMessage(message);
    setMessage("");
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-4" ref={scrollContainerRef}>
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
            placeholder={t('chat.typeMessage')}
            disabled={!isConnected}
          />
          <Button type="submit" disabled={!isConnected || message.trim() === ""}>
          <Send className="w-4 h-4" />
          </Button>
        </form>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {isConnected ? t('chat.connected') : t('chat.connecting')}
        </p>
      </div>
    </div>
  );
}