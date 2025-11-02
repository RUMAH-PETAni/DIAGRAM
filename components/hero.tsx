"use client"

import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TypeAnimation } from 'react-type-animation';
import { useTheme } from "next-themes";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import ReactMarkdown from 'react-markdown'

export function Hero({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showTermsSheet, setShowTermsSheet] = useState(false);
  const [showPrivacySheet, setShowPrivacySheet] = useState(false);
  const [showExploreModal, setShowExploreModal] = useState(false);
  const [termsContent, setTermsContent] = useState("");
  const [privacyContent, setPrivacyContent] = useState("");
  const { theme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    // Show the dialog when the component mounts (page loads)
    const hasSeen = localStorage.getItem("hasSeenWelcome")
    if (!hasSeen) {
      setShowWelcomeDialog(true)
      localStorage.setItem("hasSeenWelcome", "true")
    }
    
    // Check authentication status
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    
    checkAuth();
  }, []);

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

  const handleExplore = (e: React.FormEvent) => {
    e.preventDefault();
    // Only show the explore modal if user is authenticated
    if (isAuthenticated) {
      setShowExploreModal(true);
    }
    // If not authenticated, do nothing - tooltip will show the message
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8 " onSubmit={handleLogin}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">DIAGRAM</h1>
                <p className="text-sm text-muted-foreground text-balance">
                  A Digital Ecosystem for Agroforestry Management
                </p>
              </div>
              <CardContent className="p-0">
                    <p className="text-balance">
                    Empowering Smallholder Farmers with:
                    </p>
                    <Field className="mt-2">
                      <div className="w-full flex items-center border border-input rounded-md px-3 py-2 bg-background text-foreground font-normal">
                        <TypeAnimation
                          sequence={[
                            'Climate Smart Agriculture.',
                            2000, // Wait 2s after this string
                            'Data-Driven Solutions.',
                            2000, // Wait 2s after this string
                            'Sustainable Technology.',
                            2000, // Wait 2s after this string
                            'Precision Agroforestry.',
                            2000, // Wait 2s after this string
                          ]}
                          wrapper="span"
                          speed={40} // Speed of typing: 1 = slowest, 99 = fastest
                          style={{ 
                            display: 'inline-block', 
                            color: 'inherit',
                            width: '100%'
                          }}
                          repeat={Infinity}
                        />
                      </div>
                    </Field>
                  </CardContent>
              <FieldDescription className="text-left italic">
                "DIAGRAM is a sustainable digital platform designed to transform conventional farming into a connected, data-driven future."
              </FieldDescription>
              <Field>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        type="button" 
                        onClick={handleExplore} 
                        disabled={isLoading}
                      >
                        {isLoading ? "Exploring..." : "Explore"}
                      </Button>
                    </TooltipTrigger>
                    {!isAuthenticated && (
                      <TooltipContent>
                        <p>You must login first</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </Field>
              {error && (
                <div className="text-sm text-red-500 text-center">
                  {error}
                </div>
              )}
              <FieldDescription className="text-right">
                <Link href="/about" className="text-primary hover:underline cursor-pointer">
                  About
                </Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block overflow-hidden cursor-pointer">
            <div className="absolute inset-0 transition-opacity duration-500 hover:opacity-0">
              <img
                src="/fly.png"
                alt="Image"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 hover:opacity-100">
              <img
                src="/fly1.png"
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
    <AlertDialog open={showWelcomeDialog} onOpenChange={setShowWelcomeDialog}>
      <AlertDialogContent>
        <AlertDialogHeader className="text-center">
          <AlertDialogTitle className="text-center text-xl font-bold">RUMAHPETAni.cloud</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Sustainable Digital Platform
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-center">
          <Button onClick={() => setShowWelcomeDialog(false)}>Continue</Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
    
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
    
    {/* Explore Modal */}
    <Dialog open={showExploreModal} onOpenChange={setShowExploreModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Explore</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 gap-4 mt-4">
          {/* Features & Tools Button */}
          <button
            className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent transition-colors"
            onClick={() => {
              router.push("/features");
              setShowExploreModal(false);
            }}
          >
            <div className=" w-16 flex items-center justify-center">
              <img 
                src="/features.svg" 
                alt="Features" 
                className={`w-16 ${theme === 'dark' ? 'invert' : ''}`}
              />
            </div>
            <div className="text-left">
              <div className="font-medium">Features and Tools</div>
              <div className="text-sm text-muted-foreground">Smart tools to map, monitor, and manage your farm efficiently.</div>
            </div>
          </button>
          
          {/* On Demand Services Button */}
          <button
            className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent transition-colors"
            onClick={() => {
              router.push("/services");
              setShowExploreModal(false);
            }}
          >
            <div className=" w-16 flex items-center justify-center">
              <img 
                src="/services.svg" 
                alt="Services" 
                className={`w-16 ${theme === 'dark' ? 'invert' : ''}`}
              />
            </div>
             <div className="text-left">
              <div className="font-medium">On Demand Services</div>
              <div className="text-sm text-muted-foreground">Instant access to expert support and digital farming solutions.</div>
            </div>
          </button>

          {/* Data Library Button */}
          <button
            className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent transition-colors"
            onClick={() => {
              router.push("/library");
              setShowExploreModal(false);
            }}
          >
            <div className=" w-16 flex items-center justify-center">
              <img 
                src="/datalib.svg" 
                alt="Datalib" 
                className={`w-16 ${theme === 'dark' ? 'invert' : ''}`}
              />
            </div>
             <div className="text-left">
              <div className="font-medium">Data Library</div>
              <div className="text-sm text-muted-foreground">Reliable agricultural data and insights at your fingertips.</div>
            </div>
          </button>
        </div>
      </DialogContent>
    </Dialog>
    
    </div>
  )
}