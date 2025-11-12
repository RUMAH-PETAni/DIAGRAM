"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/retroui/ButtonCustom";
import { Card, CardContent } from "@/components/retroui/CardCustom";
import { Text } from "@/components/retroui/Text";
import { useTheme } from "next-themes";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerHeader,
} from "@/components/retroui/DrawerCustom";
import { Progress } from "@/components/retroui/Progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/retroui/Tooltip";
import { TreesIcon } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

interface CampaignDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  showReportDrawer: boolean;
  setShowReportDrawer: (show: boolean) => void;
  setShowCampaignDrawer: (show: boolean) => void;
  progress: number;
}

export function CampaignDrawer({ 
  open, 
  onOpenChange, 
  showReportDrawer, 
  setShowReportDrawer, 
  setShowCampaignDrawer,
  progress
}: CampaignDrawerProps) {
  const { t } = useLanguage();

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button
          variant="secondary"
          type="button"
          className="flex items-center justify-center"
          onClick={() => onOpenChange(true)}
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
              variant="outline"
              type="button"
              className="flex items-center justify-center"
              onClick={() => {
                setShowReportDrawer(true);
                setShowCampaignDrawer(false);
              }}
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
  );
}