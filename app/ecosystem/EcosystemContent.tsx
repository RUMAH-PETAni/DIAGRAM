'use client';

import { Text } from "@/components/retroui/Text";
import Marquee from "@/components/ui/marquee";
import { useLanguage } from "@/lib/i18n/context";
import { Button } from "@/components/retroui/ButtonCustom";
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/retroui/DrawerCustom";
import { useState } from "react";
import { SignupForm } from "@/components/signup/signup-form";

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
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={handleOpenDrawer}
          >
            {t('general.join')}
          </Button>
        </div>
      </div>
      <div className="w-full justify-center">
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