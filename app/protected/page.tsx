"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useI18n } from '@/lib/i18n-context';
import ProfileManagement from "@/components/profile-management";

export default function ProtectedPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { t } = useI18n();

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
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-4 rounded-md text-foreground flex gap-3 items-center">
          {t('infoDiagram')}
        </div>
      </div>
      <ProfileManagement />     
    </div>
  );
}
