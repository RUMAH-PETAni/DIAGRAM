"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Lottie from "lottie-react";
import indonesiaMap from "./indonesia-map-data";
import { useTheme } from "next-themes";
import { TypeAnimation } from 'react-type-animation';
import Link from "next/link";
import { Drone, MonitorCloud, Trees, ThermometerSun, Network, Cpu, Factory, Brain, NotebookText, MonitorSmartphone, Truck, Bot, Users, Sprout, LandPlot } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

import { Separator } from "@/components/ui/separator";
import ServiceCard from "./ServiceCard";
import FakeChatAgroforestry from "./FakeChatAgroforestry";
import { useI18n } from "@/lib/i18n-context";
import { Locale } from "@/lib/i18n";
import ImageCompareSlider from '@/components/ImageCompareSlider';

export function Hero() {
  const { t, getTranslations, locale } = useI18n();
  const { theme } = useTheme();
  
  // State untuk melacak apakah komponen sudah di-mount di client dan untuk animasi teks
  const [isMounted, setIsMounted] = useState(false);
  const [animationTexts, setAnimationTexts] = useState<string[]>([]);
  // Set default animationTexts untuk mencegah tampilan kosong saat pertama load
  const [currentLocale, setCurrentLocale] = useState<Locale>('en'); // Default sementara
  const hydratedRef = useRef(false);

  useEffect(() => {
    // Update locale lokal untuk memperbarui nilai default sebelum mount
    setCurrentLocale(locale);
    if (isMounted) {
      const texts = getTranslations().heroAnimationTexts as string[];
      setAnimationTexts(texts);
    }
  }, [locale, isMounted, getTranslations]);

  useEffect(() => {
    setIsMounted(true);
    hydratedRef.current = true;
    // Setelah di-mount, ambil teks animasi pertama kali
    const texts = getTranslations().heroAnimationTexts as string[];
    setAnimationTexts(texts);
  }, [getTranslations]);

  // Jika belum di-mount, kita tetap tampilkan tampilan dasar tanpa animasi teks kosong
  if (!isMounted) {
    return (
      <div className="flex flex-col gap-8 items-center w-full max-w-5xl px-4">
        <h1 className="sr-only">DIAGRAM</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-full overflow-hidden">
          <div className="grid grid-rows-2 gap-4 max-w-full">
            <div className="flex flex-col items-start justify-center row-span-1 overflow-hidden">
              <p className="text-6xl md:text-7xl lg:text-8xl !leading-tight roboto-mono font-bold text-left">
                {t('diagram')}
              </p>
              <p className="text-sm md:text-xl lg:text-xl mt-2 text-muted-foreground">
                {t('digitalEcosystem')}
              </p>
                
            </div>
            <div className="flex flex-col justify-between p-4 border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer h-full overflow-hidden">
              <div className="flex items-start justify-start">
                <p className="text-left text-sm md:text-xl lg:text-2xl roboto-mono font-medium">
                  {/* Saat belum di-mount, tampilkan placeholder untuk mencegah tampilan kosong */}
                  <span className="opacity-0 h-6 block">Loading...</span>
                </p>
              </div>
              <div className="mt-4 flex justify-start">
                <Link href="/auth/sign-up">
                  <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                    {t('heroButton')}
                  </button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center overflow-hidden">
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
              <div className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
        <blockquote className="text-sm italic text-muted-foreground mt-2">
                {t('heroQuote')}
              </blockquote>
        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
        
        <h2 className="text-2xl font-bold mb-6 text-left">{t('featuresAndServices')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-full">
          <div className="border rounded-lg p-6 hover:bg-accent hover:text-accent-foreground transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-lg">
            <div className="flex rounded-lg bg-primary/10 items-center gap-3 mb-2" >
            
              <div className="w-16 h-16 text-primary" />
              <h3 className="font-bold text-lg">{t('farmerLandDataManagement')}</h3>
            </div>
            <Separator className="my-3" />
            <p className="text-muted-foreground">
              {t('farmerLandDataManagementDesc')}
            </p>
          </div>
          <div className="border rounded-lg p-6 hover:bg-accent hover:text-accent-foreground transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-lg">
            <div className="flex rounded-lg bg-primary/10 items-center gap-3 mb-2">
              <div className="w-16 h-16 text-primary" />
              <h3 className="font-bold text-lg">{t('interactiveMonitoringMap')}</h3>
            </div>
            <Separator className="my-3" />
            <p className="text-muted-foreground">
              {t('interactiveMonitoringMapDesc')}
            </p>
          </div>
          <div className="border rounded-lg p-6 hover:bg-accent hover:text-accent-foreground transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-lg">
            <div className="flex rounded-lg bg-primary/10 items-center gap-3 mb-2">
              <div className="w-16 h-16 text-primary" />
              <h3 className="font-bold text-lg">{t('ecommerce')}<br/>{t('agroforestry')}</h3>
            </div>
            <Separator className="my-3" />
            <p className="text-muted-foreground">
              {t('agroforestryDesc')}
            </p>
          </div>
        </div>

        <ImageCompareSlider
          before="/before.jpg"
          after="/after.jpg"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-full mt-8">
          <div className="">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Trees className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-xl">{t('sustainableTech')}</h3>
            </div>
            <Separator className="my-4" />
            <p className="text-muted-foreground">
              {t('sustainableTechDesc')}
            </p>
            
            <div className="mt-12 w-full">
              <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="border rounded-lg p-4 hover:bg-accent hover:text-accent-foreground transition-all duration-300 cursor-pointer flex flex-col items-center justify-center hover:-translate-y-1 hover:shadow-md">
                  <Users className="w-8 h-8 mb-2" />
                  <h3 className="font-bold text-[0.6rem] text-center">{t('usersDashboard')}</h3>
                </div>
                 <div className="border rounded-lg p-4 hover:bg-accent hover:text-accent-foreground transition-all duration-300 cursor-pointer flex flex-col items-center justify-center hover:-translate-y-1 hover:shadow-md">
                  <Network className="w-8 h-8 mb-2" />
                  <h3 className="font-bold text-[0.6rem] text-center">{t('communityHub')}</h3>
                </div>
                <div className="border rounded-lg p-4 hover:bg-accent hover:text-accent-foreground transition-all duration-300 cursor-pointer flex flex-col items-center justify-center hover:-translate-y-1 hover:shadow-md">
                  <LandPlot className="w-8 h-8 mb-2" />
                  <h3 className="font-bold text-[0.6rem] text-center">{t('landMapping')}</h3>
                </div>
                <div className="border rounded-lg p-4 hover:bg-accent hover:text-accent-foreground transition-all duration-300 cursor-pointer flex flex-col items-center justify-center hover:-translate-y-1 hover:shadow-md">
                  <Sprout className="w-8 h-8 mb-2" />
                  <h3 className="font-bold text-[0.6rem] text-center">{t('farmMonitoring')}</h3>
                </div>
                <div className="border rounded-lg p-4 hover:bg-accent hover:text-accent-foreground transition-all duration-300 cursor-pointer flex flex-col items-center justify-center hover:-translate-y-1 hover:shadow-md">
                  <MonitorCloud className="w-8 h-8 mb-2" />
                  <h3 className="font-bold text-[0.6rem] text-center">{t('landCover')}</h3>
                </div>
                <div className="border rounded-lg p-4 hover:bg-accent hover:text-accent-foreground transition-all duration-300 cursor-pointer flex flex-col items-center justify-center hover:-translate-y-1 hover:shadow-md">
                  <ThermometerSun className="w-8 h-8 mb-2" />
                  <h3 className="font-bold text-[0.6rem] text-center">{t('soilClimateData')}</h3>
                </div>
                  <div className="border rounded-lg p-4 hover:bg-accent hover:text-accent-foreground transition-all duration-300 cursor-pointer flex flex-col items-center justify-center hover:-translate-y-1 hover:shadow-md">
                  <NotebookText className="w-8 h-8 mb-2" />
                  <h3 className="font-bold text-[0.6rem] text-center">{t('logActivity')}</h3>
                </div>
                  <div className="border rounded-lg p-4 hover:bg-accent hover:text-accent-foreground transition-all duration-300 cursor-pointer flex flex-col items-center justify-center hover:-translate-y-1 hover:shadow-md">
                  <Brain className="w-8 h-8 mb-2" />
                  <h3 className="font-bold text-[0.6rem] text-center">{t('aiRecommendation')}</h3>
                </div>
                <div className="border rounded-lg p-4 hover:bg-accent hover:text-accent-foreground transition-all duration-300 cursor-pointer flex flex-col items-center justify-center hover:-translate-y-1 hover:shadow-md">
                  <Drone className="w-8 h-8 mb-2" />
                  <h3 className="font-bold text-[0.6rem] text-center">{t('droneImagery')}</h3>
                </div>
                  <div className="border rounded-lg p-4 hover:bg-accent hover:text-accent-foreground transition-all duration-300 cursor-pointer flex flex-col items-center justify-center hover:-translate-y-1 hover:shadow-md">
                  <Cpu className="w-8 h-8 mb-2" />
                  <h3 className="font-bold text-[0.6rem] text-center">{t('IoT')}</h3>
                </div>
                  <div className="border rounded-lg p-4 hover:bg-accent hover:text-accent-foreground transition-all duration-300 cursor-pointer flex flex-col items-center justify-center hover:-translate-y-1 hover:shadow-md">
                  <Factory className="w-8 h-8 mb-2" />
                  <h3 className="font-bold text-[0.6rem] text-center">{t('carbonFootprint')}</h3>
                </div>              
                <div className="border rounded-lg p-4 hover:bg-accent hover:text-accent-foreground transition-all duration-300 cursor-pointer flex flex-col items-center justify-center hover:-translate-y-1 hover:shadow-md">
                  <Truck className="w-8 h-8 mb-2" />
                  <h3 className="font-bold text-[0.6rem] text-center">{t('commoditySupplyChain')}</h3>
                </div>
               
              
                
              </div>
            </div>
          </div>
          
          <div className="">
            <div className="flex items-center  gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-xl">{t('aiGronomistAssistant')}</h3>
            </div>
            <Separator className="my-4" />
            
            <div className="mt-6 flex items-center justify-center">
              <FakeChatAgroforestry />
            </div>
          </div>
        </div>
        
        <div className="w-full max-w-full overflow-hidden mt-6">
          <div className="flex items-center  gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <MonitorSmartphone className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold text-xl">{t('freeAccess')}</h3>
          </div>
         
          
          <AspectRatio ratio={16 / 9} className="border rounded-lg overflow-hidden max-w-full">
            <div className="w-full h-full flex items-center justify-center p-4 relative">
              <Lottie 
                key={`lottie-mobile-${theme || 'system'}`} // Force re-render when theme changes
                animationData={indonesiaMap} 
                loop={true}
                style={{
                  width: '100%',
                  height: '100%',
                  filter: hydratedRef.current && theme === 'dark' ? 'invert(1) hue-rotate(180deg)' : 'none',
                }}
                rendererSettings={{
                  preserveAspectRatio: 'xMidYMid slice'
                }}
              />
              <p className="text-muted-foreground mb-6 text-left">{t('accessibleToAnyone')}</p>
              <div className="absolute top-4 right-4 flex -space-x-4">
                <div className="p-1 bg-white rounded-full hover:scale-125 transition-transform duration-200 ease-in-out cursor-pointer w-10 h-10 md:w-16 md:h-16">
                  <div className="w-full h-full rounded-full border border-gray-200 hover:scale-125 transition-transform duration-200 ease-in-out cursor-pointer object-cover" />
                </div>
                <div className="p-1 bg-white rounded-full hover:scale-125 transition-transform duration-200 ease-in-out cursor-pointer w-10 h-10 md:w-16 md:h-16">
                  <div className="w-full h-full rounded-full border border-gray-200 hover:scale-125 transition-transform duration-200 ease-in-out cursor-pointer object-cover" />
                </div>
                <div className="p-1 bg-white rounded-full hover:scale-125 transition-transform duration-200 ease-in-out cursor-pointer w-10 h-10 md:w-16 md:h-16">
                  <div className="w-full h-full rounded-full border border-gray-200 hover:scale-125 transition-transform duration-200 ease-in-out cursor-pointer object-cover" />
                </div>
                <div className="p-1 bg-white rounded-full hover:scale-125 transition-transform duration-200 ease-in-out cursor-pointer w-10 h-10 md:w-16 md:h-16">
                  <div className="w-full h-full rounded-full border border-gray-200 hover:scale-125 transition-transform duration-200 ease-in-out cursor-pointer object-cover" />
                </div>
                 <div className="p-1 bg-white rounded-full hover:scale-125 transition-transform duration-200 ease-in-out cursor-pointer w-10 h-10 md:w-16 md:h-16">
                  <div className="w-full h-full rounded-full border border-gray-200 hover:scale-125 transition-transform duration-200 ease-in-out cursor-pointer object-cover" />
                </div>
                <div className="p-1 bg-white rounded-full hover:scale-125 transition-transform duration-200 ease-in-out cursor-pointer w-10 h-10 md:w-16 md:h-16">
                  <div className="w-full h-full rounded-full border border-gray-200 hover:scale-125 transition-transform duration-200 ease-in-out cursor-pointer object-cover" />
                </div>
              </div>
            </div>
          </AspectRatio>
          {/* New card with responsive aspect ratio and background image */}
          <div 
            className="w-full rounded-xl overflow-hidden mt-10 mb-10 aspect-[1/1] sm:aspect-[16/6]"
          >
            <div 
              className="w-full h-full bg-cover bg-center flex items-center justify-end relative"
              style={{ backgroundImage: "url('/image1.png')" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/100 dark:to-black/100"></div>
              <div className="relative z-10 text-right p-6 sm:p-8 max-w-md w-full">
                <h3 className="text-4xl sm:text-4xl md:text-4xl font-bold text-black dark:text-white mb-2 sm:mb-4">{t('letsJoin')}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Jika sudah di-mount, render versi lengkap
  return (
    <div className="flex flex-col gap-8 items-center w-full max-w-5xl px-4">
      <h1 className="sr-only">DIAGRAM</h1>
 
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-full overflow-hidden">
        {/* Left column with DIAGRAM title and subtitle */}
        <div className="grid grid-rows-2 gap-4 max-w-full">
          <div className="flex flex-col items-start justify-center row-span-1 overflow-hidden">
            <p className="text-7xl md:text-8xl lg:text-8xl  roboto-mono font-bold text-left">
              {t('diagram')}
            </p>
            <p className="text md:text-2xl mt-2 text-muted-foreground">
              {t('digitalEcosystem')}
            </p>
              
          </div>
          <div className="flex flex-col justify-between p-4 border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer h-full overflow-hidden">
            <div className="flex items-start justify-start">
              <p className="text-left text-sm md:text-xl lg:text-2xl roboto-mono font-medium">
                <TypeAnimation
                  key={currentLocale} // Gunakan state lokal untuk key agar lebih stabil
                  sequence={[
                    animationTexts[0] || 'Loading...',
                    2000,
                    animationTexts[1] || 'Loading...',
                    2000,
                    animationTexts[2] || 'Loading...',
                    2000,
                    animationTexts[3] || 'Loading...',
                    2000
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </p>
            </div>
            <div className="mt-4 flex justify-start">
              <Link href="/auth/sign-up">
                <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                  {t('heroButton')}
                </button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Right column with handplant image - height matching total left column height */}
        <div className="flex items-center justify-center overflow-hidden">
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <Image 
              src="/handplant.svg" 
              alt="Handplant" 
              width={500}
              height={500}
              className={`w-full h-full object-contain ${theme === 'dark' ? 'invert' : ''} `}
            />
          </div>
        </div>
      </div>
      <blockquote className="text-sm italic text-muted-foreground mt-2">
              {t('heroQuote')}
            </blockquote>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
      
      <h2 className="text-2xl font-bold mb-6 text-left">{t('featuresAndServices')}</h2>
      
      {/* Existing cards section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-full">
        <div className="border rounded-lg p-6 hover:bg-accent hover:text-accent-foreground transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-lg">
          <div className="flex rounded-lg bg-primary/10 items-center gap-3 mb-2" >
          
            <Image 
              src="/feature1.svg" 
              alt="Feature 1 Icon" 
              width={64}
              height={64}
              className={`w-16 h-16  text-primary ${theme === 'dark' ? 'invert' : ''}`}
            />
            <h3 className="font-bold text-lg">{t('farmerLandDataManagement')}</h3>
          </div>
          <Separator className="my-3" />
          <p className="text-sm md:text text-muted-foreground">
            {t('farmerLandDataManagementDesc')}
          </p>
        </div>
        <div className="border rounded-lg p-6 hover:bg-accent hover:text-accent-foreground transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-lg">
          <div className="flex rounded-lg bg-primary/10 items-center gap-3 mb-2">
            <Image 
              src="/feature2.svg" 
              alt="Feature 2 Icon" 
              width={64}
              height={64}
              className={`w-16 h-16  text-primary ${theme === 'dark' ? 'invert' : ''}`}
            />
            <h3 className="font-bold text-lg">{t('interactiveMonitoringMap')}</h3>
          </div>
          <Separator className="my-3" />
          <p className="text-sm md:text text-muted-foreground">
            {t('interactiveMonitoringMapDesc')}
          </p>
        </div>
        <div className="border rounded-lg p-6 hover:bg-accent hover:text-accent-foreground transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-lg relative">
          <div className="absolute top-2 right-2 z-10">
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {t('comingSoon')}
            </span>
          </div>
          <div className="flex rounded-lg bg-primary/10 items-center gap-3 mb-2">
            <Image 
              src="/feature3.svg" 
              alt="Feature 3 Icon" 
              width={64}
              height={64}
              className={`w-16 h-16  text-primary ${theme === 'dark' ? 'invert' : ''}`}
            />
            <h3 className="font-bold text-lg">{t('ecommerce')}<br/>{t('agroforestry')}</h3>
          </div>
          <Separator className="my-3" />
          <p className="text-sm md:text text-muted-foreground">
            {t('agroforestryDesc')}
          </p>
        </div>
      </div>

      <ImageCompareSlider
        before="/before.jpg"
        after="/after.jpg"
      />

      {/* New 2-column grid layout below features cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-full mt-8">
        <div className="flex flex-col h-full">
          <div className="flex items-center  gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Trees className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold text-xl">{t('sustainableTech')}</h3>
          </div>
          <Separator className="my-4" />
          <p className="text-muted-foreground flex-grow">
            {t('sustainableTechDesc')}
          </p>
          
          <div className="mt-10 w-full">
            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <ServiceCard 
                icon={Users} 
                titleKey="usersDashboard" 
              />
              <ServiceCard 
                icon={Network} 
                titleKey="communityHub" 
              />
              <ServiceCard 
                icon={LandPlot} 
                titleKey="landMapping"
              />
                <ServiceCard 
                icon={Sprout} 
                titleKey="farmMonitoring" 
              /> 
              <ServiceCard 
                icon={MonitorCloud} 
                titleKey="landCover" 
              />
              <ServiceCard 
                icon={ThermometerSun} 
                titleKey="soilClimateData" 
              />  
               <ServiceCard 
                icon={NotebookText} 
                titleKey="logActivity" 
              />           
              <ServiceCard 
                icon={Brain} 
                titleKey="aiRecommendation" 
              />
               <ServiceCard 
                icon={Drone} 
                titleKey="droneImagery" 
                badgeTextKey="onDemandService"               
              />
              <ServiceCard 
                icon={Cpu} 
                titleKey="IoT" 
                badgeTextKey="onDemandService"
                
              />
               <ServiceCard 
                icon={Factory} 
                titleKey="carbonFootprint"
                badgeTextKey="onDemandService"
              />
              <ServiceCard 
                icon={Truck} 
                titleKey="commoditySupplyChain"
                badgeTextKey="onDemandService"
              />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col h-full">
          <div className="flex items-center  gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold text-xl">{t('aiGronomistAssistant')}</h3>
          </div>
          <Separator className="my-4" />
          
          <div className="flex-grow flex items-center justify-center">
            <FakeChatAgroforestry />
          </div>
            <p className="text-xs italic text-muted-foreground text-center items-center justify-center flex-grow mt-4">
              {t('chatDesc')}
            </p>
         </div>
      </div>
      
      <div className="w-full max-w-full overflow-hidden mt-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <MonitorSmartphone className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-bold text-xl">{t('freeAccess')}</h3>
        </div>
        
        
        {/* Aspect Ratio component with Lottie animation and multiple stacked Avatars */}
        <AspectRatio ratio={16 / 9} className="border rounded-lg overflow-hidden max-w-full">
          <div className="w-full h-full flex items-center justify-center p-4 relative">
            <Lottie 
              key={`lottie-${theme || 'system'}`} // Force re-render when theme changes
              animationData={indonesiaMap} 
              loop={true}
              style={{
                width: '100%',
                height: '100%',
                filter: hydratedRef.current && theme === 'dark' ? 'invert(1) hue-rotate(180deg)' : 'none',
              }}
              rendererSettings={{
                preserveAspectRatio: 'xMidYMid slice'
              }}
            />
            
            <div className="absolute top-4 right-4 flex -space-x-4"> {/* Overlapping effect with negative margin */}
              <div className="p-1 bg-white rounded-full hover:scale-125 transition-transform duration-200 ease-in-out cursor-pointer w-10 h-10 md:w-16 md:h-16">
                <Image
                  src="/avatar/male.png"
                  alt="Avatar 1"
                    width={100}
                  height={100}
                  className="w-full h-full rounded-full border border-gray-200 hover:scale-125 transition-transform duration-200 ease-in-out cursor-pointer object-cover"
                />
              </div>
              <div className="p-1 bg-white rounded-full hover:scale-125 transition-transform duration-200 ease-in-out cursor-pointer w-10 h-10 md:w-16 md:h-16">
                <Image
                  src="/avatar/female.png"
                  alt="Avatar 2"
                    width={100}
                  height={100}
                  className="w-full h-full rounded-full border border-gray-200 hover:scale-125 transition-transform duration-200 ease-in-out cursor-pointer object-cover"
                />
              </div>
              <div className="p-1 bg-white rounded-full hover:scale-125 transition-transform duration-200 ease-in-out cursor-pointer w-10 h-10 md:w-16 md:h-16">
                <Image
                  src="/avatar/male1.png"
                  alt="Avatar 3"
                    width={100}
                  height={100}
                  className="w-full h-full rounded-full border border-gray-200 hover:scale-125 transition-transform duration-200 ease-in-out cursor-pointer object-cover"
                />
              </div>
              <div className="p-1 bg-white rounded-full hover:scale-125 transition-transform duration-200 ease-in-out cursor-pointer w-10 h-10 md:w-16 md:h-16">
                <Image
                  src="/avatar/female1.png"
                  alt="Avatar 4"
                   width={100}
                  height={100}
                  className="w-full h-full rounded-full border border-gray-200 hover:scale-125 transition-transform duration-200 ease-in-out cursor-pointer object-cover"
                />
              </div>
               <div className="p-1 bg-white rounded-full hover:scale-125 transition-transform duration-200 ease-in-out cursor-pointer w-10 h-10 md:w-16 md:h-16">
                <Image
                  src="/avatar/male2.png"
                  alt="Avatar 5"
                    width={100}
                  height={100}
                  className="w-full h-full rounded-full border border-gray-200 hover:scale-125 transition-transform duration-200 ease-in-out cursor-pointer object-cover"
                />
              </div>
              <div className="p-1 bg-white rounded-full hover:scale-125 transition-transform duration-200 ease-in-out cursor-pointer w-10 h-10 md:w-16 md:h-16">
                <Image
                  src="/avatar/female2.png"
                  alt="Avatar 5"
                   width={100}
                  height={100}
                  className="w-full h-full rounded-full border border-gray-200 hover:scale-125 transition-transform duration-200 ease-in-out cursor-pointer object-cover"
                />
              </div>
            </div>
            <p className="absolute bottom-4 left-4 text-muted-foreground text-xs md:text-sm text-left">{t('accessibleToAnyone')}</p>
          </div>
          
        </AspectRatio>
       
        {/* New card with responsive aspect ratio and background image */}
        <div 
          className="w-full rounded-xl overflow-hidden mt-10 mb-10 aspect-[1/1] sm:aspect-[16/6]"
        >
          <div 
            className="w-full h-full bg-cover bg-center flex items-center justify-end relative"
            style={{ backgroundImage: "url('/image1.png')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/100 dark:to-black/100"></div>
            <div className="relative z-10 text-right p-6 sm:p-8 max-w-md w-full">
              <h3 className="text-4xl sm:text-4xl md:text-4xl font-bold text-black dark:text-white mb-2 sm:mb-4">{t('letsJoin')}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

