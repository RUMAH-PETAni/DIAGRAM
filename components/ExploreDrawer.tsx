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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Blocks, DatabaseZap, Handshake, Shapes, Sparkles } from "lucide-react";
import React from "react";
import { useLanguage } from "@/lib/i18n/context";

interface ExploreDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeImageIndex: number;
  setActiveImageIndex: (index: number) => void;
}

export function ExploreDrawer({ 
  open, 
  onOpenChange, 
  activeImageIndex, 
  setActiveImageIndex 
}: ExploreDrawerProps) {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="top">
      <DrawerContent className="h-[80vh] w-full max-w-5xl mx-auto flex flex-col bg-contain bg-no-repeat bg-bottom" style={{ backgroundImage: "url('/landscape.svg')"}}>
        <DrawerTitle></DrawerTitle>
        <div className="h-full overflow-hidden w-full flex items-start justify-center"> {/* h-calc(100%-4rem) accounts for padding */}
          <div className="inline-block w-full max-w-3xl px-6">
            <div className="square md:aspect-video w-full relative">
              <img
                src="/farmer1.png"
                alt="Ecosystem"
                className={`w-full h-70 md:h-90 object-cover rounded-b-4xl absolute inset-0 transition-opacity duration-300 ease-in-out ${
                  activeImageIndex === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              />
              <img
                src="/tabletmap1.png"
                alt="Features & Tools"
                className={`w-full h-70 md:h-90 object-cover rounded-b-4xl absolute inset-0 transition-opacity duration-300 ease-in-out ${
                  activeImageIndex === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              />
              <img
                src="/hero1.png"
                alt="On Demand Services"
                className={`w-full h-70 md:h-90 object-cover rounded-b-4xl absolute inset-0 transition-opacity duration-300 ease-in-out ${
                  activeImageIndex === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              />
              <img
                src="/laptop.png"
                alt="Data Library"
                className={`w-full h-70 md:h-90 object-cover rounded-b-4xl absolute inset-0 transition-opacity duration-300 ease-in-out ${
                  activeImageIndex === 3 ? 'opacity-100 z-10' : 'opacity-0 z-0'
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
                          className="flex items-center justify-center gap-4 w-64 md:w-lg p-4 cursor-pointer"
                          onClick={() => {
                            router.push("/ecosystem");
                            onOpenChange(false);
                          }}
                        >
                          <div className=" w-16 flex items-center justify-center">
                          <Sparkles className="mr-2 h-10 w-10"/>
                          </div>
                          <div className="text-left">
                            <div className="text-lg md:text-2xl font-bold">{t('explore.ecosystem')}</div>
                          </div>
                        </Card>
                        <div className="mt-2 text-center">
                          <p className="text-muted-foreground">{t('explore.ecosystemDesc')}</p>
                        </div>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      {/* Features & Tools Button */}
                      <div className="flex flex-col items-center justify-center">
                        <Card
                          className="flex items-center justify-center gap-4 w-64 md:w-lg p-4 cursor-pointer"
                          onClick={() => {
                            router.push("/features");
                            onOpenChange(false);
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
                          className="flex items-center justify-center gap-4 w-64 md:w-lg p-4 cursor-pointer"
                          onClick={() => {
                            router.push("/services");
                            onOpenChange(false);
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
                          className="flex items-center justify-center gap-4 w-64 md:w-lg p-4 cursor-pointer"
                          onClick={() => {
                            router.push("/library");
                            onOpenChange(false);
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
  );
}