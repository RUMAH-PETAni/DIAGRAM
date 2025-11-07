"use client"

import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/retroui/ButtonCustom"
import { Card, CardContent } from "@/components/retroui/CardCustom"
import { Text } from "@/components/retroui/Text";
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
import { Dialog } from "@/components/retroui/DialogCustom"
import { toast } from "sonner";
import { createServiceRequest } from "@/lib/services/requests";
import { Input } from "./retroui/InputCustom"
import { Label } from "./retroui/Label"


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
  
    // Services list for request modal
  const servicesList = [
    { title: "SWApeta | Social Forestry)" },
    { title: "Aerial Survey & Mapping" },
    { title: "Planting & Monitoring" },
    { title: "Land Carbon Accounting" },
    { title: "Research & Development" },
  ];
  
  const toggleService = (index: number) => {
    setSelectedServices(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };
  
  const handleRequestRequest = async () => {
    try {
      // Get selected service titles
      const selectedServiceTitles = selectedServices.map(i => servicesList[i].title);
      
      // Submit the request to the database
      const result = await createServiceRequest({
        serviceTitles: selectedServiceTitles,
        additionalNotes: "" // You can add an input for additional notes if needed
      });
      
      if (result.success) {
        // Show success toast notification
        // NOTE: To make toast work, add the Toaster component to your root layout
        // Import Toaster from "@/components/ui/sonner" and add <Toaster /> to app/layout.tsx
        toast.success("Your request has been successfully sent, our team will contact you via email soon");
      } else {
        toast.error("Failed to submit request. Please try again.");
        console.error("Error submitting service request:", result.error);
      }
    } catch (error) {
      toast.error("An error occurred while submitting your request. Please try again.");
      console.error("Error submitting service request:", error);
    } finally {
      // Close modal and reset selections regardless of success/failure
      setRequestModalOpen(false);
      setSelectedServices([]);
    }
  };

  return (
    <div className={cn("flex flex-col", className)} {...props}>
      {/* Existing features cards section */}
      <h3 className="font-bold text-lg ml-4 my-2">On Demand Services:</h3> 
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-full">
        <Card className="p-4">
          <div className="flex rounded-lg bg-primary/50 items-center gap-3 mb-2" >
            <Image 
              src="/services1.svg" 
              alt="service 1 Icon" 
              width={64}
              height={64}
              className={`w-16 h-16 text-primary ${mounted && theme === 'dark' ? 'invert' : ''}`}
            />
            <h3 className="font-bold text-lg">SWApeta | Social Forestry</h3>
          </div>
          <Separator className="my-3" />
          <p className="text-xs  text-muted-foreground grow">
            Empowering community forest management through digital mapping and data-driven insights.
          </p>
        </Card>
        <Card className="p-4">
          <div className="flex rounded-lg bg-primary/50 items-center gap-3 mb-2">
            <Image 
              src="/services2.svg" 
              alt="Services 2 Icon" 
              width={64}
              height={64}
              className={`w-16 h-16 text-primary ${mounted && theme === 'dark' ? 'invert' : ''}`}
            />
            <h3 className="font-bold text-lg">Aerial Survey & Mapping</h3>
          </div>
          <Separator className="my-3" />
          <p className="text-xs text-muted-foreground grow">
        High-resolution aerial imagery for precise land mapping and environmental monitoring.
          </p>
        </Card>
          <Card className="p-4">
          <div className="flex rounded-lg bg-primary/50 items-center gap-3 mb-2" >
            <Image 
              src="/services4.svg" 
              alt="service 4 Icon" 
              width={64}
              height={64}
              className={`w-16 h-16 text-primary ${mounted && theme === 'dark' ? 'invert' : ''}`}
            />
            <h3 className="font-bold text-lg">Planting & Monitoring</h3>
          </div>
          <Separator className="my-3" />
          <p className="text-xs  text-muted-foreground grow">
            Plan, track, and verify tree planting activities with real-time digital monitoring tools.
          </p>
        </Card>
        <Card className="p-4">
          <div className="flex rounded-lg bg-primary/50 items-center gap-3 mb-2">
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
        </Card>

        <Card className="p-4">
          <div className="flex rounded-lg bg-primary/50 items-center gap-3 mb-2">
            <Image 
              src="/services6.svg" 
              alt="services 6 Icon" 
              width={64}
              height={64}
              className={`w-16 h-16 text-primary ${mounted && theme === 'dark' ? 'invert' : ''}`}
            />
            <h3 className="font-bold text-lg">Research & Development</h3>
          </div>
          <Separator className="my-3" />
          <p className="text-xs text-muted-foreground grow">
           Advancing sustainable agriculture through data analysis, innovation, and field research.
          </p>
        </Card>
      
        <Card className="p-4">
          <p className="text-sm  text-foreground grow">
            Choose your service request, and our dedicated team will review your needs and contact you via email for further discussion.
          </p>
          <div className="mt-auto w-full pt-4"> 
            <Button 
              type="button" 
              className="w-full flex items-center justify-center"
              onClick={() => {
              setRequestModalOpen(true);
              }}
              disabled={isLoading}
              >
              {isLoading ? "Requesting..." : "Services Request"}
            </Button>
          </div>
        </Card>
      </div>
      <p className="font-bold text-sm text-center my-6">We provide comprehensive sustainability consulting services designed to support your environmental and operational goals.</p>
      
      {/* Request Services Dialog */}
      <Dialog open={requestModalOpen} onOpenChange={setRequestModalOpen}>
        <Dialog.Content size={"md"}>
          <Dialog.Header>
            <Text as="h5">Services Request</Text>
          </Dialog.Header>          
          <div className="space-y-3 p-4">
            {servicesList.map((service, index) => (
              <Card 
                key={index} 
                className="p-4 w-full"
                onClick={() => toggleService(index)}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id={`service-${index}`}
                    className="cursor-pointer"
                    checked={selectedServices.includes(index)}
                    onChange={() => toggleService(index)}
                  />
                  <Label 
                    htmlFor={`service-${index}`} 
                    className="flex-1 text-sm font-medium cursor-pointer">
                    {service.title}
                  </Label>
                </div>
              </Card>
            ))}
            <section className="flex w-full justify-end"> 
          
            <Button 
              className="flex items-center justify-center"
              onClick={handleRequestRequest}
              disabled={selectedServices.length === 0}
            >
              Send Request
            </Button>
          </section>
          </div>
        </Dialog.Content>
      </Dialog>
    </div> 
  )
}