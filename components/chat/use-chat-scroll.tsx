import { useEffect, useRef } from "react";

interface UseChatScrollOptions {
  chatContainerRef: React.RefObject<HTMLDivElement>;
  dependencies: any[];
}

export function useChatScroll({ 
  chatContainerRef, 
  dependencies 
}: UseChatScrollOptions) {
  const shouldAutoScrollRef = useRef(true);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      // Check if user is already scrolled near the bottom before updating messages
      const isNearBottom = 
        chatContainer.scrollHeight - chatContainer.scrollTop <= chatContainer.clientHeight + 50;
      
      // Update the auto-scroll state based on the user's position
      shouldAutoScrollRef.current = isNearBottom;
      
      // Only scroll to bottom if the user is currently near the bottom (looking at latest messages)
      if (shouldAutoScrollRef.current) {
        requestAnimationFrame(() => {
          if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
          }
        });
      }
    }
  }, [chatContainerRef, ...dependencies]);

  return {
    chatContainerRef,
  };
}