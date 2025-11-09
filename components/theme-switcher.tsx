"use client";

import { Button } from "@/components/retroui/ButtonCustom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/context";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="px-2 py-1">
        {theme === 'light' ? t('general.light') : t('general.dark')}
      </span>
      <Button
        className="flex items-center justify-center h-10 w-10 p-0"
        onClick={toggleTheme}
      >
        {theme === "light" ? (
          <Sun key="light" />
        ) : (
          <Moon key="dark" />
        )}
      </Button>
    </div>
  );
};

export { ThemeSwitcher };