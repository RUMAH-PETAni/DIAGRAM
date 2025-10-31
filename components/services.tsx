"use client"

import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react"
import { MonitorCog, Trees, ThermometerSun, Network, Cpu, Factory, Brain, NotebookText, MonitorSmartphone, Truck, Bot, Users, Sprout, LandPlot, Wrench, ShieldPlus, MessageSquareText, MessagesSquare, Zap, Calculator, MapPinned } from "lucide-react";

import Link from "next/link"
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner";


export function Services({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const router = useRouter();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [extrasModalOpen, setExtrasModalOpen] = useState(false);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  
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

  // Services list for request modal
  const servicesList = [
    { title: "SWApeta (Social Forestry)" },
    { title: "Aerial Photo Mapping" },
    { title: "Tree Planting & Monitoring" },
    { title: "Land Carbon Accounting" },
    { title: "Risk Assessment (EUDR)" },
    { title: "Research and Development" },
  ];
  
  const toggleService = (index: number) => {
    setSelectedServices(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };
  
  const handleRequestRequest = () => {
    // TODO: Implement request submission
    console.log("Requested services:", selectedServices.map(i => servicesList[i].title));
    
    // Show success toast notification
    // NOTE: To make toast work, add the Toaster component to your root layout
    // Import Toaster from "@/components/ui/sonner" and add <Toaster /> to app/layout.tsx
    toast.success("Your request has been successfully sent, our team will contact you via email soon");
    
    setRequestModalOpen(false);
    setSelectedServices([]);
  };

  const handleExtrasClick = () => {
    setExtrasModalOpen(true);
  };

  return (
    <div className={cn("flex flex-col", className)} {...props}>
      {/* Existing features cards section */}
      <h3 className="font-bold text-lg ml-4 my-2">On Demand Services:</h3> 
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-full">
        <div className="bg-background border rounded-lg p-4 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-lg flex flex-col h-full">
          <div className="flex rounded-lg bg-primary/10 items-center gap-3 mb-2" >
            <Image 
              src="/services1.svg" 
              alt="service 1 Icon" 
              width={64}
              height={64}
              className={`w-16 h-16 text-primary ${mounted && theme === 'dark' ? 'invert' : ''}`}
            />
            <h3 className="font-bold text-lg">SWApeta <br/>&#40;Social Forestry&#41;</h3>
          </div>
          <Separator className="my-3" />
          <p className="text-xs  text-muted-foreground grow">
            Empowering community forest management through digital mapping and data-driven insights.
          </p>
        </div>
        <div className="bg-background border rounded-lg p-4 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-lg flex flex-col h-full">
          <div className="flex rounded-lg bg-primary/10 items-center gap-3 mb-2">
            <Image 
              src="/services2.svg" 
              alt="Services 2 Icon" 
              width={64}
              height={64}
              className={`w-16 h-16 text-primary ${mounted && theme === 'dark' ? 'invert' : ''}`}
            />
            <h3 className="font-bold text-lg">Aerial Photo Mapping</h3>
          </div>
          <Separator className="my-3" />
          <p className="text-xs text-muted-foreground grow">
        High-resolution aerial imagery for precise land mapping and environmental monitoring.
          </p>
        </div>
          <div className="bg-background border rounded-lg p-4 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-lg flex flex-col h-full">
          <div className="flex rounded-lg bg-primary/10 items-center gap-3 mb-2" >
            <Image 
              src="/services4.svg" 
              alt="service 4 Icon" 
              width={64}
              height={64}
              className={`w-16 h-16 text-primary ${mounted && theme === 'dark' ? 'invert' : ''}`}
            />
            <h3 className="font-bold text-lg">Tree Planting & Monitoring</h3>
          </div>
          <Separator className="my-3" />
          <p className="text-xs  text-muted-foreground grow">
            Plan, track, and verify tree planting activities with real-time digital monitoring tools.
          </p>
        </div>
        <div className="bg-background border rounded-lg p-4 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-lg relative flex flex-col h-full">
          <div className="flex rounded-lg bg-primary/10 items-center gap-3 mb-2">
            <Image 
              src="/services3.svg" 
              alt="services 3 Icon" 
              width={64}
              height={64}
              className={`w-16 h-16 text-primary ${mounted && theme === 'dark' ? 'invert' : ''}`}
            />
            <h3 className="font-bold text-lg">Land Carbon Accounting</h3>
          </div>
          <Separator className="my-3" />
          <p className="text-xs text-muted-foreground grow">
          Measure and analyze land-based carbon stocks to support climate action initiatives.
          </p>
        </div>
      
        <div className="bg-background border rounded-lg p-4 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-lg flex flex-col h-full">
          <div className="flex rounded-lg bg-primary/10 items-center gap-3 mb-2">
            <Image 
              src="/services5.svg" 
              alt="Services 5 Icon" 
              width={64}
              height={64}
              className={`w-16 h-16 text-primary ${mounted && theme === 'dark' ? 'invert' : ''}`}
            />
            <h3 className="font-bold text-lg">Risk Assesment <br/>&#40;EUDR&#41;</h3>
          </div>
          <Separator className="my-3" />
          <p className="text-xs text-muted-foreground grow">
          Evaluate and ensure supply chain compliance with sustainability and deforestation regulations.
          </p>
        </div>
        <div className="bg-background border rounded-lg p-4 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-lg relative flex flex-col h-full">
          <div className="flex rounded-lg bg-primary/10 items-center gap-3 mb-2">
            <Image 
              src="/services6.svg" 
              alt="services 6 Icon" 
              width={64}
              height={64}
              className={`w-16 h-16 text-primary ${mounted && theme === 'dark' ? 'invert' : ''}`}
            />
            <h3 className="font-bold text-lg">Research and Development</h3>
          </div>
          <Separator className="my-3" />
          <p className="text-xs text-muted-foreground grow">
           Advancing sustainable agriculture through data analysis, innovation, and field research.
          </p>
        </div>
      </div>
      
      <div className="mt-8 flex justify-center">
        <Button 
          variant="default" 
          size="lg"
          className="px-8 py-6 text-lg"
          onClick={() => {
            setRequestModalOpen(true);
          }}
        >
          Request Services
        </Button>
      </div>
      
      {/* Request Services Dialog */}
      <Dialog open={requestModalOpen} onOpenChange={setRequestModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Request Services</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-3 py-4">
            {servicesList.map((service, index) => (
              <div 
                key={index} 
                className="border rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer"
                onClick={() => toggleService(index)}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id={`service-${index}`}
                    className="h-4 w-4 rounded border-input cursor-pointer"
                    checked={selectedServices.includes(index)}
                    onChange={() => toggleService(index)}
                  />
                  <label 
                    htmlFor={`service-${index}`} 
                    className="flex-1 text-sm font-medium cursor-pointer">
                    {service.title}
                  </label>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setRequestModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleRequestRequest}
              disabled={selectedServices.length === 0}
            >
              Request
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div> 
  )
}