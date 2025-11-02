"use client"

import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "next-themes";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/login/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function About({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { theme } = useTheme();
  const router = useRouter();

  useEffect(() => {
   
    // Check authentication status
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    
    checkAuth();
  }, []);

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
      // Redirect to the landing page after successful login
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
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8 " onSubmit={handleLogin}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-full flex justify-center">
                  <img 
                    src="/logoRP.svg" 
                    alt="RUMAHPETAni Logo" 
                    className="w-36 h-auto"
                  />
                </div>
              </div>
              <FieldDescription className="text-sm text-foreground text-left">
                Did you know?
                In 1952, President Soekarno popularized the word PETANI as an acronym for "Penyangga Tatanan Negara Indonesia".
              </FieldDescription>
              <FieldDescription className="text-xs  text-left italic">
                Bung Karno wanted to emphasize that farming is not just a profession, but the foundation of the nation's life. From the hands of farmers comes the food that satisfies us and strengthens us to remain sovereign.
                This legacy of thought reminds us that food security is key to national independence. Therefore, respecting and supporting farmers means safeguarding Indonesia's future.
              </FieldDescription>
              <FieldDescription className="text-sm text-foreground text-left">
                Let's continue to support the struggle of our farmers, the true pillars of this country.
              </FieldDescription>
           
              <FieldDescription className="text-right">
                <Link href="/" className="text-primary hover:underline cursor-pointer">
                  Home
                </Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative overflow-hidden cursor-pointer">
            <div className="absolute inset-0 transition-opacity duration-500 hover:opacity-0">
              <img
                src="/farmer.png"
                alt="Image"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 hover:opacity-100">
              <img
                src="/farmer1.png"
                alt="Hover Image"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        All materials in the platform (source code, design, logo, and system data) belong to RUMAHPETAni.
      </FieldDescription> 
    </div>
  )
}