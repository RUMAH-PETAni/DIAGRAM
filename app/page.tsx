'use client';

import { EnvVarWarning } from "@/components/env-var-warning";
import { Hero } from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { LanguageSwitcher } from "@/components/language-switcher";
import { NextLogo } from "@/components/next-logo";
import { SupabaseLogo } from "@/components/supabase-logo";
import { Button } from "@/components/ui/button";
import OpenAILogo from "@/components/openai-logo";
import LogoCarousel from "@/components/logo-carousel";
import { useI18n } from "@/lib/i18n-context";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { PolicyDrawer } from "@/components/policy-drawer";

export default function Home() {
  const { t } = useI18n();
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Handle scroll to show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 fixed top-0 z-50 bg-background">
          <div className="w-full max-w-5xl flex justify-end items-center p-3 px-8 text-sm">
            <div className="flex items-center  gap-2">
              <LanguageSwitcher />
              <ThemeSwitcher />
              {!hasEnvVars ? <EnvVarWarning /> : (
                <Link href="/auth/login">
                  <Button variant="outline">Log in</Button>
                </Link>
              )}
            </div>
          </div>
        </nav>
        <div className="flex-1 flex flex-col gap-20 mt-20 max-w-5xl p-5 pt-16">
          <Hero />
        </div>
        
        <footer className="w-full flex flex-col items-center justify-center border-t mx-auto text-center text-xs gap-4 py-8">
          <p className="pt-4">
            Powered by:
          </p>
          <div className="hidden md:flex gap-8 items-center">
            <a
              href="https://example.com/"  /* Replace with actual RumahPetani URL */
              target="_blank"
              rel="noreferrer"
              className="transition hover:opacity-80 flex items-center"
            >
              <Image 
                src="/rumahpetani.svg" 
                alt="Rumah Petani Logo" 
                width={90} 
                height={30}
                className="h-8 object-contain"
              />
            </a>
            <a
              href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
              target="_blank"
              rel="noreferrer"
              className="transition hover:opacity-80 flex items-center"
            >
              <div className="h-8 flex items-center">
                <SupabaseLogo />
              </div>
            </a>
            <a
              href="https://nextjs.org/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:opacity-80 flex items-center"
            >
              <div className="h-8 flex items-center">
                <NextLogo />
              </div>
            </a>
            <a
              href="https://react-leaflet.js.org/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:opacity-80 flex items-center"
            >
              <Image 
                src="/logo-react-leaflet.svg" 
                alt="React Leaflet Logo" 
                width={120}
                height={50}
                className="h-12 object-contain"
              />
            </a>
            <a
              href="https://openai.com/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:opacity-80 flex items-center"
            >
              <div className="h-8 flex items-center">
                <OpenAILogo width={90} height={30} />
              </div>
            </a>
          </div>
          <div className="md:hidden w-full max-w-xs mt-4">
            <LogoCarousel 
              logos={[
                {
                  href: "https://example.com/",
                  alt: "Rumah Petani Logo",
                  children: <Image 
                    src="/rumahpetani.svg" 
                    alt="Rumah Petani Logo" 
                    width={90} 
                    height={30}
                    className="h-8 object-contain"
                  />
                },
                {
                  href: "https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs",
                  alt: "Supabase Logo",
                  children: <div className="h-8 flex items-center"><SupabaseLogo /></div>
                },
                {
                  href: "https://nextjs.org/",
                  alt: "Next.js Logo",
                  children: <div className="h-8 flex items-center"><NextLogo /></div>
                },
                {
                  href: "https://react-leaflet.js.org/",
                  alt: "React Leaflet Logo",
                  children: <Image 
                    src="/logo-react-leaflet.svg" 
                    alt="React Leaflet Logo" 
                    width={120}
                    height={50}
                    className="h-12 object-contain"
                  />
                },
                {
                  href: "https://openai.com/",
                  alt: "OpenAI Logo",
                  children: <div className="h-8 flex items-center"><OpenAILogo width={90} height={30} /></div>
                }
              ]}
            />
          </div>
                   
          <p className="pt-4">
            © 2025 DIAGRAM
          </p>
          <div className="flex justify-center gap-4 pt-2 text-xs">
            
            
            <PolicyDrawer policyType="terms">
              <button className="text-muted-foreground hover:text-foreground underline underline-offset-4">
                {t('termsOfService')}
              </button>
            </PolicyDrawer>
            <span className="text-muted-foreground">|</span>
            <PolicyDrawer policyType="privacy">
              <button className="text-muted-foreground hover:text-foreground underline underline-offset-4">
                {t('privacyPolicy')}
              </button>
            </PolicyDrawer>
          </div>          
        </footer>
      </div>
      
      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 z-50"
          aria-label="Back to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </main>
  );
}
