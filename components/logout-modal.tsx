"use client";

import { useState } from "react";
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/retroui/CardCustom";
import { Button } from "@/components/retroui/ButtonCustom";
import { Dialog } from "@/components/retroui/DialogCustom";
import { Text } from "@/components/retroui/Text";
import { useLanguage } from "@/lib/i18n/context";

export function LogoutModal({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
}) {
  const { t } = useLanguage();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Call the server action using fetch
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        window.location.href = '/';
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error("Error during logout:", error);
      setIsLoggingOut(false);
    }
  };

  return ( 
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Content size={"md"}>
        <Dialog.Header>
          <Text as="h5">{t('auth.confirmAction')}</Text>
        </Dialog.Header>
        <section className="flex flex-col gap-4 p-4">
          <section>
            <p>{t('auth.confirmLogout')}</p>
            <p>{t('auth.needToSignInAgain')}</p>
          </section>
          <section className="flex w-full justify-end">
            <Button
            className="flex items-center justify-center"
            onClick={handleLogout}
            disabled={isLoggingOut}
            >
              {isLoggingOut ? t('auth.loggingOut') : t('general.logout')}
            </Button>
          </section>
        </section>
      </Dialog.Content>
    </Dialog>
    
  );
}