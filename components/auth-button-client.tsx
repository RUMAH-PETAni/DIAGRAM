"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/client";
import { LogIn, UserCircle, LogOut, House, Blocks, Handshake, DatabaseZap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { ProfileModal } from "@/components/profile-modal";
import { LogoutModal } from "@/components/logout-modal";

export function AuthButtonClient() {
  const [userData, setUserData] = useState<any>(null);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
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

  const handleProfileClick = () => {
    setShowProfileModal(true);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  if (loading) {
    return <div className="flex items-center gap-2">Loading...</div>;
  }

  if (userData) {
    const displayName = userData.user_metadata?.display_name || 
                       userData.user_metadata?.full_name || 
                       userData.email?.split('@')[0] || 
                       'User';

    return (
      <div className="flex items-center gap-4">
        <span className="hidden md:inline-block">
          Hello, {displayName}!
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full transition-transform duration-200 hover:scale-110"
            >
              <Avatar className="h-8 w-8 transition-transform duration-200 hover:scale-110">
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
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-content" align="end" forceMount>
            <DropdownMenuItem asChild>
              <Link href="/" className="flex items-center">
                <House className="mr-2 h-4 w-4" />
                <span>Home</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleProfileClick} className="flex items-center">
              <UserCircle className="mr-2 h-4 w-4" />
              <span>Account</span>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/features" className="flex items-center">
                <Blocks className="mr-2 h-4 w-4" />
                <span>Features</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/services" className="flex items-center">
                <Handshake className="mr-2 h-4 w-4" />
                <span>Services</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/library" className="flex items-center">
                <DatabaseZap className="mr-2 h-4 w-4" />
                <span>Library</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogoutClick} className="flex items-center">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <ProfileModal 
          isOpen={showProfileModal} 
          onClose={() => setShowProfileModal(false)} 
        />
        
        <LogoutModal 
          isOpen={showLogoutModal} 
          onClose={() => setShowLogoutModal(false)} 
        />
      </div>
    );
  }

  // ✅ Jika belum login
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