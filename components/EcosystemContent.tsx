'use client';

import { Text } from "@/components/retroui/Text";
import Marquee from "@/components/ui/marquee";
import { useLanguage } from "@/lib/i18n/context";
import { Button } from "@/components/retroui/ButtonCustom";
import { Avatar } from "@/components/retroui/Avatar";
import { useTheme } from "next-themes";
import { createBrowserClient } from "@supabase/ssr";
import indonesiaMap from "./indonesia-map-data";
import ThemedLottie from "./ThemedLottie";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/retroui/CardCustom";
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/retroui/DrawerCustom";
import { useState, useEffect } from "react";
import { SignupForm } from "@/components/signup/signup-form";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousela";
import { AspectRatio } from "./ui/aspect-ratio";

export default function EcosystemContent() {
  const { t } = useLanguage();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const testimonialItems = [
    {
      testimoni: "\"Dulu saya mencatat semua penanaman di buku. Sekarang, dengan DIAGRAM, saya bisa memantau pertumbuhan pohon dari ponsel\"",
      name: "Sugriwo",
      role: "Petani",
      image: "partner/sugriwo.png",
      alt: "avatar",
    },
   {
      testimoni: "\"Bagi Penyuluh Kehutanan ini adalah alat kerja yang revolusioner, tidak perlu lagi membawa catatan lusuh semua data ada di ujung jari\"",
      name: "Bondan P.",
      role: "Staff KPH",
      image: "partner/bondan.png",
      alt: "avatar",
    },
    {
      testimoni: "\"Platform yang ditujukan untuk para petani milenial, ayo dukung produk lokal kita agar terus berkembang.. Lanjutkan mas bro!👍\"",
      name: "Sahmi",
      role: "Ketua Kelompok",
      image: "partner/sahmi.png",
      alt: "avatar",
    },
    {
      testimoni: "\"Mengelola data agroforestri secara lebih efisien dan transparan. Proses monitoring pohon, lahan, dan mitra kini jauh lebih mudah diakses dan terintegrasi.\"",
      name: "I.F Surachman",
      role: "Manajer Project",
      image: "partner/fajars.png",
      alt: "avatar",
    },
       {
      testimoni: "\"Alat digital yang cukup mudah digunakan dan sangat membantu ketika dilapangan, saya berharap bisa dikembangkan untuk versi offlinenya 👌\"",
      name: "Hadi A.",
      role: "Forest Ranger",
      image: "partner/hadi.png",
      alt: "avatar",
    },
    {
      testimoni: "\"Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.\"",
      name: "A.M Muslih",
      role: "Akademisi",
      image: "avatar/male3.webp",
      alt: "avatar",
    },
    {
      testimoni: "\"Aplikasi yang sangat membantu! mengajak para petani untuk melek teknologi 😁\"",
      name: "Anonimous",
      role: "Masyarakat Sipil",
      image: "avatar/male2.webp",
      alt: "avatar",
    }
  ];

  return (
    <div className="w-full flex flex-col gap-10 items-center justify-center flex-1 min-h-0">
      <div className="w-full md:max-w-5xl text-center text-balance mt-10">
        <Text as="h1">{isAuthenticated ? t('explore.ecosystemTitle2') : t('explore.ecosystemTitle')}</Text>
        {!isAuthenticated && (
          <div className="flex justify-center mt-6">
            <Button 
              variant="outline" 
              onClick={handleOpenDrawer}
            >
              {t('general.joinNow')}
            </Button>
          </div>
        )}

        {/* Planting Bamboo Image - Full width on desktop, full height on mobile */}
        <div className="w-full -mt-10">
          <div className="md:hidden w-full h-96 relative">
            <img 
              src="/planting-bamboo.png" 
              alt="Planting bamboo illustration" 
              className="absolute inset-0 w-full h-full object-cover rounded-4xl"
            />
          </div>
          <div className="hidden md:block w-full">
            <img 
              src="/planting-bamboo.png" 
              alt="Planting bamboo illustration" 
              className="w-full h-auto max-h-[700px] object-contain rounded-4xl"
            />
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="w-full max-w-5xl px-12 flex items-center justify-center mt-10">
         <Carousel className="w-full" opts={{ align: "start", loop: true }}>
            <CarouselContent>
              {testimonialItems.map((item) => (
                <CarouselItem key={item.name} className="basis-full sm:basis-3/4 md:basis-1/3">
                  <Card className="w-full shadow-none hover:shadow-md mt-6 flex flex-col h-64 sm:h-[300px]">
                    <Card.Content className="flex flex-col flex-1 p-4">
                      <Text className="text-base flex-1 text-center">
                        {item.testimoni}
                      </Text>
                      <div className="flex items-center space-x-2 mt-auto pt-4">
                        <Avatar className="h-16 w-16">
                          <Avatar.Image
                            src={item.image}
                            alt={item.alt}
                          />
                        </Avatar>
                        <div>
                          <div className="text-left font-medium text-sm">{item.name}</div>
                          <div className="text-left text-xs text-gray-500 dark:text-gray-400">
                            {item.role}
                          </div>
                        </div>
                      </div>
                    </Card.Content>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
          </Carousel>
        </div>
      </div>
      <div className="w-full justify-center">
        <h3 className="font-bold text-lg text-center">{t('explore.ecosystemPartner')}</h3>
        <Marquee items={[
          "/partner/mitra1.webp", "/partner/mitra2.webp", "/partner/mitra3.webp","/partner/mitra.webp", "/partner/mitra4.webp", "/partner/mitra5.webp", "/partner/mitra6.webp", "/partner/mitra7.webp",
          
          ]}
          />
      </div>

      {/* Drawer for Sign Up Form */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="h-[80vh] w-full max-w-3xl mx-auto p-6">
          <DrawerHeader>
            <DrawerTitle className="font-bold text-2xl text-center">
              {t('auth.signUpTitle')}
            </DrawerTitle>
          </DrawerHeader>
          <div className="p-6 max-w-none h-[calc(80vh-80px)] overflow-y-auto">
            <SignupForm onClose={handleCloseDrawer} />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}