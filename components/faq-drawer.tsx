"use client";

import { useState } from "react";
import { Button } from "@/components/retroui/ButtonCustom";
import { Accordion } from "@/components/retroui/AccordionCustom";
import { X } from "lucide-react";
import {
  Drawer,
  DrawerHeader,
  DrawerContent,
  DrawerTitle,
} from "@/components/retroui/DrawerCustom";
import { useLanguage } from "@/lib/i18n/context";

export function FAQDrawer({ isOpen = false, onOpenChange }: { isOpen?: boolean; onOpenChange?: (open: boolean) => void }) {
  const { t } = useLanguage();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const effectiveIsOpen = isOpen !== undefined ? isOpen : internalIsOpen;
  const setIsOpen = onOpenChange || setInternalIsOpen;

  // FAQ content is now translatable
  const faqs = [
    {
      id: 1,
      question: t('faq.whoIsRumahpetani'),
      answer: t('faq.whoIsRumahpetaniAnswer')
    },
    {
      id: 2,
      question: t('faq.whatIsDiagram'),
      answer: t('faq.whatIsDiagramAnswer')
    },
    {
      id: 3,
      question: t('faq.howToGetStarted'),
      answer: t('faq.howToGetStartedAnswer')
    },
    {
      id: 4,
      question: t('faq.cost'),
      answer: t('faq.costAnswer')
    },
    {
      id: 5,
      question: t('faq.mobileSupport'),
      answer: t('faq.mobileSupportAnswer')
    },
    {
      id: 6,
      question: t('faq.contactSupport'),
      answer: t('faq.contactSupportAnswer')
    }
  ];

  return (
    <Drawer open={effectiveIsOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="h-[80vh] w-full max-w-5xl mx-auto px-6">
        <DrawerHeader>
          <DrawerTitle className="text-2xl font-bold">{t('faq.title')}</DrawerTitle>
        </DrawerHeader>  
          <Accordion type="single" collapsible className="w-full p-4">
            {faqs.map((faq) => (
              <Accordion.Item key={faq.id} value={`item-${faq.id}`} className="mb-3">
                <Accordion.Header>
                  <span className="text-left">{faq.question}</span>
                </Accordion.Header>
                <Accordion.Content>
                  {faq.answer}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion>
      </DrawerContent>
    </Drawer>
  );
}