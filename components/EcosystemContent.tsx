'use client';

import { Text } from "@/components/retroui/Text";
import Marquee from "@/components/ui/marquee";
import { useLanguage } from "@/lib/i18n/context";
import { Button } from "@/components/retroui/ButtonCustom";
import { Avatar } from "@/components/retroui/Avatar";
import Lottie from "lottie-react";
import indonesiaMap from "./indonesia-map-data";
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
import { useState } from "react";
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

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="w-full flex flex-col gap-10 items-center justify-center flex-1 min-h-0">
      <div className="w-full max-w-sm md:max-w-5xl text-center text-balance">
        <Text as="h1">{t('explore.ecosystemTitle')}</Text>
        <div className="flex justify-center mt-6">
          <Button 
            variant="outline" 
            onClick={handleOpenDrawer}
          >
            {t('general.joinNow')}
          </Button>
        </div>

        {/* component with Lottie animation and multiple stacked Avatars */}
        <div className="aspect-video overflow-hidden max-w-5xl mt-6">
          <div className="flex items-center justify-center relative">
            <Lottie
              className = "items-center justify-center"
              animationData={indonesiaMap}
              loop={true}
              style={{
                width: 'auto',
                height: 'auto',

              }}
              rendererSettings={{
                preserveAspectRatio: 'xMidYMid slice'
              }}
            />
            
            <div className="absolute top-4 right-8 flex -space-x-6"> {/* Overlapping effect with negative margin */}
              <div className="hover:scale-110 z-10 hover:z-20 transition-transform duration-200 ease-in-out cursor-pointer">
                <Avatar className="w-12 h-12 md:w-16 md:h-16">
                  <Avatar.Image
                  alt="avatar"
                  src="/avatar/male.webp"
                  />
                </Avatar>
              </div>
              <div className="hover:scale-110 z-10 hover:z-20 transition-transform duration-200 ease-in-out cursor-pointer">
                <Avatar className="w-12 h-12 md:w-16 md:h-16">
                  <Avatar.Image
                  alt="avatar"
                  src="/avatar/female.webp"
                  />
                </Avatar>
              </div>
              <div className="hover:scale-110 z-10 hover:z-20 transition-transform duration-200 ease-in-out cursor-pointer">
                <Avatar className="w-12 h-12 md:w-16 md:h-16">
                  <Avatar.Image
                  alt="avatar"
                  src="/avatar/male1.webp"
                  />
                </Avatar>
              </div>
              <div className="hover:scale-110 z-10 hover:z-20 transition-transform duration-200 ease-in-out cursor-pointer">
                <Avatar className="w-12 h-12 md:w-16 md:h-16">
                  <Avatar.Image
                  alt="avatar"
                  src="/avatar/female1.webp"
                  />
                </Avatar>
              </div>
               <div className="hover:scale-110 z-10 hover:z-20 transition-transform duration-200 ease-in-out cursor-pointer">
                <Avatar className="w-12 h-12 md:w-16 md:h-16">
                  <Avatar.Image
                  alt="avatar"
                  src="/avatar/male2.webp"
                  />
                </Avatar>
              </div>
              <div className="hover:scale-110 z-10 hover:z-20 transition-transform duration-200 ease-in-out cursor-pointer">
                <Avatar className="w-12 h-12 md:w-16 md:h-16">
                  <Avatar.Image
                  alt="avatar"
                  src="/avatar/female2.webp"
                  />
                </Avatar>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="w-full max-w-5xl px-6 flex items-center justify-center">
          <Carousel className="w-full max-w-5xl">
            <CarouselContent>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="w-full shadow-none hover:shadow-md mt-6 flex flex-col h-64 sm:h-[300px]">
                  <Card.Content className="flex flex-col flex-1 p-4">
                    <Text className="text-base flex-1 text-center">
                      &quot; Dulu saya mencatat semua penanaman di buku. Sekarang, dengan DIAGRAM, saya bisa memantau pertumbuhan pohon dari ponsel &quot;
                    </Text>
                    <div className="flex items-center space-x-2 mt-auto pt-4">
                      <Avatar className="h-16 w-16">
                        <Avatar.Image
                          alt="avatar"
                          src="/sugriwo-small.png"
                        />
                      </Avatar>
                      <div>
                        <div className="text-left font-medium text-sm">Sugriwo</div>
                        <div className="text-left text-xs text-gray-500 dark:text-gray-400">
                          Petani
                        </div>
                      </div>
                    </div>
                  </Card.Content>
                </Card>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="w-full shadow-none hover:shadow-md mt-6 flex flex-col h-64 sm:h-[300px]">
                  <Card.Content className="flex flex-col flex-1 p-4">
                    <Text className="text-base flex-1 text-center">
                      &quot; Bagi Penyuluh Kehutanan ini adalah alat kerja yang revolusioner, tidak perlu lagi membawa catatan lusuh semua data ada di ujung jari &quot;
                    </Text>
                    <div className="flex items-center space-x-2 mt-auto pt-4">
                      <Avatar className="h-16 w-16">
                        <Avatar.Image
                          alt="avatar"
                          src="/bondan.png"
                        />
                      </Avatar>
                      <div>
                        <div className="text-left font-medium text-sm">Bondan P.</div>
                        <div className="text-left text-xs text-gray-500 dark:text-gray-400">
                          Staff KPH
                        </div>
                      </div>
                    </div>
                  </Card.Content>
                </Card>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="w-full shadow-none hover:shadow-md mt-6 flex flex-col h-64 sm:h-[300px]">
                  <Card.Content className="flex flex-col flex-1 p-4">
                    <Text className="text-base flex-1 text-center">
                      &quot; Mengelola data agroforestri secara lebih efisien dan transparan. 
                      Proses monitoring pohon, lahan, dan mitra kini jauh lebih mudah diakses dan terintegrasi. &quot;
                    </Text>
                    <div className="flex items-center space-x-2 mt-auto pt-4">
                      <Avatar className="h-16 w-16">
                        <Avatar.Image
                          alt="avatar"
                          src="/fajars.png"
                        />
                      </Avatar>
                      <div>
                        <div className="text-left font-medium text-sm">F.Surachman</div>
                        <div className="text-left text-xs text-gray-500 dark:text-gray-400">
                          Manager Project
                        </div>
                      </div>
                    </div>
                  </Card.Content>
                </Card>
              </CarouselItem>
              
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="w-full shadow-none hover:shadow-md mt-6 flex flex-col h-64 sm:h-[300px]">
                  <Card.Content className="flex flex-col flex-1 p-4">
                    <Text className="text-base flex-1 text-center">
                      &quot; Platform yang ditujukan untuk para petani kaum milenial, mari tetap dukung petani lokal kita.. Lanjutkan mas bro!👍 &quot;
                    </Text>
                    <div className="flex items-center space-x-2 mt-auto pt-4">
                      <Avatar className="h-16 w-16">
                        <Avatar.Image
                          alt="avatar"
                          src="/sahmi.png"
                        />
                      </Avatar>
                      <div>
                        <div className="text-left font-medium text-sm">Sahmi</div>
                        <div className="text-left text-xs text-gray-500 dark:text-gray-400">
                          Ketua Kelompok
                        </div>
                      </div>
                    </div>
                  </Card.Content>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="w-full shadow-none hover:shadow-md mt-6 flex flex-col h-64 sm:h-[300px]">
                  <Card.Content className="flex flex-col flex-1 p-4">
                    <Text className="text-base flex-1 text-center">
                      &quot; Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. &quot;
                    </Text>
                    <div className="flex items-center space-x-2 mt-auto pt-4">
                      <Avatar className="h-16 w-16">
                        <Avatar.Image
                          alt="avatar"
                          src="/duryat.png"
                        />
                      </Avatar>
                      <div>
                        <div className="text-left font-medium text-sm">Duryat</div>
                        <div className="text-left text-xs text-gray-500 dark:text-gray-400">
                          Akademisi
                        </div>
                      </div>
                    </div>
                  </Card.Content>
                </Card>
              </CarouselItem>
               <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="w-full shadow-none hover:shadow-md mt-6 flex flex-col h-64 sm:h-[300px]">
                  <Card.Content className="flex flex-col flex-1 p-4">
                    <Text className="text-base flex-1 text-center">
                      &quot; Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. &quot;
                    </Text>
                    <div className="flex items-center space-x-2 mt-auto pt-4">
                      <Avatar className="h-16 w-16">
                        <Avatar.Image
                          alt="avatar"
                          src="/avatar/male3.webp"
                        />
                      </Avatar>
                      <div>
                        <div className="text-left font-medium text-sm">A.M Muslih</div>
                        <div className="text-left text-xs text-gray-500 dark:text-gray-400">
                          Akademisi
                        </div>
                      </div>
                    </div>
                  </Card.Content>
                </Card>
              </CarouselItem>
               <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="w-full shadow-none hover:shadow-md mt-6 flex flex-col h-64 sm:h-[300px]">
                  <Card.Content className="flex flex-col flex-1 p-4">
                    <Text className="text-base flex-1 text-center">
                      &quot; Aplikasi yang cukup membagongkan! 😁
                      mengajak kami para petani untuk melek teknologi..&quot;
                    </Text>
                    <div className="flex items-center space-x-2 mt-auto pt-4">
                      <Avatar className="h-16 w-16">
                        <Avatar.Image
                          alt="avatar"
                          src="/avatar/male2.webp"
                        />
                      </Avatar>
                      <div>
                        <div className="text-left font-medium text-sm">Anonimous</div>
                        <div className="text-left text-xs text-gray-500 dark:text-gray-400">
                          Petani
                        </div>
                      </div>
                    </div>
                  </Card.Content>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
      </div>
      <div className="w-full justify-center">
        <h3 className="font-bold text-lg text-center">{t('explore.ecosystemPartner')}</h3>
        <Marquee items={[
          "/partner/mitra1.webp", "/partner/mitra2.webp", "/partner/mitra3.webp", "/partner/mitra4.webp", "/partner/mitra5.webp", "/partner/mitra6.webp", "/partner/mitra7.webp",
          
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