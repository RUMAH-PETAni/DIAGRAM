'use client';

import Link from "next/link";
import { Button } from "./retroui/ButtonCustom";
import { createClient } from "@/lib/supabase/client";
import { LogIn, UserCircle, LogOut, House, Blocks, Handshake, DatabaseZap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu } from "@/components/retroui/MenuCustom";
import { Text } from "@/components/retroui/Text";
import { useEffect, useState } from "react";
import { LogoutModal } from "@/components/logout-modal";
import { useLanguage } from "@/lib/i18n/context";
import { Profile } from "@/components/profile";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/retroui/DrawerCustom";
import { LoginForm } from "@/components/login/login-form";
import { SignupForm } from "@/components/signup/signup-form";

export function AuthButtonClient() {
  const { t } = useLanguage();
  const [userData, setUserData] = useState<any>(null);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);
  const [showLoginDrawer, setShowLoginDrawer] = useState(false);
  const [showSignupDrawer, setShowSignupDrawer] = useState(false);
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
          <Menu.Content className="min-w-36 z-60">
            <Menu.Item onClick={() => setShowProfileDrawer(true)} className="flex items-center cursor-pointer">
              <UserCircle className="mr-2 h-4 w-4" />
              <span>{t('general.account')}</span>
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
        
        {/* Profile Drawer */}
        <Drawer open={showProfileDrawer} onOpenChange={setShowProfileDrawer} direction="bottom">
          <DrawerContent className="h-[80vh] w-full max-w-5xl mx-auto px-6">
            <DrawerHeader>
              <DrawerTitle className="font-bold text-2xl">{t('profile.accountProfile')}</DrawerTitle>
            </DrawerHeader>
            <div className="p-4 pb-8 max-h-[80vh] overflow-y-auto">
              <Profile />
            </div>
          </DrawerContent>
        </Drawer>
        
        <span className="md:inline-block text-xl font-medium p-2">
          {t('general.hello')}, {displayName}!
        </span>
      </div>
    );
  }

  // Jika belum login, tampilkan tombol login dengan tooltip terjemahan
  return (
    <div className="flex gap-2">
      <Button 
        onClick={() => setShowLoginDrawer(true)}
        className="flex items-center justify-center h-10 w-10 p-0"
        >
        <LogIn/>
      </Button>
      <span className="md:inline-block text-xl text-foreground font-bold p-2">
        {t('general.login')}
      </span>
    
      {/* Login Drawer */}
      <Drawer open={showLoginDrawer} onOpenChange={setShowLoginDrawer} direction="top">
        <DrawerContent className="h-[400px] w-full max-w-md mx-auto px-6">
          <DrawerHeader>
            <DrawerTitle className="font-bold text-2xl">{t('auth.loginTitle')}</DrawerTitle>
          </DrawerHeader>
          <div className=" max-w-none">
            <LoginForm onClose={() => setShowLoginDrawer(false)} />
          </div>
         <DrawerFooter className="text-center">
          <div className="text-center justify-center">
            {t('auth.noAccount')}{" "}
              <button 
                type="button"
                className="font-bold cursor-pointer text-primary hover:underline"
                onClick={() => {
                  setShowLoginDrawer(false);
                  setShowSignupDrawer(true);
                }}>
                {t('auth.signUp')}
              </button>
          </div>
         </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Signup Drawer */}
      <Drawer open={showSignupDrawer} onOpenChange={setShowSignupDrawer} direction="top">
        <DrawerContent className="h-[650px] md:h-[80vh] w-full max-w-md mx-auto px-6">
          <DrawerHeader>
            <DrawerTitle className="font-bold text-2xl">{t('auth.signUpTitle')}</DrawerTitle>
          </DrawerHeader>
          <div className=" max-w-none">
            <SignupForm onClose={() => setShowSignupDrawer(false)} />
          </div>
               <DrawerFooter className="text-center">
          <div className="text-center justify-center">
            {t('auth.alreadyHaveAccount')}{" "}
              <button 
                type="button"
                className="font-bold cursor-pointer text-primary hover:underline"
                onClick={() => {
                  setShowLoginDrawer(true);
                  setShowSignupDrawer(false);
                }}>
                {t('auth.signIn')}
              </button>
          </div>
         </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}