"use client"

import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/retroui/CardCustom"
import { useTheme } from "next-themes";
import {
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field"
import ReactMarkdown from 'react-markdown';
import rehypeRaw from "rehype-raw";

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useLanguage } from "@/lib/i18n/context"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/retroui/DrawerCustom";
import { Dialog } from "@/components/retroui/DialogCustom";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button } from "./retroui/ButtonCustom";

export function About({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { language, t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { theme } = useTheme();
  const router = useRouter();
  const [showStoryDrawer, setShowStoryDrawer] = useState(false);
  const [showStoryFull, setShowStoryFull] = useState(false);
   const [storyContent, setStoryContent] = useState("");

  const fetchStory = async () => {
    try {
      const response = await fetch(`/story-${language}.md`);
      const text = await response.text();
      setStoryContent(text);
    } catch (error) {
      console.error('Error fetching story:', error);
      // Fallback to English if the language-specific file doesn't exist
      try {
        const response = await fetch('/story-en.md');
        const text = await response.text();
        setStoryContent(text);
      } catch {
        setStoryContent('# Story\n\nError loading content.');
      }
    }
  };
  // Fetch story content when language changes
  useEffect(() => {
    if (showStoryFull) {
      fetchStory();
    }
  }, [language]); // Only re-fetch when language changes

  const handleStoryClick = () => {
    setShowStoryDrawer(true);
  };

  const handleReadMoreClick = () => {
    // Fetch story content first, then show the full story drawer
    fetchStory().then(() => {
      setShowStoryDrawer(false); // Close the first drawer
      setShowStoryFull(true); // Open the full story drawer
    });
  };

  useEffect(() => {
   
    // Check authentication status
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    
    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Redirect to the landing page after successful login
      router.push("/");
      router.refresh();
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="bg-muted relative overflow-hidden cursor-pointer">
            <div className="absolute inset-0 transition-opacity duration-500 hover:opacity-0">
              <img
                src="/farmer1.png"
                alt="Image"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 hover:opacity-100">
              <img
                src="/hero1.png"
                alt="Hover Image"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <form className="p-6 md:p-8 " onSubmit={handleLogin}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-full flex justify-center">
                  <img 
                    src="/logoRP.svg" 
                    alt="RUMAHPETAni Logo" 
                    className="w-26 h-auto"
                  />
                </div>
              </div>
              <FieldDescription className="text-sm text-foreground text-left">
                {t('about.didYouKnow')}
                {t('about.acronym')}
              </FieldDescription>
              <FieldDescription className="text-xs  text-left italic hover:not-italic hover:text-foreground transition-all duration-300 w-full flex items-center px-3 py-1.5 font-normal shadow-md hover:shadow active:shadow-none bg-transparent border-2 hover:translate-y-1 active:translate-y-2 active:translate-x-1">
                {t('about.quote')}
              </FieldDescription>
              <FieldDescription className="text-sm text-foreground text-left">
                {t('about.support')}&nbsp;
                <span 
                  className="font-bold cursor-pointer hover:underline" 
                  onClick={handleStoryClick}
                >
                  {t('about.story')} &#8599;
                </span>
              </FieldDescription>
            </FieldGroup>
          </form>
          
        </CardContent>
      </Card>


      {/* Story Drawer */}
      <Drawer open={showStoryDrawer} onOpenChange={setShowStoryDrawer} direction="top">
        <DrawerContent className="h-[80vh] w-full max-w-5xl mx-auto bg-contain bg-no-repeat bg-bottom" style={{ backgroundImage: "url('/landscape.svg')" }}>
          <DrawerHeader>
            <DrawerTitle className="font-bold text-2xl">{t('about.storyTitle')}</DrawerTitle>
          </DrawerHeader>
          <div className="p-6 text-center h-full overflow-hidden w-full flex items-start justify-center"> {/* h-calc(100%-4rem) accounts for padding */}
            <div className="inline-block w-full max-w-3xl ">
              <p className="font-bold text-3xl md:text-4xl text-foreground">
                {t('about.storyContent1')}
              </p>
               <p className="font-bold text-2xl md:text-4xl text-foreground">
                {t('about.storyContent2')}
              </p>
                <p className="font-bold md:text-2xl text-foreground">
                {t('about.storyContent3')}
              </p>
               <p className="text-sm md:text-lg text-foreground">
                {t('about.storyWritten')}, 
                <span 
                  className="font-bold cursor-pointer hover:underline ml-1 text-primary" 
                  onClick={handleReadMoreClick}
                >
                  {t('about.storyReadMore')}
                </span>
              </p>
              <div className="square md:aspect-video w-full mt-10 rounded-4xl overflow-hidden">
                <img
                  src="/blossom1.png"
                  alt="Image"
                  className="h-full w-full rounded-4xl object-cover"
                />
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
      
      {/* Full Story drawer */}
           <Drawer open={showStoryFull} onOpenChange={setShowStoryFull}>
              <DrawerContent className="h-[80vh] w-full max-w-5xl mx-auto px-6 bg-contain bg-no-repeat bg-bottom" style={{ backgroundImage: "url('/landscape.svg')" }}>
                <DrawerHeader>
                  <DrawerTitle className="font-bold text-2xl"> {t('about.storyFull')}</DrawerTitle>
                </DrawerHeader>
                <div className="p-4 max-w-none leading-relaxed space-y-4 h-[calc(80vh-80px)] overflow-y-auto">
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {storyContent}
                  </ReactMarkdown>
                </div>
              </DrawerContent>
            </Drawer>
    </div>
  )
}