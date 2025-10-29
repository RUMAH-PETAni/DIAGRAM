"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { RealtimeChat } from "@/components/chat/realtime-chat";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Message {
  id: string;
  message: string;
  name: string;
  user_id: string;
  created_at: string;
}

export default function ChatPage() {
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getUserAndMessages = async () => {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      // Load initial messages from the 'general' room
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('room_id', 'general')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error loading messages:', error);
        // Don't set an error state, just continue with empty messages
        // The user will still be able to send messages once the table is set up
      } else {
        // Update message names to use display names from user metadata
        const updatedMessages = await Promise.all(
          (data || []).map(async (message) => {
            // Fetch user details to get display name
            const { data: userData, error: userError } = await supabase
              .from('users') // Assuming there's a users table with user metadata
              .select('user_metadata')
              .eq('id', message.user_id)
              .single();

            let displayName = message.name; // fallback to existing name
            
            if (!userError && userData?.user_metadata) {
              displayName = userData.user_metadata.name || 
                           userData.user_metadata.full_name || 
                           userData.user_metadata.display_name || 
                           message.name;
            }
            
            return {
              ...message,
              name: displayName
            };
          })
        );
        
        setInitialMessages(updatedMessages);
      }

      setLoading(false);
    };

    getUserAndMessages();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading chat...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Please log in to access the chat.</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full max-w-4xl mx-auto flex-col">
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>Realtime Chat</CardTitle>
          <p className="text-sm text-muted-foreground">Room: general</p>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          {user ? (
            <RealtimeChat
              roomId="general"
              currentUserId={user.id}
              currentUserDisplayName={user.user_metadata?.name || user.email || "Anonymous"}
              initialMessages={initialMessages}
            />
          ) : (
            <div className="p-4 text-center">
              <p>You must be logged in to chat.</p>
              <Button 
                className="mt-2"
                onClick={() => {
                  // Redirect to login
                  window.location.href = '/auth/login';
                }}
              >
                Log In
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}