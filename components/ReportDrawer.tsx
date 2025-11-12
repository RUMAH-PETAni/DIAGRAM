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
import { useState } from "react";
import React from "react";
import { useLanguage } from "@/lib/i18n/context";

interface ReportDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeImage2Index: number;
  setActiveImage2Index: (index: number) => void;
}

export function ReportDrawer({ 
  open, 
  onOpenChange, 
  activeImage2Index, 
  setActiveImage2Index 
}: ReportDrawerProps) {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[80vh] w-full max-w-5xl mx-auto flex flex-col bg-contain bg-no-repeat bg-bottom" style={{ backgroundImage: "url('/landscape.svg')"}}>
        <DrawerTitle></DrawerTitle>
        <div className="h-full overflow-hidden w-full flex items-start justify-center"> {/* h-calc(100%-4rem) accounts for padding */}
          <div className="inline-block w-full max-w-3xl px-6">
            <div className="square md:aspect-video w-full relative">
              <img
                src="/sugriwo.png"
                alt="Farmer 1"
                className={`w-full h-70 md:h-90 object-cover rounded-b-4xl absolute inset-0 transition-opacity duration-300 ease-in-out ${
                  activeImage2Index === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              />
              <img
                src="/supriyadi.png"
                alt="Farmer 2"
                className={`w-full h-70 md:h-90 object-cover rounded-b-4xl absolute inset-0 transition-opacity duration-300 ease-in-out ${
                  activeImage2Index === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              />
              <img
                src="/laptop.png"
                alt="Data Library"
                className={`w-full h-70 md:h-90 object-cover rounded-b-4xl absolute inset-0 transition-opacity duration-300 ease-in-out ${
                  activeImage2Index === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              />
            </div>
            <div className="px-6 mt-80 md:mt-0 flex-1 flex flex-col">
              <div >
                <Carousel opts={{ align: "end" }} className="w-full" setApi={(api: CarouselApi) => {
                  api?.on("select", () => {
                    setActiveImage2Index(api.selectedScrollSnap());
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
                            <div className="text-sm">@ HKm Lestari Sejahtera</div>
                          </div>
                          <Button
                              type="button"
                              className="flex items-center justify-center"
                            >
                              {t('hero.seeDetails')}
                          </Button>
                        </Card>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      {/* Farmer1 Report2 */}
                      <div className="flex flex-col items-center">
                        <Card
                          className="flex items-center justify-between gap-4 w-64 md:w-lg p-4 shadow-none hover:shadow-none"
                          onClick={() => {onOpenChange(false)}}>
                          <div className="text-left">
                            <div className="text-lg md:text-2xl font-bold">Supriyadi</div>
                            <div className="text-sm">{t('hero.hasPlanted')}</div>
                            <div className="text-sm">@ HKm Lestari Sejahtera</div>
                          </div>
                          <Button
                              type="button"
                              className="flex items-center justify-center"
                            >
                              {t('hero.seeDetails')}
                          </Button>
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