"use client"

import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/retroui/ButtonCustom"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/signup/field"

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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import ReactMarkdown from 'react-markdown';

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
  const [hasConsented, setHasConsented] = useState(false);

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

    if (!hasConsented) {
      setError("You must agree to the Terms of Service and Privacy Policy to create an account.");
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
      
      // Show success toast instead of modal
      toast.success("Registration Successful!", {
        description: `Please check your email to verify your account. Confirmation email has been sent to: ${email}`,
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
        <CardContent>
          <form className="p-6 md:p-8" onSubmit={handleSignUp}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
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
                    <FieldLabel htmlFor="username">Username</FieldLabel>
                    <Input
                      id="username"
                      type="text"
                      placeholder="username" 
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Field>
            
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
              
              <label className="flex items-center space-x-2 text-xs">
                <input 
                  type="checkbox" 
                  checked={hasConsented}
                  onChange={(e) => setHasConsented(e.target.checked)}
                  className="cursor-pointer"
                  required
                />
                <span className="text-muted-foreground cursor-pointer">
                  I have read and agree to the&nbsp;
                  <button
                    type="button"
                    className="underline cursor-pointer hover:text-foreground transition-colors"
                    onClick={async () => {
                      await fetchTermsOfService();
                      setShowTermsSheet(true);
                    }}
                  >
                    Terms of Service
                  </button>
                  &nbsp;and&nbsp; 
                  <button
                    type="button"
                    className="underline cursor-pointer hover:text-foreground transition-colors"
                    onClick={async () => {
                      await fetchPrivacyPolicy();
                      setShowPrivacySheet(true);
                    }}
                  >
                    Privacy Policy
                  </button>
                </span>
              </label>
              
              <Field>
                <Button type="submit" className="flex items-center justify-center" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </Field>
              {error && (
                <div className="text-sm text-red-500 text-center">
                  {error}
                </div>
              )}
              <div className="flex flex-col sm:flex-row justify-between items-center w-full text-sm gap-1">
              <FieldDescription className="text-left">
                Already have an account?{" "}
                <Link href="/auth/login">
                  Sign in
                </Link>
              </FieldDescription>
              <FieldDescription className="text-right">
                <Link href="/" className="text-primary font-bold cursor-pointer">
                  Home
                </Link>
              </FieldDescription>
              </div>
            </FieldGroup>
          </form>
          
        </CardContent>
      </Card>
       {/* Terms of Service Sheet */}
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
            
            {/* Privacy Policy Sheet */}
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
