'use client';

import Link from "next/link";
import { Button } from "./retroui/ButtonCustom";
import { createClient } from "@/lib/supabase/client";
import { LogIn, UserCircle, LogOut, House, Blocks, Handshake, DatabaseZap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu } from "@/components/retroui/MenuCustom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/retroui/Tooltip";
import { useEffect, useState } from "react";
import { LogoutModal } from "@/components/logout-modal";
import { useLanguage } from "@/lib/i18n/context";

export function AuthButtonClient() {
  const { t } = useLanguage();
  const [userData, setUserData] = useState<any>(null);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setUserData(user);

        // Fetch profile data
        const { data: profileData, error } = await supabase
          .from("profiles")
          .select("avatar_url, full_name")
          .eq("id", user.id)
          .single();

        if (!error && profileData?.avatar_url) {
          const url = profileData.avatar_url;

          // ✅ Kasus 1: Avatar dari folder /public/avatar
          // Simpan di DB misalnya: "male2.webp"
          if (!url.includes("/")) {
            setUserAvatar(`/avatar/${url}`);
          }

          // ✅ Kasus 2: Avatar dari Supabase Storage bucket (misal "user_id/file.webp")
          else {
            const { data: signedUrlData, error: signedError } = await supabase.storage
              .from("profile_picture")
              .createSignedUrl(url, 60 * 60); // berlaku 1 jam

            if (!signedError && signedUrlData?.signedUrl) {
              setUserAvatar(signedUrlData.signedUrl);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();

    // Set up real-time authentication listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'USER_UPDATED') {
        fetchUserData();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  if (loading) {
    return <div className="flex items-center gap-2">{t('general.loading')}</div>;
  }

  if (userData) {
    const displayName = userData.user_metadata?.display_name ||
                       userData.user_metadata?.full_name ||
                       userData.email?.split('@')[0] ||
                       'User';

    return (
      <div className="flex items-center gap-2">

        <Menu>
          <Menu.Trigger asChild>
            <Avatar className=" h-12 w-12 shadow-md hover:shadow active:shadow-none bg-primary text-primary-foreground border-2 border-black transition hover:translate-y-1 active:translate-y-2 active:translate-x-1 hover:bg-primary-hover">
                <AvatarImage
                  src={userAvatar || "/avatar/default.png"}
                  alt="User avatar"
                />
                <AvatarFallback>
                  {userData.user_metadata?.display_name?.charAt(0) ||
                    userData.user_metadata?.full_name?.charAt(0) ||
                    userData.email?.charAt(0) ||
                    "U"}
                </AvatarFallback>
              </Avatar>

          </Menu.Trigger>
          <Menu.Content className="min-w-36">
            <Menu.Item asChild>
              <Link href="/profile" className="flex items-center">
                <UserCircle className="mr-2 h-4 w-4" />
                <span>{t('general.account')}</span>
              </Link>
            </Menu.Item>
            <Menu.Item onClick={handleLogoutClick}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>{t('general.logout')}</span>
              </Menu.Item>
          </Menu.Content>
        </Menu>



        <LogoutModal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
        />
      <span className="md:inline-block text-xl font-medium">
          {t('general.hello')}, {displayName}!
      </span>
      </div>
    );
  }

  // Jika belum login, tampilkan tombol login dengan tooltip terjemahan
  return (
    <div className="flex gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button asChild>
              <Link href="/auth/login">
                <LogIn/>
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('general.login')} {t('general.here')}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}