"use client"

import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/retroui/ButtonCustom"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import { Input } from "@/components/retroui/InputCustom"
import Link from "next/link"
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/retroui/CardCustom";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/retroui/DrawerCustom";
import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import { useLanguage } from "@/lib/i18n/context";
import { useRouter } from "next/navigation"

export function SignupForm({
  className,
  onClose,
  ...props
}: React.ComponentProps<"div"> & { onClose?: () => void }) {
  const { language, t } = useLanguage();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError(t('auth.passwordsNotMatch'));
      setIsLoading(false);
      return;
    }

    if (!hasConsented) {
      setError(t('auth.mustAgree'));
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/new-user`,
          data: {
            display_name: username,
          },
        },
      });
      if (error) throw error;

      // Close the drawer after successful signup
      if (onClose) {
        onClose();
      }
       // Redirect to the homepage or protected route after successful login
      router.refresh();
      router.push("/");
      // Show success toast instead of modal
      toast.success(t('auth.toastCheckReg'), {
        description: `${t('auth.toastCheckEmailReg')} ${email}`,
      });

      // Reset form fields after successful registration
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const [showTermsSheet, setShowTermsSheet] = useState(false);
  const [showPrivacySheet, setShowPrivacySheet] = useState(false);
  const [termsContent, setTermsContent] = useState("");
  const [privacyContent, setPrivacyContent] = useState("");

  const fetchTermsOfService = async () => {
    try {
      const response = await fetch(`/terms-of-service-${language}.md`);
      const text = await response.text();
      setTermsContent(text);
    } catch (error) {
      console.error('Error fetching terms of service:', error);
      // Fallback to English if the language-specific file doesn't exist
      try {
        const response = await fetch('/terms-of-service-en.md');
        const text = await response.text();
        setTermsContent(text);
      } catch {
        setTermsContent('# Terms of Service\n\nError loading content.');
      }
    }
  };

  const fetchPrivacyPolicy = async () => {
    try {
      const response = await fetch(`/privacy-policy-${language}.md`);
      const text = await response.text();
      setPrivacyContent(text);
    } catch (error) {
      console.error('Error fetching privacy policy:', error);
      // Fallback to English if the language-specific file doesn't exist
      try {
        const response = await fetch('/privacy-policy-en.md');
        const text = await response.text();
        setPrivacyContent(text);
      } catch {
        setPrivacyContent('# Privacy Policy\n\nError loading content.');
      }
    }
  };

  // Refetch content when language changes
  useEffect(() => {
    if (showTermsSheet) {
      fetchTermsOfService();
    }
    if (showPrivacySheet) {
      fetchPrivacyPolicy();
    }
  }, [language]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      
          <form onSubmit={handleSignUp}>
            <FieldGroup>
              
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
                  <Field>
                    <FieldLabel htmlFor="username">{t('auth.username')}</FieldLabel>
                    <Input
                      id="username"
                      type="text"
                      placeholder={t('auth.usernamePlaceholder')}
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Field>

                <Field className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">{t('auth.password')}</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      placeholder={t('auth.passwordPlaceholder')}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      {t('auth.confirmPassword')}
                    </FieldLabel>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder={t('auth.passwordPlaceholder')}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Field>
                </Field>

              <label className="flex items-center space-x-2 text-xs">
                <input
                  type="checkbox"
                  checked={hasConsented}
                  onChange={(e) => setHasConsented(e.target.checked)}
                  className="cursor-pointer"
                  required
                />
                <span className="text-muted-foreground cursor-pointer">
                  {t('auth.ihaveRead')} &nbsp;
                  <button
                    type="button"
                    className="underline cursor-pointer hover:text-foreground transition-colors"
                    onClick={async () => {
                      await fetchTermsOfService();
                      setShowTermsSheet(true);
                    }}
                  >
                    {t('auth.termsOfService')}
                  </button>
                  &nbsp;{t('auth.and')}&nbsp;
                  <button
                    type="button"
                    className="underline cursor-pointer hover:text-foreground transition-colors"
                    onClick={async () => {
                      await fetchPrivacyPolicy();
                      setShowPrivacySheet(true);
                    }}
                  >
                    {t('auth.privacyPolicy')}
                  </button>
                </span>
              </label>

              <Field>
                <Button type="submit" className="flex items-center justify-center" disabled={isLoading}>
                  {isLoading ? t('auth.creatingAccount') : t('auth.createAccount')}
                </Button>
              </Field>
              {error && (
                <div className="text-sm text-red-500 text-center">
                  {error}
                </div>
              )}

            </FieldGroup>
          </form>
     
     {/* Terms of Service drawer */}
          <Drawer open={showTermsSheet} onOpenChange={setShowTermsSheet}>
             <DrawerContent className="h-[80vh] w-full max-w-3xl mx-auto px-6">
               <DrawerHeader>
                 <DrawerTitle className="font-bold text-2xl">{t('general.terms')}</DrawerTitle>
               </DrawerHeader>
               <div className="p-4 max-w-none leading-relaxed space-y-4 h-[calc(80vh-80px)] overflow-y-auto">
                 <ReactMarkdown>{termsContent}</ReactMarkdown>
               </div>
             </DrawerContent>
           </Drawer>

           {/* Privacy Policy Drawer */}
           <Drawer open={showPrivacySheet} onOpenChange={setShowPrivacySheet}>
             <DrawerContent className="h-[80vh] w-full max-w-3xl mx-auto px-6">
               <DrawerHeader>
                 <DrawerTitle className="font-bold text-2xl">{t('general.privacy')}</DrawerTitle>
               </DrawerHeader>
               <div className="p-4 max-w-none leading-relaxed space-y-4 h-[calc(80vh-80px)] overflow-y-auto">
                 <ReactMarkdown>{privacyContent}</ReactMarkdown>
               </div>
             </DrawerContent>
           </Drawer>
    </div>
  )
}