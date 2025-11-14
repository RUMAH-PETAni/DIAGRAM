"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/retroui/ButtonCustom";
import { Card, CardContent } from "@/components/retroui/CardCustom";
import { Text } from "@/components/retroui/Text";
import { useTheme } from "next-themes";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
} from "@/components/retroui/DrawerCustom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carouselcustom";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import React from "react";
import { useLanguage } from "@/lib/i18n/context";
import { createBrowserClient } from "@supabase/ssr";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/retroui/TooltipCustom";

interface ReportDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeImageIndex: number;
  setActiveImageIndex: (index: number) => void;
}

export function ReportDrawer({ 
  open, 
  onOpenChange, 
  activeImageIndex, 
  setActiveImageIndex 
}: ReportDrawerProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );

  useEffect(() => {
    const checkAuthStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkAuthStatus();
  }, [supabase]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="top">
      <DrawerContent className="h-[80vh] w-full max-w-5xl mx-auto flex flex-col bg-contain bg-no-repeat bg-bottom" style={{ backgroundImage: "url('/landscape.svg')"}}>
        <DrawerTitle></DrawerTitle>
        <div className="h-full overflow-hidden w-full flex items-start justify-center"> {/* h-calc(100%-4rem) accounts for padding */}
          <div className="inline-block w-full max-w-3xl px-6">
            <div className="square md:aspect-video w-full relative">
              <img
                src="/report/sugriwo.png"
                alt="Farmer 1"
                className={`w-full h-70 md:h-90 object-cover rounded-b-4xl absolute inset-0 transition-opacity duration-300 ease-in-out ${
                  activeImageIndex === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              />
              <img
                src="/report/joko.png"
                alt="Farmer 2"
                className={`w-full h-70 md:h-90 object-cover rounded-b-4xl absolute inset-0 transition-opacity duration-300 ease-in-out ${
                  activeImageIndex === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              />
              <img
                src="/report/supriyadi.png"
                alt="Farmer 3"
                className={`w-full h-70 md:h-90 object-cover rounded-b-4xl absolute inset-0 transition-opacity duration-300 ease-in-out ${
                  activeImageIndex === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              />
                <img
                src="/report/murahrejeki.png"
                alt="Farmer 4"
                className={`w-full h-70 md:h-90 object-cover rounded-b-4xl absolute inset-0 transition-opacity duration-300 ease-in-out ${
                  activeImageIndex === 3 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              />
               <img
                src="/report/suwarni.png"
                alt="Farmer 5"
                className={`w-full h-70 md:h-90 object-cover rounded-b-4xl absolute inset-0 transition-opacity duration-300 ease-in-out ${
                  activeImageIndex === 4 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              />
            
               <img
                src="/report/sidomakmur.png"
                alt="Farmer 6"
                className={`w-full h-70 md:h-90 object-cover rounded-b-4xl absolute inset-0 transition-opacity duration-300 ease-in-out ${
                  activeImageIndex === 5 ? 'opacity-100 z-10' : 'opacity-0 z-0'
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
                      {/* Farmer1 Report */}
                      <div className="flex flex-col items-center justify-between">
                        <Card
                          className="flex items-center justify-between gap-4 w-64 md:w-lg p-4 shadow-none hover:shadow-none"
                          onClick={() => {onOpenChange(false)}}>
                          <div className="text-left">
                            <div className="text-lg md:text-2xl font-bold">Sugriwo</div>
                            <div className="text-sm">{t('hero.hasPlanted')}</div>
                            <div className="text-sm">@ KTH Mancingan Atas</div>
                          </div>
                          <TooltipProvider>
                            <Tooltip delayDuration={0}>
                              <TooltipTrigger asChild>
                                <Button
                                  type="button"
                                  className="flex items-center justify-center"
                                  onClick={(e) => {
                                    e.stopPropagation(); // Prevent event bubbling to the card
                                    if (isAuthenticated) {
                                      router.push('/campaign-report');
                                      onOpenChange(false);
                                    }
                                  }}
                                >
                                  {t('hero.seeDetails')}
                                </Button>
                              </TooltipTrigger>
                              {!isAuthenticated && (
                                <TooltipContent>
                                  <p>{t('general.loginFirst')}</p>
                                </TooltipContent>
                              )}
                            </Tooltip>
                          </TooltipProvider>
                        </Card>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      {/* Farmer2 Report */}
                      <div className="flex flex-col items-center">
                        <Card
                          className="flex items-center justify-between gap-4 w-64 md:w-lg p-4 shadow-none hover:shadow-none"
                          onClick={() => {onOpenChange(false)}}>
                          <div className="text-left">
                            <div className="text-lg md:text-2xl font-bold">Joko</div>
                            <div className="text-sm">{t('hero.hasPlanted')}</div>
                            <div className="text-sm">@ KTH Bumi Mulyo</div>
                          </div>
                          <TooltipProvider>
                            <Tooltip delayDuration={0}>
                              <TooltipTrigger asChild>
                                <Button
                                  type="button"
                                  className="flex items-center justify-center"
                                  onClick={(e) => {
                                    e.stopPropagation(); // Prevent event bubbling to the card
                                    if (isAuthenticated) {
                                      router.push('/campaign-report');
                                      onOpenChange(false);
                                    }
                                  }}
                                >
                                  {t('hero.seeDetails')}
                                </Button>
                              </TooltipTrigger>
                              {!isAuthenticated && (
                                <TooltipContent>
                                  <p>{t('general.loginFirst')}</p>
                                </TooltipContent>
                              )}
                            </Tooltip>
                          </TooltipProvider>
                        </Card>
                      </div>
                    </CarouselItem>

                    <CarouselItem>
                      {/* Farmer3 Report */}
                      <div className="flex flex-col items-center">
                        <Card
                          className="flex items-center justify-between gap-4 w-64 md:w-lg p-4 shadow-none hover:shadow-none"
                          onClick={() => {onOpenChange(false)}}>
                          <div className="text-left">
                            <div className="text-lg md:text-2xl font-bold">Supriyadi</div>
                            <div className="text-sm">{t('hero.hasPlanted')}</div>
                            <div className="text-sm">@ KTH Kuyung Jejer</div>
                          </div>
                          <TooltipProvider>
                            <Tooltip delayDuration={0}>
                              <TooltipTrigger asChild>
                                <Button
                                  type="button"
                                  className="flex items-center justify-center"
                                  onClick={(e) => {
                                    e.stopPropagation(); // Prevent event bubbling to the card
                                    if (isAuthenticated) {
                                      router.push('/campaign-report');
                                      onOpenChange(false);
                                    }
                                  }}
                                >
                                  {t('hero.seeDetails')}
                                </Button>
                              </TooltipTrigger>
                              {!isAuthenticated && (
                                <TooltipContent>
                                  <p>{t('general.loginFirst')}</p>
                                </TooltipContent>
                              )}
                            </Tooltip>
                          </TooltipProvider>
                        </Card>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      {/* Farmer4 Report */}
                      <div className="flex flex-col items-center">
                        <Card
                          className="flex items-center justify-between gap-4 w-64 md:w-lg p-4 shadow-none hover:shadow-none"
                          onClick={() => {onOpenChange(false)}}>
                          <div className="text-left">
                            <div className="text-lg md:text-2xl font-bold">Muslimin</div>
                            <div className="text-sm">{t('hero.hasPlanted')}</div>
                            <div className="text-sm">@ KTH Murah Rejeki</div>
                          </div>
                          <TooltipProvider>
                            <Tooltip delayDuration={0}>
                              <TooltipTrigger asChild>
                                <Button
                                  type="button"
                                  className="flex items-center justify-center"
                                  onClick={(e) => {
                                    e.stopPropagation(); // Prevent event bubbling to the card
                                    if (isAuthenticated) {
                                      router.push('/campaign-report');
                                      onOpenChange(false);
                                    }
                                  }}
                                >
                                  {t('hero.seeDetails')}
                                </Button>
                              </TooltipTrigger>
                              {!isAuthenticated && (
                                <TooltipContent>
                                  <p>{t('general.loginFirst')}</p>
                                </TooltipContent>
                              )}
                            </Tooltip>
                          </TooltipProvider>
                        </Card>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      {/* Farmer5 Report */}
                      <div className="flex flex-col items-center">
                        <Card
                          className="flex items-center justify-between gap-4 w-64 md:w-lg p-4 shadow-none hover:shadow-none"
                          onClick={() => {onOpenChange(false)}}>
                          <div className="text-left">
                            <div className="text-lg md:text-2xl font-bold">Suwarni</div>
                            <div className="text-sm">{t('hero.hasPlanted')}</div>
                            <div className="text-sm">@ KTH Mandiri Jaya</div>
                          </div>
                          <TooltipProvider>
                            <Tooltip delayDuration={0}>
                              <TooltipTrigger asChild>
                                <Button
                                  type="button"
                                  className="flex items-center justify-center"
                                  onClick={(e) => {
                                    e.stopPropagation(); // Prevent event bubbling to the card
                                    if (isAuthenticated) {
                                      router.push('/campaign-report');
                                      onOpenChange(false);
                                    }
                                  }}
                                >
                                  {t('hero.seeDetails')}
                                </Button>
                              </TooltipTrigger>
                              {!isAuthenticated && (
                                <TooltipContent>
                                  <p>{t('general.loginFirst')}</p>
                                </TooltipContent>
                              )}
                            </Tooltip>
                          </TooltipProvider>
                        </Card>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      {/* Farmer6 Report */}
                      <div className="flex flex-col items-center">
                        <Card
                          className="flex items-center justify-between gap-4 w-64 md:w-lg p-4 shadow-none hover:shadow-none"
                          onClick={() => {onOpenChange(false)}}>
                          <div className="text-left">
                            <div className="text-lg md:text-2xl font-bold">Sahwono</div>
                            <div className="text-sm">{t('hero.hasPlanted')}</div>
                            <div className="text-sm">@ KTH Sido Makmur</div>
                          </div>
                          <TooltipProvider>
                            <Tooltip delayDuration={0}>
                              <TooltipTrigger asChild>
                                <Button
                                  type="button"
                                  className="flex items-center justify-center"
                                  onClick={(e) => {
                                    e.stopPropagation(); // Prevent event bubbling to the card
                                    if (isAuthenticated) {
                                      router.push('/campaign-report');
                                      onOpenChange(false);
                                    }
                                  }}
                                >
                                  {t('hero.seeDetails')}
                                </Button>
                              </TooltipTrigger>
                              {!isAuthenticated && (
                                <TooltipContent>
                                  <p>{t('general.loginFirst')}</p>
                                </TooltipContent>
                              )}
                            </Tooltip>
                          </TooltipProvider>
                        </Card>
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
  );
}