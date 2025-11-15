"use client";

import { Button } from "@/components/retroui/ButtonCustom";
import { Blocks, DatabaseZap, Globe, MessageCircleQuestion, Handshake, House, Info, Map, Settings, Shapes, Shield, Sun, InfoIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Dialog } from "@/components/retroui/DialogCustom";
import { Card, CardContent } from "@/components/retroui/CardCustom"
import { Text } from "@/components/retroui/Text";
import Link from "next/link";
import { FAQDrawer } from "@/components/faq-drawer";
import { useLanguage } from "@/lib/i18n/context";
import { 
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/retroui/DrawerCustom";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { LocationSettings } from "@/components/location-settings";

const Navigation = () => {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [showNavDrawer, setShowNavDrawer] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      
      <Button 
        className="flex items-center justify-center h-10 w-10 p-0"
        onClick={() => setShowNavDrawer(true)}>
        <Blocks />
      </Button>
      
      {/* Modal with 4 grid icons */}
      <Drawer open={showNavDrawer} onOpenChange={setShowNavDrawer} direction="top">
        <DrawerContent className="h-[430px] md:h-[200px] w-full max-w-5xl mx-auto px-6" >
          <DrawerHeader>
             <DrawerTitle className="font-bold text-2xl">{t('nav.navigation')}</DrawerTitle>
          </DrawerHeader>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <Card className="border p-4 bg-background flex flex-col items-center justify-center">
              <House className="h-8 w-8 mb-2" />
              <Button 
              size="sm"
              className="w-full flex text-xs items-center justify-center"
              onClick={() => {
              setShowNavDrawer(false);
              window.location.href = "/";
              }}>
                {t('nav.home')}
              </Button>
            </Card>
      
            <Card className="border p-4 bg-background flex flex-col items-center justify-center">       
            <Shapes className="h-8 w-8 mb-2" />
            <Button 
              size="sm"
              className="w-full flex text-xs items-center justify-center"
              onClick={() => {
              setShowNavDrawer(false);
              window.location.href = "/features";
            }}>
              {t('nav.features')}
            </Button>
            </Card>

            <Card className="border p-4 bg-background flex flex-col items-center justify-center">    
            <Handshake className="h-8 w-8 mb-2" />
            <Button 
              size="sm"
              className="w-full flex text-xs items-center justify-center"
              onClick={() => {
              setShowNavDrawer(false);
              window.location.href = "/services";
            }}>
              {t('nav.services')}
            </Button>
            </Card>

            <Card className="border p-4 bg-background flex flex-col items-center justify-center">  
            <DatabaseZap className="h-8 w-8 mb-2" />
            <Button 
              size="sm"
              className="w-full flex text-xs items-center justify-center"
              onClick={() => {
              setShowNavDrawer(false);
              window.location.href = "/library";
            }}>
              {t('nav.library')}
            </Button>
            </Card>

            <Card className="border p-4 bg-background flex flex-col items-center justify-center"> 
            <Settings className="h-8 w-8 mb-2" />
            <Button 
              size="sm"
              className="w-full flex text-xs items-center justify-center"
              onClick={() => {
              setShowNavDrawer(false);
              setShowSettingsDrawer(true);
            }}>
              {t('nav.settings')}
            </Button>
            </Card>
            <Card className="border p-4 bg-background flex flex-col items-center justify-center"> 
            <InfoIcon className="h-8 w-8 mb-2" />
            <Button 
              size="sm"
              className="w-full flex text-xs items-center justify-center"
              onClick={() => {
              setShowNavDrawer(false);
              window.location.href = "/about";
            }}>
              {t('nav.about')}
            </Button>
            </Card>
          </div>
        </DrawerContent>
      </Drawer>
      
      {/* Settings Drawer */}
      <Drawer open={showSettingsDrawer} onOpenChange={setShowSettingsDrawer} direction="top">
        <DrawerContent className="h-[310px]  w-full max-w-md mx-auto px-6 ">
          <DrawerHeader>
            <DrawerTitle className="font-bold text-2xl">{t('nav.settings')}</DrawerTitle>
          </DrawerHeader>
          <div className=" max-w-none">
            
            <div className="flex items-center justify-between my-2 p-3 bg-muted">
              <span className="font-bold">{t('general.theme')}</span>
              <ThemeSwitcher />
            </div>
            <div className="flex items-center justify-between my-2 p-3 bg-muted">
              <span className="font-bold">{t('general.language')}</span>
              <LanguageSwitcher />
            </div>
            <div className="flex items-center justify-between my-2 p-3 bg-muted">
              <span className="font-bold">{t('settings.locationAccess')}</span>
              <LocationSettings />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
      
      <FAQDrawer isOpen={showFAQ} onOpenChange={setShowFAQ} />
    </>
  );
};

export { Navigation };
