import { AuthButton } from "@/components/auth-button";
import  ForumDiscussion  from "@/components/forum-discussion"
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ChatSheet } from "@/components/chat-sheet";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[url('/kontur.svg')] bg-cover bg-center md:bg-muted">
      <header className="sticky top-0 z-50 bg-background/50 w-full flex justify-center border-b border-b-foreground/10 h-16 backdrop-blur-sm">
        <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
          <ThemeSwitcher />
          <AuthButton />
        </div>
      </header>
      <main className="flex flex-col items-center flex-1">
        <div className="w-full flex flex-col gap-10 items-center justify-center flex-1 min-h-0">
          <div className="w-full max-w-sm md:max-w-4xl">
            <ForumDiscussion />
          </div>
        </div>
      </main>
      <ChatSheet>
        <TooltipProvider>
          <div className="fixed bottom-20 right-6 z-40">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="default"
                  className="rounded-full shadow-lg flex items-center justify-center h-12 w-12 p-0 opacity-50 hover:opacity-100 transition-opacity"
                  aria-label="AI Agronomist"
                >
                  <Bot className="h-10 w-10" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Chat with AI-Gronomist</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </ChatSheet>
      <footer className="bg-background/50 w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-6 backdrop-blur-sm">
        <p>
          © 2025 |{" "}
          <a
            href="https://rumahpetani.cloud/"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            RUMAHPETAni
          </a>
        </p>
      
      </footer>
    
    </div>
  );
}