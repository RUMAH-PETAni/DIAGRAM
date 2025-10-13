"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { InfoIcon } from "lucide-react";

import ProfileManagement from "@/components/profile-management";

export default function ProtectedPage() {
  const router = useRouter();
  const [userClaims, setUserClaims] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getClaims();
      if (error || !data?.claims) {
        router.push("/auth/login");
      } else {
        setUserClaims(data);
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
          
          Selamat Datang di DIAGRAM, silahkan isi dan lengkapi data diri anda terlebih dahulu.
        </div>
      </div>
      <ProfileManagement />     
    </div>
  );
}
