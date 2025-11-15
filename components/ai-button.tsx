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

export function AIButton() {
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

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center justify-center h-10 w-10 p-0"
                aria-label="AI Agronomist"
              >
                <Bot/>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Chat with AI-Gronomist</p>
            </TooltipContent>
          </Tooltip>

      </TooltipProvider>
    </ChatSheet>
  );
}