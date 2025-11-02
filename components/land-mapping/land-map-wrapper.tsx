'use client';

import dynamic from 'next/dynamic';
import { LandMapProps } from './land-map';
import { Loader2 } from 'lucide-react';

// Dynamically import the LandMap component to avoid SSR issues with Leaflet
const LandMap = dynamic(
  () => import('./land-map').then((mod) => mod.LandMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center bg-muted rounded-lg">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    ),
  }
);

export default function LandMapWrapper(props: LandMapProps) {
  return <LandMap {...props} />;
}