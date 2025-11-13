"use client"

import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/retroui/ButtonCustom"
import { Card, CardContent } from "@/components/retroui/CardCustom"
import { Text } from "@/components/retroui/Text"
import { TypeAnimation } from 'react-type-animation'
import { useTheme } from "next-themes"
import { Progress } from "@/components/retroui/Progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/retroui/Tooltip"

import { Dialog } from "@/components/retroui/DialogCustom"
import { ExploreDrawer } from "./ExploreDrawer"
import { CampaignDrawer } from "./CampaignDrawer"
import { ReportDrawer } from "./ReportDrawer"

import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerHeader,
} from "@/components/retroui/DrawerCustom"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carouselcustom"
import {
  Field,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Blocks, DatabaseZap, Handshake, Shapes, Sparkles, TreesIcon } from "lucide-react"
import React from "react"
import { useLanguage } from "@/lib/i18n/context"

export function Hero({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showExploreDrawer, setShowExploreDrawer] = useState(false);
  const [showCampaignDrawer, setShowCampaignDrawer] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showReportDrawer, setShowReportDrawer] = useState(false);

  const { theme } = useTheme();
  const router = useRouter();

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

  const handleExplore = (e: React.FormEvent) => {
    e.preventDefault();
    setShowExploreDrawer(true);
    setActiveImageIndex(0); // Reset to first slide and image
  };

  const handleReport = (e: React.FormEvent) => {
    e.preventDefault();
    setShowReportDrawer(true);
    setActiveImageIndex(0); // Reset to first slide and image
  };

   const [progress, setProgress] = React.useState(20);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(20), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8 " onSubmit={handleLogin}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">{t('hero.title')}</h1>
                <p className="font-bold text-muted-foreground text-balance">
                  {t('hero.subtitle')}
                </p>
              </div>
              <CardContent className="p-0">
                    <p className="text-balance">
                    {t('hero.empowering')}
                    </p>
                    <Field className="mt-2">
                      <div className="w-full flex items-center px-3 py-1.5 font-normal shadow-md hover:shadow active:shadow-none bg-transparent border-2 transition hover:translate-y-1 active:translate-y-2 active:translate-x-1">
                        <TypeAnimation
                          key={language} // Force re-render when language changes
                          sequence={[
                            t('hero.climateSmart'),
                            2000, // Wait 2s after this string
                            t('hero.dataDriven'),
                            2000, // Wait 2s after this string
                            t('hero.sustainableTech'),
                            2000, // Wait 2s after this string
                            t('hero.precisionAgro'),
                            2000, // Wait 2s after this string
                          ]}
                          wrapper="span"
                          speed={40} // Speed of typing: 1 = slowest, 99 = fastest
                          style={{
                            display: 'inline-block',
                            color: 'inherit',
                            width: '100%'
                          }}
                          repeat={Infinity}
                        />
                      </div>
                    </Field>
                  </CardContent>
              <FieldDescription className="text-left italic">
                {t('hero.description')}
              </FieldDescription>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  className="flex items-center justify-center"
                  onClick={handleExplore}
                  disabled={isLoading}
                  >
                  {isLoading ? t('hero.explore') + "..." : t('hero.explore')}
                </Button>

              <ExploreDrawer 
                open={showExploreDrawer} 
                onOpenChange={setShowExploreDrawer} 
                activeImageIndex={activeImageIndex}
                setActiveImageIndex={setActiveImageIndex}
              />

                <CampaignDrawer 
                  open={showCampaignDrawer} 
                  onOpenChange={setShowCampaignDrawer} 
                  showReportDrawer={showReportDrawer}
                  setShowReportDrawer={setShowReportDrawer}
                  setShowCampaignDrawer={setShowCampaignDrawer}
                  progress={progress}
                />
              </div>
              {error && (
                <div className="text-sm text-red-500 text-center">
                  {error}
                </div>
              )}
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block overflow-hidden cursor-pointer">
            <div className="absolute inset-0 transition-opacity duration-500 hover:opacity-100">
              <img
                src="/tabletmap1.png"
                alt="Image"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 hover:opacity-100">
              <img
                src="/fly1.png"
                alt="Hover Image"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </CardContent>
      </Card>

    <ReportDrawer 
      open={showReportDrawer} 
      onOpenChange={setShowReportDrawer} 
      activeImageIndex={activeImageIndex}
      setActiveImageIndex={setActiveImageIndex}
    />

    </div>
  )
}