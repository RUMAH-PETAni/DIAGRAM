'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getTranslation, Locale, translations } from '@/lib/i18n';

type I18nContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  getTranslations: () => typeof import('./i18n').translations[Locale];
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');

  // Initialize locale from localStorage or browser language
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale | null;
    if (savedLocale) {
      setLocale(savedLocale);
    } else {
      const browserLocale = navigator.language.startsWith('id') ? 'id' : 'en';
      setLocale(browserLocale as Locale);
    }
  }, []);

  // Update HTML lang attribute when locale changes
  useEffect(() => {
    document.documentElement.lang = locale;
    localStorage.setItem('locale', locale);
  }, [locale]);

  const t = (key: string) => {
    return getTranslation(key, locale);
  };

  const getTranslations = () => {
    return translations[locale];
  };

  const value = {
    locale,
    setLocale,
    t,
    getTranslations,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}