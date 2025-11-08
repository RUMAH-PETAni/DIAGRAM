import Link from "next/link";
import { Button } from "./retroui/ButtonCustom";
import { createClient } from "@/lib/supabase/server";
import { LogIn } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/retroui/Tooltip"
import { AuthButtonClient } from "./auth-button-client";

// This component is now a wrapper that renders the client component
// The client component handles both logged-in and logged-out states
export function AuthButton() {
  return <AuthButtonClient />;
}

