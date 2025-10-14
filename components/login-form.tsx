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
import { useState } from "react";
import { useModal } from '@/components/modal-context';

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { t } = useI18n();

  const { openModal } = useModal();

  const loadAndOpenModal = async (fileName: string, title: string) => {
    try {
      // Since we're in a client component, we need to fetch from the public directory
      const response = await fetch(`/${fileName}`);
      console.log(`Fetching ${fileName}, status: ${response.status}`);
      if (!response.ok) {
        throw new Error(`Failed to load ${fileName} with status ${response.status}`);
      }
      const content = await response.text();
      console.log(`Content length for ${fileName}: ${content.length}`);
      openModal(title, content);
    } catch (err) {
      console.error(`Error loading ${fileName}:`, err);
      openModal(title, `Error loading ${fileName}: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push("/protected");
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
          <CardTitle className="text-2xl">{t('signIn')}</CardTitle>
          <CardDescription>
            {t('enterEmailBelowToLogin')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
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
                  <Link
                    href="/auth/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    {t('forgotPassword')}
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t('loggingIn') : t('login')}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              {t('dontHaveAccount')}{" "}
              <Link
                href="/auth/sign-up"
                className="underline underline-offset-4"
              >
                {t('signUp')}
              </Link>
            </div>
            <div className="mt-4 text-center text-sm flex justify-center gap-4">
              <button 
                type="button" 
                className="text-xs text-muted-foreground cursor-pointer"
                onClick={() => loadAndOpenModal("privacy-policy.md", t('privacyPolicy'))}
              >
                {t('privacyPolicy')}
              </button>
              <span className="text-muted-foreground">|</span>
              <button 
                type="button" 
                className=" text-xs text-muted-foreground cursor-pointer"
                onClick={() => loadAndOpenModal("terms-and-condition.md", t('termCondition'))}
              >
                {t('termCondition')}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>

    </div>
  );
}
