"use client";

import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { createClient } from "@/lib/supabase/client";

export default function LocationTracker() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [icon, setIcon] = useState<L.Icon | L.DivIcon>(getDefaultIcon());

  function getDefaultIcon(): L.Icon {
    return new L.Icon({
      iconUrl: "/avatars/shadcn.jpg", // Use default avatar
      iconSize: [40, 40],
      
    });
  }

  function createAvatarIcon(avatarUrl: string): L.DivIcon {
    // Create a circular avatar using DivIcon with CSS styling similar to nav-user
    const htmlContent = `
      <div style="
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-image: url('${avatarUrl}');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        border: 2px solid white;
        box-shadow: 0 0 5px rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      "></div>
    `;
    
    return L.divIcon({
      html: htmlContent,
      className: '',
      iconSize: [40, 40],
   
      popupAnchor: [0, -30],
    });
  }

  useEffect(() => {
    const loadAvatar = async () => {
      try {
        const supabase = createClient();
        
        // Get user session (same approach as nav-user.tsx)
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          // Fetch user profile to get avatar (same approach as nav-user.tsx)
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('avatar_url')
            .eq('id', user.id)
            .single();

          if (error) {
            console.error("Error fetching profile:", error);
            setIcon(getDefaultIcon());
            return;
          }

          if (profile?.avatar_url) {
            let avatarUrl = profile.avatar_url;

            // Handle avatar URL construction (similar to nav-user.tsx)
            if (!avatarUrl.startsWith('http')) {
              // Handle Supabase storage URLs
              if (avatarUrl.includes('/')) {
                try {
                  const { data } = supabase.storage
                    .from('profile_picture')
                    .getPublicUrl(avatarUrl);
                  
                  if (data?.publicUrl) {
                    avatarUrl = data.publicUrl;
                  }
                } catch (storageError) {
                  console.error("Error getting storage URL:", storageError);
                  avatarUrl = `/avatars/shadcn.jpg`; // Fallback
                }
              } else {
                // Handle local avatar files
                avatarUrl = `/avatar/${avatarUrl}`;
              }
            }

            setIcon(createAvatarIcon(avatarUrl));
          } else {
            // Use default avatar if none found in profile
            setIcon(getDefaultIcon());
          }
        } else {
          // Use default avatar if no user
          setIcon(getDefaultIcon());
        }
      } catch (error) {
        console.error("Error loading user avatar:", error);
        // Keep default icon if there's an error
        setIcon(getDefaultIcon());
      }
    };

    loadAvatar();
  }, []);

  const map = useMap();

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    // Get initial position only once
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setPosition(coords);
        // Only set the initial position, don't continuously update the map view
        // map.flyTo(coords, 14); // Commented out to prevent auto-centering
      },
      (err) => console.error(err),
      { enableHighAccuracy: true, timeout: 10000 }
    );
    
    // If you want to show the marker but not auto-center, keep the watch but don't update map view
    // const watchId = navigator.geolocation.watchPosition(
    //   (pos) => {
    //     const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
    //     setPosition(coords);
    //     // Don't update map view here to allow manual navigation
    //   },
    //   (err) => console.error(err),
    //   { enableHighAccuracy: true }
    // );

    // return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  if (!position) return null;

  return (
    <Marker position={position} icon={icon}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
