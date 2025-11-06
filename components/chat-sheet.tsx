"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/retroui/ButtonCustom";
import { Input } from "@/components/retroui/InputCustom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import { Send, Bot, User } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface ChatSheetProps {
  trigger?: React.ReactNode;
  children?: React.ReactNode;
}

export function ChatSheet({ children }: ChatSheetProps) {
  const router = useRouter();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your Assistant. How can I help you with agriculture today?",
      role: "assistant",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  // Auto-scroll to bottom when messages change
  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Use the Vercel AI SDK to get the response
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: data.content,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "Sorry, I encountered an error. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)}>
        {children}
      </div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right" className="flex flex-col w-full sm:max-w-lg p-0">
          <SheetHeader className="p-4 border-b">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              <SheetTitle className="text-lg">AI-Gronomist</SheetTitle>
            </div>
          </SheetHeader>

          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <Avatar className="w-8 h-8 bg-primary/10">
                      <AvatarImage src="" alt="AI Agronomist" />
                      <AvatarFallback className="bg-primary/10">
                        <Bot className="w-4 h-4 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div 
                    className={cn(
                      "max-w-[80%] rounded-lg p-3",
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground rounded-r-none' 
                        : 'bg-muted rounded-l-none'
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  
                  {message.role === 'user' && (
                    <Avatar className="w-8 h-8 bg-primary/10">
                      <AvatarImage src="" alt="User" />
                      <AvatarFallback className="bg-primary/10">
                        <User className="w-4 h-4 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <Avatar className="w-8 h-8 bg-primary/10">
                    <AvatarImage src="" alt="AI Agronomist" />
                    <AvatarFallback className="bg-primary/10">
                      <Bot className="w-4 h-4 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="max-w-[80%] rounded-lg p-3 bg-muted rounded-l-none">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-100"></div>
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input area */}
          <div className="p-4 border-t">
            <form onSubmit={handleSend} className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about agriculture, crops, soil, weather..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                size="sm" 
                disabled={!inputValue.trim() || isLoading}
                className="h-10"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              AI can make mistakes, Be specific for the best results.
              <br/>Powered by OpenAI GPT-4o-mini
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}