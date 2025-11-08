'use client';

import { Button } from '@/components/retroui/ButtonCustom';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage = language === 'id' ? 'en' : 'id';
    setLanguage(newLanguage);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="h-10 w-10 flex items-center justify-center"
      aria-label={`Switch language to ${language === 'id' ? 'English' : 'Indonesian'}`}
    >
      
      <span className="font-medium">{language.toUpperCase()}</span>
    </Button>
  );
}