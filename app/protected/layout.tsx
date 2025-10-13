import { EnvVarWarning } from "@/components/env-var-warning";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Button } from "@/components/ui/button";
import { NextLogo } from "@/components/next-logo";
import { SupabaseLogo } from "@/components/supabase-logo";
import OpenAILogo from "@/components/openai-logo";
import LogoCarousel from "@/components/logo-carousel";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-end items-center p-3 px-5 text-sm">
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <ThemeSwitcher />
              {!hasEnvVars ? <EnvVarWarning /> : null}
            </div>
          </div>
        </nav>
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          {children}
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
              <img 
                src="/logo-react-leaflet.svg" 
                alt="React Leaflet Logo" 
    
                height={80}
                className="h-8 object-contain"
              />
            </a>
            <a
              href="https://openai.com/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:opacity-80 flex items-center"
            >
              <div className="h-8 flex items-center">
                <OpenAILogo width={60} height={30} />
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
                    width={100} 
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
                    width={100} 
                    height={30}
                    className="h-8 object-contain"
                  />
                },
                {
                  href: "https://openai.com/",
                  alt: "OpenAI Logo",
                  children: <div className="h-8 flex items-center"><OpenAILogo width={60} height={20} /></div>
                }
              ]}
            />
          </div>
        </footer>
      </div>
    </main>
  );
}
