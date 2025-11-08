"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/retroui/ButtonCustom";
import {
  Card,
  CardContent,
} from "@/components/retroui/CardCustom";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/retroui/InputCustom";
import { Label } from "@/components/retroui/Label";
import Link from "next/link"
import { Text } from "@/components/retroui/Text"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n/context";

export function UpdatePasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { t } = useLanguage();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push("/auth/login");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent>
          <form className="p-6 md:p-8 " onSubmit={handleForgotPassword}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">{t('auth.updatePasswordTitle')}</h1>
                 <p className="text-muted-foreground">
                  {t('auth.updatePasswordDescription')}
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="password">{t('auth.newPassword')}</FieldLabel>
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
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <Button type="submit" className="flex items-center justify-center" disabled={isLoading}>
                    {isLoading ? t('auth.saving') : t('auth.saveNewPassword')}
                  </Button>
              </Field>
              <FieldDescription className="text-left">
                  {t('auth.alreadyHaveAccount')}{" "}
                  <Link href="/auth/login" className="font-bold cursor-pointer">
                    {t('auth.signIn')}
                  </Link>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
