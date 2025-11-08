"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/retroui/ButtonCustom";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/retroui/InputCustom";
import { toast } from "sonner";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n/context";

type ForgotPasswordFormProps = {
  className?: string;
  onClose?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

export function ForgotPasswordForm({ 
  className,
  onClose,
  ...props
}: ForgotPasswordFormProps) {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      // The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      
      // Show success toast instead of changing UI
      toast.success("Check Your Email", {
        description: "If you registered using your email and password, you will receive a password reset email.",
      });
      
      // Optionally clear the form after successful submission
      setEmail("");
      
      // Close the modal if onClose function is provided
      if (onClose) {
        onClose();
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleForgotPassword} className= "p-4">
      <FieldGroup>
        <div className="flex flex-col  gap-2">
          <p>{t('auth.forgotPasswordDescription')}</p>
        </div>
          <Field>
            <FieldLabel htmlFor="email">{t('auth.email')}</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('auth.emailPlaceholder')}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
          </Field>
   
              <section className="flex w-full justify-end">
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button 
                className="flex items-center justify-center"
                type="submit" disabled={isLoading}>
                {isLoading ? t('auth.sending') : t('auth.sendResetEmail')}
              </Button>
              </section>          
      </FieldGroup>
    </form>
  );
}
