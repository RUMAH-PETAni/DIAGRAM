"use client"

import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/signup/field"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import ReactMarkdown from 'react-markdown'

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showTermsSheet, setShowTermsSheet] = useState(false);
  const [showPrivacySheet, setShowPrivacySheet] = useState(false);
  const [termsContent, setTermsContent] = useState("");
  const [privacyContent, setPrivacyContent] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
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
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTermsOfService = async () => {
    try {
      const response = await fetch('/terms-of-service-en.md');
      const text = await response.text();
      setTermsContent(text);
    } catch (error) {
      console.error('Error fetching terms of service:', error);
      setTermsContent('# Terms of Service\n\nError loading content.');
    }
  };

  const fetchPrivacyPolicy = async () => {
    try {
      const response = await fetch('/privacy-policy-en.md');
      const text = await response.text();
      setPrivacyContent(text);
    } catch (error) {
      console.error('Error fetching privacy policy:', error);
      setPrivacyContent('# Privacy Policy\n\nError loading content.');
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSignUp}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Enter your email below to create your account
                </p>
              </div>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
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
                    <FieldLabel htmlFor="username">Username</FieldLabel>
                    <Input
                      id="username"
                      type="text"
                      
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Field>
                </Field>
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
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
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input 
                      id="confirm-password" 
                      type="password" 
                      placeholder="********"
                      required 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Field>
                </Field>
              </Field>
              <Field>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </Field>
              {error && (
                <div className="text-sm text-red-500 text-center">
                  {error}
                </div>
              )}
              <FieldDescription className="text-center">
                Already have an account?{" "}
                <Link href="/auth/login" className="underline hover:text-blue-600 transition-colors">
                  Sign in
                </Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block overflow-hidden cursor-pointer">
            <div className="absolute inset-0 transition-opacity duration-500 hover:opacity-0">
              <img
                src="/blossom.png"
                alt="Image"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 hover:opacity-100">
              <img
                src="/blossom1.png"
                alt="Hover Image"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
              By clicking continue, you agree to our{" "}
              <button
                type="button"
                className="underline cursor-pointer hover:text-foreground transition-colors"
                onClick={async () => {
                  await fetchTermsOfService();
                  setShowTermsSheet(true);
                }}
              >
                Terms of Service
              </button>{" "}
              and{" "}
              <button
                type="button"
                className="underline cursor-pointer hover:text-foreground transition-colors"
                onClick={async () => {
                  await fetchPrivacyPolicy();
                  setShowPrivacySheet(true);
                }}
              >
                Privacy Policy
              </button>.
            </FieldDescription>
            <Sheet open={showTermsSheet} onOpenChange={setShowTermsSheet}>
                  <SheetContent className="w-[90vw] max-w-2xl overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle className="text-center text-base">Terms of Service</SheetTitle>
                    </SheetHeader>
                    <div className="p-6 prose prose-sm max-w-none text-xs leading-relaxed space-y-4">
                      <ReactMarkdown>{termsContent}</ReactMarkdown>
                    </div>
                  </SheetContent>
                </Sheet>
                
                <Sheet open={showPrivacySheet} onOpenChange={setShowPrivacySheet}>
                  <SheetContent className="w-[90vw] max-w-2xl overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle className="text-center text-base">Privacy Policy</SheetTitle>
                    </SheetHeader>
                    <div className="p-6 prose prose-sm max-w-none text-xs leading-relaxed space-y-4">
                      <ReactMarkdown>{privacyContent}</ReactMarkdown>
                    </div>
                  </SheetContent>
                </Sheet>
    </div>
  )
}
