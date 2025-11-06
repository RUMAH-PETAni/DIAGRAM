"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ChatSheet } from "@/components/chat-sheet";
import { Button } from "@/components/retroui/ButtonCustom";
import { Bot } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/retroui/Tooltip";

export function FloatingAIButton() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error("Error checking auth status:", error);
      }
    };

    checkAuth();
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <ChatSheet>
      <TooltipProvider>
        <div className="fixed bottom-6 right-6 z-40">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                className="flex items-center justify-center h-10 w-10 p-0 opacity-50 hover:opacity-100 transition-opacity"
                aria-label="AI Agronomist"
              >
                <Bot/>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Chat with AI-Gronomist</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </ChatSheet>
  );
}