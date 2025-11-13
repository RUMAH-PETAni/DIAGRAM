"use client";

import Link from "next/link";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/retroui/DrawerCustom";
import { Card, CardContent } from "@/components/retroui/CardCustom"
import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import { FAQDrawer } from "@/components/faq-drawer";
import { useLanguage } from "@/lib/i18n/context";

export function Footer() {
  const { language, t } = useLanguage();
  const [showTermsSheet, setShowTermsSheet] = useState(false);
  const [showPrivacySheet, setShowPrivacySheet] = useState(false);
  const [termsContent, setTermsContent] = useState("");
  const [privacyContent, setPrivacyContent] = useState("");
  const [showFAQ, setShowFAQ] = useState(false);

  const fetchTermsOfService = async () => {
    try {
      const response = await fetch(`/terms-of-service-${language}.md`);
      const text = await response.text();
      setTermsContent(text);
    } catch (error) {
      console.error('Error fetching terms of service:', error);
      // Fallback to English if the language-specific file doesn't exist
      try {
        const response = await fetch('/terms-of-service-en.md');
        const text = await response.text();
        setTermsContent(text);
      } catch {
        setTermsContent('# Terms of Service\n\nError loading content.');
      }
    }
  };

  const fetchPrivacyPolicy = async () => {
    try {
      const response = await fetch(`/privacy-policy-${language}.md`);
      const text = await response.text();
      setPrivacyContent(text);
    } catch (error) {
      console.error('Error fetching privacy policy:', error);
      // Fallback to English if the language-specific file doesn't exist  
      try {
        const response = await fetch('/privacy-policy-en.md');
        const text = await response.text();
        setPrivacyContent(text);
      } catch {
        setPrivacyContent('# Privacy Policy\n\nError loading content.');
      }
    }
  };

  // Refetch content when language changes
  useEffect(() => {
    if (showTermsSheet) {
      fetchTermsOfService();
    }
    if (showPrivacySheet) {
      fetchPrivacyPolicy();
    }
  }, [language]);

  return (
    <footer className="w-full flex flex-col items-center justify-center mx-auto text-center gap-3 py-6">
      <div className="flex gap-4">
         <button
          type="button"
          className="underline cursor-pointer hover:text-foreground transition-colors"
          onClick={async () => {
            setShowFAQ(true);
          }}
        >
          {t('general.faq')}
        </button>
        <button
          type="button"
          className="underline cursor-pointer hover:text-foreground transition-colors"
          onClick={async () => {
            await fetchTermsOfService();
            setShowTermsSheet(true);
          }}
        >
          {t('general.terms')}
        </button>
        <button
          type="button"
          className="underline cursor-pointer hover:text-foreground transition-colors"
          onClick={async () => {
            await fetchPrivacyPolicy();
            setShowPrivacySheet(true);
          }}
        >
          {t('general.privacy')}
        </button>
       
      </div>
      
      {/* Terms of Service drawer */}
     <Drawer open={showTermsSheet} onOpenChange={setShowTermsSheet}>
        <DrawerContent className="h-[80vh] w-full max-w-3xl mx-auto px-6">
          <DrawerHeader>
            <DrawerTitle className="font-bold text-2xl">{t('general.terms')}</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 max-w-none leading-relaxed space-y-4 h-[calc(80vh-80px)] overflow-y-auto">
            <ReactMarkdown>{termsContent}</ReactMarkdown>
          </div>
        </DrawerContent>
      </Drawer>
      
      {/* Privacy Policy Drawer */}
      <Drawer open={showPrivacySheet} onOpenChange={setShowPrivacySheet}>
        <DrawerContent className="h-[80vh] w-full max-w-3xl mx-auto px-6">
          <DrawerHeader>
            <DrawerTitle className="font-bold text-2xl">{t('general.privacy')}</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 max-w-none leading-relaxed space-y-4 h-[calc(80vh-80px)] overflow-y-auto">
            <ReactMarkdown>{privacyContent}</ReactMarkdown>
          </div>
        </DrawerContent>
      </Drawer>
      <FAQDrawer isOpen={showFAQ} onOpenChange={setShowFAQ} />
        
         <p>
        © 2025 |{" "}
        <Link
          href="/about"
          className="font-bold hover:underline"
        >
          RUMAHPETAni
        </Link>
      
      </p>
    </footer>
  );
}

