"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useI18n } from '@/lib/i18n-context';
import ProfileManagement from "@/components/profile-management";

export default function ProtectedPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useI18n();

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getClaims();
      if (error || !data?.claims) {
        router.push("/auth/login");
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex-1 w-full flex flex-col gap-12 items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-2xl">
        <ProfileManagement />     
      </div>
    </div>
  );
}
