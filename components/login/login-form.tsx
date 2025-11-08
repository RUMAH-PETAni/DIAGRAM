"use client"

import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/retroui/ButtonCustom"
import { Card, CardContent } from "@/components/retroui/CardCustom"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import { Input } from "@/components/retroui/InputCustom"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Dialog } from "@/components/retroui/DialogCustom"
import { Text } from "@/components/retroui/Text"
import { ForgotPasswordForm } from "@/components/login/forgot-password-form"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const router = useRouter();

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
      // Redirect to the homepage or protected route after successful login
      router.push("/");
      router.refresh();
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
          <form className="p-6 md:p-8 " onSubmit={handleLogin}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <button
                    type="button"
                    className="ml-auto text-sm underline-offset-2 hover:underline cursor-pointer"
                    onClick={() => setShowForgotPasswordModal(true)}
                  >
                    Forgot your password?
                  </button>
                </div>
                <Input 
                  id="password" 
                  type="password"
                  placeholder="********" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>
              <Field>
                <Button type="submit" className="flex items-center justify-center" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </Field>
              {error && (
                <div className="text-sm text-red-500 text-center">
                  {error}
                </div>
              )}
        
                <FieldDescription className="text-left">
                  Don&apos;t have an account?{" "}
                  <Link href="/auth/sign-up" className="font-bold cursor-pointer">
                    Sign up
                  </Link>
                </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      
      {/* Forgot Password Modal */}
      <Dialog open={showForgotPasswordModal} onOpenChange={setShowForgotPasswordModal}>
        <Dialog.Content size={"md"}>
          <Dialog.Header>
            <Text as="h5">Forgot you password?</Text>
          </Dialog.Header>
          <ForgotPasswordForm onClose={() => setShowForgotPasswordModal(false)} />
        </Dialog.Content>
      </Dialog>
    </div>
  )
}
