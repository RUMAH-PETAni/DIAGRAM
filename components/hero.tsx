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
import { Blocks, DatabaseZap, Handshake, Shapes, TreesIcon } from "lucide-react"
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
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showExploreDrawer, setShowExploreDrawer] = useState(false);
  const [showCampaignDrawer, setShowCampaignDrawer] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
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
    // Show the explore modal for all users
    setShowExploreDrawer(true);
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
             
                <Drawer open={showCampaignDrawer} onOpenChange={setShowCampaignDrawer}>
                  <DrawerTrigger asChild>
                    <Button
                      variant = "secondary"
                      type="button"
                      className="flex items-center justify-center"
                      onClick={() => setShowCampaignDrawer(true)}
                    >
                      {t('hero.campaign')}
                    </Button>
                  </DrawerTrigger>
                 
                  <DrawerContent className="h-[80vh] w-full max-w-5xl mx-auto bg-contain bg-no-repeat bg-bottom" style={{ backgroundImage: "url('/landscape.svg')" }}>
                    <DrawerHeader>
                      <DrawerTitle className="font-bold text-2xl">{t('hero.letSupport')}</DrawerTitle>
                    </DrawerHeader>
                    <div className="p-6 text-center h-full flex items-start justify-center ">
                      <div className=" bg-opacity-50 p-6 md:p-8 inline-block border-2 shadow-md transition-all hover:shadow-none bg-card">
                        <p className="text-2xl font-bold">
                        {t('hero.supportMessage')}</p>
                        <p className="mt-2">{t('hero.donateLink')} <a href="https://kitabisa.com" className="underline">kitabisa.com</a></p>
                         <section className="w-full grid grid-cols-2 gap-4 mt-4 p-4">
                        <Button
                          type="button"
                          className="flex items-center justify-center"
                        >
                          {t('hero.donate')}
                        </Button>
                        <Button
                          variant = "outline"
                          type="button"
                          className="flex items-center justify-center"
                        >
                         {t('hero.report')}
                        </Button>
                        </section>
                        <div className="p-6 flex items-center justify-center gap-4 ">
                          <p className="font-bold" >{t('hero.progress')}</p>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="cursor-pointer w-full">
                                  <Progress value={progress} className="w-full" />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{t('hero.treesPlanted')}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        <TreesIcon className="size-8"/>
                        </div>
                      </div>
                    </div>
                  </DrawerContent>
                </Drawer>
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
    
    {/* Explore Drawer */}
    <Drawer open={showExploreDrawer} onOpenChange={setShowExploreDrawer} direction="top">
      <DrawerContent className="h-[80vh] w-full max-w-5xl mx-auto flex flex-col bg-contain bg-no-repeat bg-bottom" style={{ backgroundImage: "url('/landscape.svg')"}}>
        <DrawerTitle></DrawerTitle>
        <div className="h-full overflow-hidden w-full flex items-start justify-center"> {/* h-calc(100%-4rem) accounts for padding */}
          <div className="inline-block w-full max-w-3xl px-6">
            <div className="square md:aspect-video w-full relative">
              <img 
                src="/tabletmap1.png" 
                alt="Features & Tools" 
                className={`w-full h-70 md:h-90 object-cover rounded-b-4xl absolute inset-0 transition-opacity duration-300 ease-in-out ${
                  activeImageIndex === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              />
              <img 
                src="/hero1.png" 
                alt="On Demand Services" 
                className={`w-full h-70 md:h-90 object-cover rounded-b-4xl absolute inset-0 transition-opacity duration-300 ease-in-out ${
                  activeImageIndex === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              />
              <img 
                src="/laptop.png" 
                alt="Data Library" 
                className={`w-full h-70 md:h-90 object-cover rounded-b-4xl absolute inset-0 transition-opacity duration-300 ease-in-out ${
                  activeImageIndex === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              />
            </div>
            <div className="px-6 mt-80 md:mt-0 flex-1 flex flex-col">
              <div >
                <Carousel opts={{ align: "end" }} className="w-full" setApi={(api: CarouselApi) => {
                  api?.on("select", () => {
                    setActiveImageIndex(api.selectedScrollSnap());
                  });
                }}>
                  <CarouselContent>
                    <CarouselItem>
                      {/* Features & Tools Button */}
                      <div className="flex flex-col items-center justify-center">
                        <Card 
                          className="flex items-center justify-center gap-4 w-64 md:w-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
                          onClick={() => {
                            router.push("/features");
                            setShowExploreDrawer(false);
                          }}
                        >
                          <div className=" w-16 flex items-center justify-center">
                          <Shapes className="mr-2 h-10 w-10"/>
                          </div>
                          <div className="text-left">
                            <div className="text-lg md:text-2xl font-bold">{t('explore.features')}</div>
                          </div>
                        </Card>
                        <div className="mt-2 text-center">
                          <p className="text-muted-foreground">{t('explore.featuresDesc')}</p>
                        </div>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      {/* On Demand Services Button */}
                      <div className="flex flex-col items-center">
                        <Card 
                          className="flex items-center justify-center gap-4 w-64 md:w-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
                          onClick={() => {
                            router.push("/services");
                            setShowExploreDrawer(false);
                          }}
                        >
                          <div className=" w-16 flex items-center justify-center">
                          <Handshake className="mr-2 h-10 w-10"/>
                          </div>
                          <div className="text-left">
                            <div className="text-lg md:text-2xl font-bold">{t('explore.services')}</div>
                          </div>
                        </Card>
                        <div className="mt-2 text-center">
                          <p className=" text-muted-foreground">{t('explore.servicesDesc')}</p>
                        </div>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      {/* Data Library Button */}
                      <div className="flex flex-col items-center">
                        <Card 
                          className="flex items-center justify-center gap-4 w-64 md:w-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
                          onClick={() => {
                            router.push("/library");
                            setShowExploreDrawer(false);
                          }}
                        >
                          <div className=" w-16 flex items-center justify-center">
                          <DatabaseZap className="mr-2 h-10 w-10" />
                          </div>
                          <div className="text-left">
                            <div className="text-lg md:text-2xl font-bold">{t('explore.dataLibrary')}</div>
                          </div>
                        </Card>
                        <div className="mt-2 text-center">
                          <p className="text-muted-foreground">{t('explore.dataLibraryDesc')}</p>
                        </div>
                      </div>
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselPrevious className="absolute top-1/2" />
                  <CarouselNext className="absolute top-1/2" />
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
    
    </div>
  )
}