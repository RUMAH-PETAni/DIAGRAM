"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { LogoutButton } from "@/components/logout-button";


export function LogoutForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);



  return (
    <div className= "flex flex-col gap-6 text-center">
        <Card>
          <CardHeader>
            
            <CardDescription>
             Thank you for using DIAGRAM, we hope you get the best user experience from our platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
           
              <div className="flex flex-col gap-6">
                <LogoutButton/>
              </div>
              
       
          </CardContent>
        </Card>
    
    </div>
  );
}
