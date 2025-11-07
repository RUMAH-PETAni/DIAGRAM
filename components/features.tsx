"use client"

import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/retroui/ButtonCustom"
import { Badge } from "@/components/retroui/BadgeCustom"
import { Card, CardContent } from "@/components/retroui/CardCustom"
import { Text } from "@/components/retroui/Text";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react"
import { MonitorCog, Trees, ThermometerSun, Network, Cpu, Factory, Brain, NotebookText, MonitorSmartphone, Truck, Bot, Users, Sprout, LandPlot, Wrench, ShieldPlus, MessageSquareText, MessagesSquare, Zap, Calculator, MapPinned, BrainCircuit } from "lucide-react";

import Link from "next/link"
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/retroui/Tooltip"
import { Dialog } from "@/components/retroui/DialogCustom"


export function Features({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const router = useRouter();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [extrasModalOpen, setExtrasModalOpen] = useState(false);
  
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
      router.push("/features/dashboard");
    }
    // If not authenticated, do nothing - tooltip will show the message
  };

    const handleFeature2 = (e: React.FormEvent) => {
    e.preventDefault();
    // Only navigate to explore page if user is authenticated
    if (isAuthenticated) {
      router.push("/features");
    }
    // If not authenticated, do nothing - tooltip will show the message
  };

  
    const handleLandMapping = (e: React.FormEvent) => {
    e.preventDefault();
    // Only navigate to explore page if user is authenticated
    if (isAuthenticated) {
      router.push("/features/tools/land-mapping");
    }
    // If not authenticated, do nothing - tooltip will show the message
  };

  const handleExtrasClick = () => {
    setExtrasModalOpen(true);
  };

  return (
    <div className={cn("flex flex-col", className)} {...props}>
      {/* Existing features cards section */}
      <h3 className="font-bold text-lg ml-4 my-2">Features:</h3> 
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-full">
        <Card className="p-4 ">
          <div className="flex bg-primary/50 items-center gap-3 mb-2" >
          
            <Image 
              src="/feature1.svg" 
              alt="Feature 1 Icon" 
              width={64}
              height={64}
              className={`w-16 h-16 text-primary ${mounted && theme === 'dark' ? 'invert' : ''}`}
            />
            <h3 className="font-bold text-lg">Data Management</h3>
          </div>
          <Separator className="my-3" />
          <p className="text-xs  text-muted-foreground grow">
            Manage farmer and land information in one integrated system. Everything is securely stored and easily accessible to support smarter agricultural decisions.
          </p>
          <div className="mt-auto pt-4">
           <section className="flex w-full justify-end">
          <Button 
            type="button" 
            className="flex items-center justify-center"
            onClick={handleFeature1} 
            disabled={isLoading}
            >
            {isLoading ? "Opening..." : "Open"}
          </Button>
          </section>  
          </div>
        </Card>
        <Card className="p-4 ">
          <div className="flex bg-primary/50 items-center gap-3 mb-2">
            <Image 
              src="/feature2.svg" 
              alt="Feature 2 Icon" 
              width={64}
              height={64}
              className={`w-16 h-16 text-primary ${mounted && theme === 'dark' ? 'invert' : ''}`}
            />
            <h3 className="font-bold text-lg">Interactive Map</h3>
          </div>
          <Separator className="my-3" />
          <p className="text-xs text-muted-foreground grow">
          Monitor field conditions in real time with interactive maps. Visualize land monitoring data and field activities through a clear and intuitive interface.
          </p>
          <div className="mt-auto pt-4"> 
            <section className="flex w-full justify-end">
          <Button 
            type="button" 
            className="flex items-center justify-center"
            onClick={handleFeature2} 
            disabled={isLoading}
            >
            {isLoading ? "Opening..." : "Open"}
          </Button>
          </section>
          </div>
        </Card>
        <Card className="p-4 relative">
          <Badge variant="solid" size="sm" className="absolute top-2 right-2">Coming soon</Badge>
          <div className="flex bg-primary/50 items-center gap-3 mb-2">
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
          <p className="text-xs text-muted-foreground grow">
           Connect farmers, buyers, and service providers in a sustainable agricultural ecosystem. Find trusted partners and build a fair and transparent value chain.
          </p>
            <div className="mt-auto pt-4 text-muted"> 
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild> 
                    <section className="flex w-full justify-end">
                    <Button 
                      variant="outline"
                      type="button" 
                      className="flex items-center justify-center"
                      disabled={isLoading}
                      >
                      {isLoading ? "Opening..." : "Open"}                      
                    </Button>
                    </section>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Feature not avalaible yet</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
        </Card>
      </div>
      {/* Existing tools cards section */}
      <div className="grid grid-cols-1 gap-8 w-full max-w-full my-6">    
        <div className="w-full">
          <h3 className="font-bold text-lg ml-4 my-2">Tools:</h3> 
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border p-4 bg-background flex flex-col items-center justify-center">
              <MapPinned className="w-8 h-8 mb-2" />
              <Button
                variant="secondary"
                type="button" 
                disabled={isLoading}
                size="sm"
                className="w-full flex text-xs items-center justify-center"
                onClick={handleLandMapping}
                >
                {isLoading ? "Opening..." : "Land Mapping"}
              </Button>
            </Card>
            <Card className="border p-4 bg-background flex flex-col items-center justify-center">
              <Sprout className="w-8 h-8 mb-2" />
              <Button
                variant="secondary"
                type="button" 
                disabled={isLoading}
                size="sm"
                className="w-full flex text-xs items-center justify-center"
                >
                {isLoading ? "Opening..." : "Farm Monitoring"}
              </Button>
            </Card>
            <Card className="border p-4 bg-background flex flex-col items-center justify-center">
              <NotebookText className="w-8 h-8 mb-2" />
              <Button
                variant="secondary"
                type="button" 
                disabled={isLoading}
                size="sm"
                className="w-full flex text-xs items-center justify-center"
                >
                {isLoading ? "Opening..." : "Log Activity"}
               </Button>
            </Card>
            <Card className="border p-4 bg-background flex flex-col items-center justify-center">
              <ShieldPlus className="w-8 h-8 mb-2" />
              <Button
                variant="secondary"
                type="button" 
                disabled={isLoading}
                size="sm"
                className="w-full flex text-xs items-center justify-center"
                onClick={handleExtrasClick}
                >
                {isLoading ? "Opening..." : "Extra Tools"}
              </Button>
            </Card>
          </div>
        </div>
      </div>  
      
      {/* Extras Modal */}
      <Dialog open={extrasModalOpen} onOpenChange={setExtrasModalOpen}>
        <Dialog.Content size={"md"}>
          <Dialog.Header>
            <Text as="h5">Extra Tools</Text>
          </Dialog.Header>

          <div className="grid grid-cols-2 gap-4 p-4">
             {/* AI Insight Card */}
            <Card className="border p-4 bg-background flex flex-col items-center justify-center">
              <BrainCircuit className="w-8 h-8 mb-2" />
              <Button
                variant="secondary"
                type="button" 
                disabled={isLoading}
                size="sm"
                className="w-full flex text-xs items-center justify-center"
                onClick={() => {
                  // TODO: Implement AI Insight functionality
                  setExtrasModalOpen(false);
                }}
              >
                {isLoading ? "Opening..." : "AI Insight"}
              </Button>
            </Card>

            {/* Discussion Card */}
            <Card className="border p-4 bg-background flex flex-col items-center justify-center">
              <MessagesSquare className="w-8 h-8 mb-2" />
              <Button
                variant="secondary"
                type="button" 
                disabled={isLoading}
                size="sm"
                className="w-full flex text-xs items-center justify-center"
                onClick={() => {
                  // Navigate to the discuss page
                  router.push("/features/tools/realtime-chat");
                  setExtrasModalOpen(false);
                }}
              >
                {isLoading ? "Opening..." : "Chat Forum"}
              </Button>
            </Card>
            
            
            {/* Carbon Tools Card */}
            <Card className="border p-4 bg-background flex flex-col items-center justify-center">
              <Calculator className="w-8 h-8 mb-2" />
              <Button
                variant="secondary"
                type="button" 
                disabled={isLoading}
                size="sm"
                className="w-full flex text-xs items-center justify-center"
                onClick={() => {
                  // TODO: Implement Carbon tools functionality
                  setExtrasModalOpen(false);
                }}
              >
                {isLoading ? "Opening..." : "Carbon Calc"}
              </Button>
            </Card>
            {/* WHISP Tools Card */}
            <Card className="border p-4 bg-background flex flex-col items-center justify-center">
              <Trees className="w-8 h-8 mb-2" />
              <Button
                variant="secondary"
                type="button" 
                disabled={isLoading}
                size="sm"
                className="w-full flex text-xs items-center justify-center"
                onClick={() => {
                  // TODO: Implement WHISP tools functionality
                  setExtrasModalOpen(false);
                }}
              >
                {isLoading ? "Opening..." : "WHISP Tools"}
              </Button>
            </Card>
          </div>
        </Dialog.Content>
      </Dialog>
    </div> 
  )
}