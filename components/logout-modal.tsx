"use client";

import { useState } from "react";
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/retroui/CardCustom";
import { Button } from "@/components/retroui/ButtonCustom";
import {
  Dialog,
  DialogContent,
} from "@/components/retroui/DialogCustom";

export function LogoutModal({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
}) {
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
      <DialogContent className="w-full max-w-full sm:max-w-md sm:mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Logout confirmation?</CardTitle>
          <CardDescription>
            Are you sure you want to log out? You'll need to sign in again to access your account.
          </CardDescription>
        </CardHeader>
        <div className = "grid grid-cols-2 gap-4 p-4">   
          <Button
            type="button"
            className="flex items-center justify-center"
            variant="outline"
            onClick={onClose}
            disabled={isLoggingOut}
          >
            Cancel
          </Button>
          <Button
            className="flex items-center justify-center"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </Button>
        </div> 
      </DialogContent>
    </Dialog>
  );
}