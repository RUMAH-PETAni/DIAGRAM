'use client';

import { Button } from '@/components/retroui/ButtonCustom';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage = language === 'id' ? 'en' : 'id';
    setLanguage(newLanguage);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="px-2 py-1">
        {language === 'id' ? t('general.indonesian') : t('general.english')}
      </span>
      <Button
        variant="default"
        size="sm"
        onClick={toggleLanguage}
        className="h-10 w-10 flex items-center justify-center"
        aria-label={`Switch language to ${language === 'id' ? 'English' : 'Indonesian'}`}
      >
        <span className="font-medium">{language.toUpperCase()}</span>
      </Button>
    </div>
  );
}