"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

interface ChatMessageItemProps {
  id: string;
  message: string;
  name: string; // This will be the display name
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
        isCurrentUser ? "flex-row-reverse" : ""
      )}
    >
      {!isCurrentUser && (
        <Avatar className="mt-1">
          <AvatarFallback className="bg-muted text-xs">
            {name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}
      <div className="flex-1 min-w-0">
        <div className={cn(
          "flex items-center gap-2",
          isCurrentUser ? "justify-end" : "justify-start"
        )}>
          {!isCurrentUser && (
            <span className="font-medium">{name}</span>
          )}
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(createdAtDate, { addSuffix: true })}
          </span>
          {isCurrentUser && (
            <span className="font-medium">{name}</span>
          )}
        </div>
        <div
          className={cn(
            "mt-2",
            isCurrentUser 
              ? "ml-auto max-w-[70%] text-right" 
              : "mr-auto max-w-[70%] text-left"
          )}
        >
          <p className={cn(
            "inline-block px-4 py-2 rounded-lg",
            isCurrentUser 
              ? "bg-primary text-primary-foreground rounded-br-none" 
              : "bg-muted rounded-bl-none"
          )}>
            {message}
          </p>
        </div>
      </div>
      {isCurrentUser && (
        <Avatar className="mt-1">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
            {name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}