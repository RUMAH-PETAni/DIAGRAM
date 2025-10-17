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
import { PolicyDrawer } from "@/components/policy-drawer";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { t } = useI18n();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError(t("passwordsDoNotMatch"));
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
          data: {
            display_name: username,
          },
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
          <CardTitle className="text-2xl">{t("signUp")}</CardTitle>
          <CardDescription>{t("createAccount")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-6">

              {/* 🧑 Username */}
              <div className="grid gap-2">
                <Label htmlFor="username">{t("userName")}</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder={t("enterYourUserName")}
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

          

              {/* 📧 Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("enterYourEmail")}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* 🔑 Password */}
              <div className="grid gap-2">
                <Label htmlFor="password">{t("password")}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* 🔁 Repeat password */}
              <div className="grid gap-2">
                <Label htmlFor="repeat-password">{t("repeatPassword")}</Label>
                <Input
                  id="repeat-password"
                  type="password"
                  placeholder="********"
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t("creatingAccount") : t("signUp")}
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
              {t("alreadyHaveAccount")}{" "}
              <Link href="/auth/login" className="underline underline-offset-4">
                {t("login")}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-center text-xs text-muted-foreground mt-2">
        {t('byClickingContinueYouAgreeToOur')}<br/>{' '}
        <PolicyDrawer policyType="terms">
          <button className="underline underline-offset-4 hover:text-foreground">
            {t('termsOfService')}
          </button>
        </PolicyDrawer>{' '}
        {t('and')}{' '}
        <PolicyDrawer policyType="privacy">
          <button className="underline underline-offset-4 hover:text-foreground">
            {t('privacyPolicy')}
          </button>
        </PolicyDrawer>
        .
      </div>
    </div>
  );
}
