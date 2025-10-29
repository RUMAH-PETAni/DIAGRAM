"use client"

import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react"
import { MonitorCog, Trees, ThermometerSun, Network, Cpu, Factory, Brain, NotebookText, MonitorSmartphone, Truck, Bot, Users, Sprout, LandPlot } from "lucide-react";

import Link from "next/link"
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


export function Features({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const router = useRouter();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    
    checkAuth();
  }, []);
  
  // Mark as mounted to avoid hydration mismatches
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const handleFeature1 = (e: React.FormEvent) => {
    e.preventDefault();
    // Only navigate to explore page if user is authenticated
    if (isAuthenticated) {
      router.push("/dashboard");
    }
    // If not authenticated, do nothing - tooltip will show the message
  };

    const handleFeature2 = (e: React.FormEvent) => {
    e.preventDefault();
    // Only navigate to explore page if user is authenticated
    if (isAuthenticated) {
      router.push("/feature");
    }
    // If not authenticated, do nothing - tooltip will show the message
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Existing cards section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-full mt-6">
        <div className="bg-background border rounded-lg p-6 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-lg">
          <div className="flex rounded-lg bg-primary/10 items-center gap-3 mb-2" >
          
            <Image 
              src="/feature1.svg" 
              alt="Feature 1 Icon" 
              width={64}
              height={64}
              className={`w-16 h-16 text-primary ${mounted && theme === 'dark' ? 'invert' : ''}`}
            />
            <h3 className="font-bold text-lg">Farmer & Land Data Management</h3>
          </div>
          <Separator className="my-3" />
          <p className="text-sm md:text text-muted-foreground">
            Manage farmer and land information in one integrated system. Everything is securely stored and easily accessible to support smarter agricultural decisions.
          </p>
          <div className="mt-4 flex"> 
          <Button 
            type="button" 
            onClick={handleFeature1} 
            disabled={isLoading}
            >
            {isLoading ? "Opening..." : "Open"}
          </Button>
          </div>
        </div>
        <div className="bg-background border rounded-lg p-6 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-lg">
          <div className="flex rounded-lg bg-primary/10 items-center gap-3 mb-2">
            <Image 
              src="/feature2.svg" 
              alt="Feature 2 Icon" 
              width={64}
              height={64}
              className={`w-16 h-16 text-primary ${mounted && theme === 'dark' ? 'invert' : ''}`}
            />
            <h3 className="font-bold text-lg">Interactive Monitoring Map</h3>
          </div>
          <Separator className="my-3" />
          <p className="text-sm md:text text-muted-foreground">
          Monitor field conditions in real time with interactive maps. Visualize land monitoring data and field activities through a clear and intuitive interface.
          </p>
          <div className="mt-4 flex"> 
          <Button 
            type="button" 
            onClick={handleFeature2} 
            disabled={isLoading}
            >
            {isLoading ? "Opening..." : "Open"}
          </Button>
          </div>
        </div>
        <div className="bg-background border rounded-lg p-6 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-lg relative">
          <div className="absolute top-2 right-2 z-10">
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              Coming Soon
            </span>
          </div>
          <div className="flex rounded-lg bg-primary/10 items-center gap-3 mb-2">
            <Image 
              src="/feature3.svg" 
              alt="Feature 3 Icon" 
              width={64}
              height={64}
              className={`w-16 h-16 text-primary ${mounted && theme === 'dark' ? 'invert' : ''}`}
            />
            <h3 className="font-bold text-lg">Agroforestry Market</h3>
          </div>
          <Separator className="my-3" />
          <p className="text-sm md:text text-muted-foreground">
           Connect farmers, buyers, and service providers in a sustainable agricultural ecosystem. Find trusted partners and build a fair and transparent value chain.
          </p>
            <div className="mt-4 flex text-muted"> 
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild> 
                    <Button 
                      variant="outline"
                      type="button" 
                      >
                      Open
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Feature not avalaible yet</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 w-full max-w-full mb-6">    
        <div className="w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border rounded-lg p-4 bg-background transition-all duration-300 cursor-pointer flex flex-col items-center justify-center hover:-translate-y-1 hover:shadow-md">
              <LandPlot className="w-8 h-8 mb-2" />
              <Button
                variant="secondary"
                type="button" 
                disabled={isLoading}
                size="xs"
                className="w-full"
                >
                {isLoading ? "Opening..." : "Land Mapping"}
              </Button>
            </div>
            <div className="border rounded-lg p-4 bg-background transition-all duration-300 cursor-pointer flex flex-col items-center justify-center hover:-translate-y-1 hover:shadow-md">
              <Sprout className="w-8 h-8 mb-2" />
              <Button
                variant="secondary"
                type="button" 
                disabled={isLoading}
                size="xs"
                className="w-full"
                >
                {isLoading ? "Opening..." : "Farm Monitoring"}
              </Button>
            </div>
            <div className="border rounded-lg p-4 bg-background transition-all duration-300 cursor-pointer flex flex-col items-center justify-center hover:-translate-y-1 hover:shadow-md">
              <NotebookText className="w-8 h-8 mb-2" />
              <Button
                variant="secondary"
                type="button" 
                disabled={isLoading}
                size="xs"
                className="w-full"
                >
                {isLoading ? "Opening..." : "Log Activity"}
               </Button>
            </div>
            <div className="border rounded-lg p-4 bg-background transition-all duration-300 cursor-pointer flex flex-col items-center justify-center hover:-translate-y-1 hover:shadow-md">
              <Brain className="w-8 h-8 mb-2" />
              <Button
                variant="secondary"
                type="button" 
                disabled={isLoading}
                size="xs"
                className="w-full"
                >
                {isLoading ? "Opening..." : "AI Recommendation"}
              </Button>
            </div>
          </div>
        </div>
      </div>  
    </div> 
  )
}