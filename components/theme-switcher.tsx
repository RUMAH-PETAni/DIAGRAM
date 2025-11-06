"use client";

import { Button } from "@/components/retroui/ButtonCustom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

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
    <Button 
    className="flex items-center justify-center h-10 w-10 p-0"
    onClick={toggleTheme}>
      {theme === "light" ? (
        <Sun key="light" />
      ) : (
        <Moon key="dark" />
      )}
    </Button>
  );
};

export { ThemeSwitcher };
