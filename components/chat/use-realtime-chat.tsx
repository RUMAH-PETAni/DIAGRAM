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
        async (payload) => {
          const newMessage = payload.new as Message;
          
          // If the message is from the current user, use the display name directly
          if (newMessage.user_id === currentUserId) {
            setMessages((prev) => [...prev, newMessage]);
          } else {
            // For other users, fetch their display name from profile metadata
            try {
              const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('username, full_name')
                .eq('id', newMessage.user_id)
                .single();

              let displayName = newMessage.name; // fallback to existing name

              if (!profileError && profileData) {
                // Use full_name if available, otherwise username
                displayName = profileData.username || profileData.full_name || newMessage.name;
              }

              setMessages((prev) => [...prev, { ...newMessage, name: displayName }]);
            } catch (error) {
              // If we can't fetch the user info, just use the original message
              setMessages((prev) => [...prev, newMessage]);
              console.error('Error fetching user profile for message:', error);
            }
          }
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
  }, [roomId, supabase, currentUserId]);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Get the latest display name before sending
    let displayName = currentUserDisplayName;
    
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('username, full_name')
        .eq('id', currentUserId)
        .single();

      if (!profileError && profileData) {
        displayName = profileData.username || profileData.full_name || currentUserDisplayName;
      }
    } catch (error) {
      console.error('Error fetching current user info before sending message:', error);
    }

    // Add local message for immediate feedback
    const localMessage: Message = {
      id: `temp-${Date.now()}`,
      message,
      name: displayName,
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
        name: displayName
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