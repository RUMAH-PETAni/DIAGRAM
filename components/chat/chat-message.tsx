"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

interface ChatMessageItemProps {
  id: string;
  message: string;
  name: string;
  user_id: string;
  created_at: string;
  currentUserId: string;
}

export function ChatMessageItem({
  message,
  name,
  user_id,
  created_at,
  currentUserId,
}: ChatMessageItemProps) {
  const isCurrentUser = user_id === currentUserId;
  const createdAtDate = new Date(created_at);

  return (
    <div
      className={cn(
        "flex gap-3 px-4 py-3 transition-colors",
        isCurrentUser ? "bg-muted/50" : "bg-background"
      )}
    >
      <Avatar className="mt-1">
        <AvatarFallback className="bg-muted text-xs">
          {name.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{name}</span>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(createdAtDate, { addSuffix: true })}
          </span>
        </div>
        <div
          className={cn(
            "mt-2",
            isCurrentUser ? "ml-auto max-w-[70%] text-right" : "max-w-[70%]"
          )}
        >
          <p className="inline-block rounded-lg bg-muted px-4 py-2">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}