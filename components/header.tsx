"use client";

import { AuthButtonClient } from "@/components/auth-button-client";
import { AIButton } from "@/components/ai-button";
import { Navigation } from "@/components/navigation";
import { useState, useEffect } from "react";


export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`w-full flex justify-center h-20 sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/10 dark:bg-black/10 backdrop-blur-sm' : ''}`}>
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm gap-2">
        <AuthButtonClient />
         <div className="flex gap-2">
          <AIButton />
          <Navigation />
      </div>
      </div>
    </header>
  );
}