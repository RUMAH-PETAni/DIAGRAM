import clsx from "clsx";
import { ClassNameValue, twMerge } from "tailwind-merge";

export function cn(...classes: ClassNameValue[]) {
  return twMerge(clsx(classes));
}

export const hasEnvVars = 
  process.env.NEXT_PUBLIC_SUPABASE_URL && 
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;