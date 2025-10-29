"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Message {
  id: string;
  message: string;
  name: string;
  user_id: string;
  created_at: string;
}

interface UseRealtimeChatOptions {
  roomId: string;
  currentUserId: string;
  currentUserDisplayName: string;
  initialMessages: Message[];
}

export function useRealtimeChat({
  roomId,
  currentUserId,
  currentUserDisplayName,
  initialMessages,
}: UseRealtimeChatOptions) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isConnected, setIsConnected] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase.channel(`chat-room-${roomId}`);

    channel
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          setIsConnected(true);
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, supabase]);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add local message for immediate feedback
    const localMessage: Message = {
      id: `temp-${Date.now()}`,
      message,
      name: currentUserDisplayName,
      user_id: currentUserId,
      created_at: new Date().toISOString(),
    };

    // Optimistically update UI
    setMessages((prev) => [...prev, localMessage]);

    // Send to Supabase
    const { error } = await supabase
      .from("messages")
      .insert([{ 
        room_id: roomId, 
        message, 
        user_id: currentUserId,
        name: currentUserDisplayName
      }]);

    if (error) {
      // Remove the local message if there was an error
      setMessages((prev) => prev.filter(msg => msg.id !== localMessage.id));
      console.error("Error sending message:", error);
    }
  };

  return {
    messages,
    sendMessage,
    isConnected,
  };
}