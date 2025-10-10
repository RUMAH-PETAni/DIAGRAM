'use client';

import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useI18n } from '@/lib/i18n-context';
import { Globe } from 'lucide-react';
import React from 'react';

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  const handleLanguageChange = (newLocale: 'en' | 'id') => {
    setLocale(newLocale);
    // Optionally reload the page to update all content, or handle client-side updates
    // For this implementation, we'll keep it client-side with context updates
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Language switcher">
          <Globe className="h-5 w-5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('en')}
          className={locale === 'en' ? 'font-semibold' : ''}
        >
          <span className="mr-2"></span> English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('id')}
          className={locale === 'id' ? 'font-semibold' : ''}
        >
          <span className="mr-2"></span> Indonesia
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}