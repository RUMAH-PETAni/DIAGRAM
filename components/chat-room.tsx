"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { RealtimeChat } from "@/components/chat/realtime-chat";
import { Button } from "@/components/retroui/ButtonCustom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/retroui/CardCustom";

interface Message {
  id: string;
  message: string;
  name: string;
  user_id: string;
  created_at: string;
}

export default function ChatRoom() {
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
        // Update message names to use display names from profile data
        const updatedMessages = await Promise.all(
          (data || []).map(async (message) => {
            // Fetch profile details to get display name
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('username, full_name')
              .eq('id', message.user_id)
              .single();

            let displayName = message.name; // fallback to existing name
            
            if (!profileError && profileData) {
              // Use full_name if available, otherwise username
              displayName = profileData.username || profileData.full_name || message.name;
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
      <div className="flex items-center justify-center py-10">
        <p>Loading discussion...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center py-10">
        <p>Please log in to access the forum.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="h-[70vh] flex flex-col">
        <CardHeader>
          <CardTitle>Forum Discussion</CardTitle>
          <p className="text-sm text-muted-foreground">Room: general</p>
        </CardHeader>
        <CardContent className="flex-1 p-0 overflow-hidden">
          {user ? (
            <div className="h-full flex flex-col">
              <div className="h-full overflow-y-auto">
                <RealtimeChat
                  roomId="general"
                  currentUserId={user.id}
                  currentUserDisplayName={user.user_metadata?.name || user.email || "Anonymous"}
                  initialMessages={initialMessages}
                />
              </div>
            </div>
          ) : (
            <div className="p-4 text-center">
              <p>You must be logged in to forum.</p>
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