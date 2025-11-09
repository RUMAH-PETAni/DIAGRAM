"use client";

import { Button } from "@/components/retroui/ButtonCustom";
import { Blocks, DatabaseZap, Globe, MessageCircleQuestion, Handshake, House, Info, Map, Settings, Shapes, Shield, Sun } from "lucide-react";
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
} from "@/components/retroui/DrawerCustomTop";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { LocationSettings } from "@/components/location-settings";

const Navigation = () => {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
        onClick={() => setShowModal(true)}>
        <Blocks />
      </Button>
      
      {/* Modal with 4 grid icons */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <Dialog.Content size={"md"}>
          <Dialog.Header>
            <Text as="h5">{t('nav.navigationMenu')}</Text>
          </Dialog.Header>
          <div className="grid grid-cols-2 gap-4 p-4">
            <Card className="border p-4 bg-background flex flex-col items-center justify-center">
              <House className="h-8 w-8 mb-2" />
              <Button 
              size="sm"
              className="w-full flex text-xs items-center justify-center"
              onClick={() => {
              setShowModal(false);
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
              setShowModal(false);
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
              setShowModal(false);
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
              setShowModal(false);
              window.location.href = "/data-library";
            }}>
              {t('nav.library')}
            </Button>
            </Card>

            <Card className="border p-4 bg-background flex flex-col items-center justify-center"> 
            <MessageCircleQuestion className="h-8 w-8 mb-2" />
            <Button 
              size="sm"
              className="w-full flex text-xs items-center justify-center"
              onClick={() => {
              setShowModal(false);
              setShowFAQ(true);
            }}>
              {t('nav.faq')}
            </Button>
            </Card>

            <Card className="border p-4 bg-background flex flex-col items-center justify-center"> 
            <Settings className="h-8 w-8 mb-2" />
            <Button 
              size="sm"
              className="w-full flex text-xs items-center justify-center"
              onClick={() => {
              setShowModal(false);
              setShowSettingsDrawer(true);
            }}>
              {t('nav.settings')}
            </Button>
            </Card>
          </div>
        </Dialog.Content>
      </Dialog>
      
      {/* Settings Drawer */}
      <Drawer open={showSettingsDrawer} onOpenChange={setShowSettingsDrawer} direction="top">
        <DrawerContent className="h-[40vh] w-full max-w-md mx-auto px-6">
          <DrawerHeader>
            <DrawerTitle className="font-bold text-2xl">{t('nav.settings')}</DrawerTitle>
          </DrawerHeader>
          <div className="p-2 max-w-none">
            <div className="flex items-center justify-between py-2">
              <span className="font-bold">{t('general.theme')}</span>
              <ThemeSwitcher />
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="font-bold">{t('general.language')}</span>
              <LanguageSwitcher />
            </div>
            <div className="flex items-center justify-between py-2">
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
