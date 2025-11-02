import { createClient } from "@/lib/supabase/server";
import { LandMapSidebarClient } from "./landmap-sidebar-client";

export async function LandMapSidebarServer({ ...props }: any) {
  const supabase = await createClient();

  // Get user data from Supabase
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  let userData = {
    name: "Guest",
    email: "",
    avatar: "/avatars/shadcn.jpg",
  };

  if (user) {
    // Fetch additional user profile info if needed
    const { data: profileData } = await supabase
      .from("profiles")
      .select("full_name, avatar_url")
      .eq("id", user.sub)
      .single();

    let avatarUrl = null;

    if (profileData?.avatar_url) {
      const url = profileData.avatar_url;

      // ✅ Kasus 1: Avatar dari folder /public/avatar
      // Simpan di DB misalnya: "male2.webp"
      if (!url.includes("/")) {
        avatarUrl = `/avatar/${url}`;
      }

      // ✅ Kasus 2: Avatar dari Supabase Storage bucket (misal "user_id/file.webp")
      else {
        const { data: signedUrlData, error: signedError } = await supabase.storage
          .from("profile_picture")
          .createSignedUrl(url, 60 * 60); // berlaku 1 jam

        if (!signedError && signedUrlData?.signedUrl) {
          avatarUrl = signedUrlData.signedUrl;
        }
      }
    }

    userData = {
      name: user.user_metadata?.display_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
      email: user.email || '',
      avatar: avatarUrl || '/avatars/shadcn.jpg',
    };
  }

  return <LandMapSidebarClient user={userData} {...props} />;
}