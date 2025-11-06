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
            <Button asChild>
              <Link href="/auth/login">
                <LogIn/>
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

