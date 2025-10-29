import { useEffect, useRef } from "react";

interface UseChatScrollOptions {
  chatContainerRef: React.RefObject<HTMLDivElement>;
  dependencies: any[];
}

export function useChatScroll({ 
  chatContainerRef, 
  dependencies 
}: UseChatScrollOptions) {
  const prevScrollHeightRef = useRef(0);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      // Store the scroll height before updates
      prevScrollHeightRef.current = chatContainer.scrollHeight;
      
      // Scroll to bottom
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [chatContainerRef, ...dependencies]);

  return {
    chatContainerRef,
  };
}