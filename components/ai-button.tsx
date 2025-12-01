"use client";
import { useLanguage } from "@/lib/i18n/context";
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
  const { t } = useLanguage();
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
              <p>{t('chat_sheet.tooltip')}</p>
            </TooltipContent>
          </Tooltip>

      </TooltipProvider>
    </ChatSheet>
  );
}