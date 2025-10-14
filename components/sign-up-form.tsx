"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Modal } from "@/components/modal";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { t } = useI18n();

  // State for modals
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [policyContent, setPolicyContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  // Load policy content when needed
  useEffect(() => {
    const loadPolicyContent = async (fileName: string) => {
      try {
        // Since we're in a client component, we need to fetch from the public directory
        const response = await fetch(`/${fileName}`);
        console.log(`Fetching ${fileName}, status: ${response.status}`);
        if (!response.ok) {
          throw new Error(`Failed to load ${fileName} with status ${response.status}`);
        }
        const content = await response.text();
        console.log(`Content length for ${fileName}: ${content.length}`);
        setPolicyContent(content);
      } catch (err) {
        console.error(`Error loading ${fileName}:`, err);
        setPolicyContent(`Error loading ${fileName}: ${err instanceof Error ? err.message : String(err)}`);
      }
    };

    if (showPrivacyModal) {
      setModalTitle(t('privacyPolicy'));
      loadPolicyContent("privacy-policy.md");
    } else if (showTermsModal) {
      setModalTitle(t('termCondition'));
      loadPolicyContent("terms-and-condition.md");
    }
  }, [showPrivacyModal, showTermsModal]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError(t('passwordsDoNotMatch'));
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      });
      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t('signUp')}</CardTitle>
          <CardDescription>{t('createAccount')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('enterYourEmail')}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">{t('password')}</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="repeat-password">{t('repeatPassword')}</Label>
                </div>
                <Input
                  id="repeat-password"
                  type="password"
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t('creatingAccount') : t('signUp')}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              {t('alreadyHaveAccount')}{" "}
              <Link href="/auth/login" className="underline underline-offset-4">
                {t('login')}
              </Link>
            </div>
            <div className="mt-4 text-center text-sm flex justify-center gap-4">
              <button 
                type="button" 
                className="text-xs text-muted-foreground cursor-pointer"
                onClick={() => {
                  setShowPrivacyModal(true);
                  setShowTermsModal(false);
                }}
              >
                {t('privacyPolicy')}
              </button>
              <span className="text-muted-foreground">|</span>
              <button 
                type="button" 
                className="text-xs text-muted-foreground cursor-pointer"
                onClick={() => {
                  setShowTermsModal(true);
                  setShowPrivacyModal(false);
                }}
              >
                {t('termCondition')}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Privacy Policy Modal */}
      <Modal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
        title={modalTitle}
        content={policyContent}
      />

      {/* Terms and Condition Modal */}
      <Modal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        title={modalTitle}
        content={policyContent}
      />
    </div>
  );
}