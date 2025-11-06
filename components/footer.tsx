"use client";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import ReactMarkdown from 'react-markdown';

export function Footer() {
  const [showTermsSheet, setShowTermsSheet] = useState(false);
  const [showPrivacySheet, setShowPrivacySheet] = useState(false);
  const [termsContent, setTermsContent] = useState("");
  const [privacyContent, setPrivacyContent] = useState("");

  const fetchTermsOfService = async () => {
    try {
      const response = await fetch('/terms-of-service-en.md');
      const text = await response.text();
      setTermsContent(text);
    } catch (error) {
      console.error('Error fetching terms of service:', error);
      setTermsContent('# Terms of Service\n\nError loading content.');
    }
  };

  const fetchPrivacyPolicy = async () => {
    try {
      const response = await fetch('/privacy-policy-en.md');
      const text = await response.text();
      setPrivacyContent(text);
    } catch (error) {
      console.error('Error fetching privacy policy:', error);
      setPrivacyContent('# Privacy Policy\n\nError loading content.');
    }
  };

  return (
    <footer className="w-full flex flex-col items-center justify-center mx-auto text-center gap-3 py-6">
      <div className="flex gap-4">
        <button
          type="button"
          className="underline cursor-pointer hover:text-foreground transition-colors"
          onClick={async () => {
            await fetchTermsOfService();
            setShowTermsSheet(true);
          }}
        >
          Terms of Service
        </button>
        <button
          type="button"
          className="underline cursor-pointer hover:text-foreground transition-colors"
          onClick={async () => {
            await fetchPrivacyPolicy();
            setShowPrivacySheet(true);
          }}
        >
          Privacy Policy
        </button>
      </div>
      
      {/* Terms of Service Sheet */}
      <Sheet open={showTermsSheet} onOpenChange={setShowTermsSheet}>
        <SheetContent className="w-[90vw] max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-center text-base">Terms of Service</SheetTitle>
          </SheetHeader>
          <div className="p-6 prose prose-sm max-w-none text-xs leading-relaxed space-y-4">
            <ReactMarkdown>{termsContent}</ReactMarkdown>
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Privacy Policy Sheet */}
      <Sheet open={showPrivacySheet} onOpenChange={setShowPrivacySheet}>
        <SheetContent className="w-[90vw] max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-center text-base">Privacy Policy</SheetTitle>
          </SheetHeader>
          <div className="p-6 prose prose-sm max-w-none text-xs leading-relaxed space-y-4">
            <ReactMarkdown>{privacyContent}</ReactMarkdown>
          </div>
        </SheetContent>
      </Sheet>
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

