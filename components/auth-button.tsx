import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogIn } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { AuthButtonClient } from "./auth-button-client";

export async function AuthButton() {
  const supabase = await createClient();

  // Check if user is authenticated
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  // ✅ Jika user sudah login, use client component with modals
  if (user) {
    return <AuthButtonClient />;
  }

  // ✅ Jika belum login, show simple login button (server rendered)
  return (
    <div className="flex gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button asChild size="sm" variant="default">
              <Link href="/auth/login">
                <LogIn className="h-4 w-4" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
          <p>Login here</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

