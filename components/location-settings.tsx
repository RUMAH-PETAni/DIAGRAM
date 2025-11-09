'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/retroui/CardCustom';
import { Button } from '@/components/retroui/ButtonCustom';
import { useLanguage } from '@/lib/i18n/context';
import { Locate, LocateOff } from 'lucide-react';

interface LocationSettingsProps {
  onLocationChange?: (enabled: boolean, coords?: { lat: number; lng: number }) => void;
}

export function LocationSettings({ onLocationChange }: LocationSettingsProps) {
  const { t } = useLanguage();
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setError(t('settings.locationNotSupported'));
      return;
    }

    // Check if location permission was previously granted
    navigator.permissions.query({ name: 'geolocation' }).then(permissionStatus => {
      if (permissionStatus.state === 'granted') {
        setLocationEnabled(true);
      }
    });
  }, []);

  const toggleLocationAccess = () => {
    if (locationEnabled) {
      // Disable location access
      setLocationEnabled(false);
      setCurrentLocation(null);
      if (onLocationChange) {
        onLocationChange(false);
      }
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setCurrentLocation(location);
        setLocationEnabled(true);
        setLoading(false);

        if (onLocationChange) {
          onLocationChange(true, location);
        }
      },
      (err) => {
        setLoading(false);
        setError(err.message || t('settings.locationPermissionDenied'));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000, // 10 seconds
        maximumAge: 60000, // 1 minute
      }
    );
  };

  return (
    <div className="flex items-center gap-2">
      <span className="px-2 py-1">
        {locationEnabled ? t('settings.enabled') : t('settings.disabled')}
      </span>
      <Button
        variant={locationEnabled ? "default" : "outline"}
        size="sm"
        onClick={toggleLocationAccess}
        className="flex items-center justify-center h-10 w-10 p-0"
      >
        {locationEnabled ? (
          <Locate/>
        ) : (
          <LocateOff />
        )}
      </Button>
    </div>
  );
}