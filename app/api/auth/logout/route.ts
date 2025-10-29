import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error);
    return NextResponse.json({ error: "Could not sign out" }, { status: 500 });
  }

  // Return success response that the client can handle
  return NextResponse.json({ success: true });
}