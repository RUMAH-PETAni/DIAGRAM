'use client';

import * as React from 'react';
import 'maplibre-theme/icons.default.css';
import 'maplibre-theme/modern.css';
import { RMap, RNavigationControl, RGeolocateControl, RFullscreenControl } from 'maplibre-react-components';
import { LayerSwitcherControl, StyleID } from './layer-switcher-control';

export interface MapLibreMapProps {
  initialPosition?: [number, number]; // [longitude, latitude]
  zoom?: number;
  className?: string;
}

const MapLibreMap: React.FC<MapLibreMapProps> = ({
  initialPosition = [113.9213, -0.7893], // Center of Indonesia coordinates as default [longitude, latitude]
  zoom = 4, // Lower zoom to show more of Indonesia
  className = '',
}) => {
  const [coordinates, setCoordinates] = React.useState<{ lat: number; lng: number } | null>(null);
  const [altitude, setAltitude] = React.useState<number | null>(null);
  const [isLoadingAltitude, setIsLoadingAltitude] = React.useState<boolean>(false);
  const [basemap, setBasemap] = React.useState<StyleID>('Dark');

  // Get altitude from Open-Elevation API
  const getAltitude = async (lat: number, lng: number): Promise<number | null> => {
    if (!lat || !lng) return null;
    
    setIsLoadingAltitude(true);
    try {
      const response = await fetch(`https://api.open-elevation.com/api/v1/lookup?locations=${lat},${lng}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setIsLoadingAltitude(false);
      return data.results[0]?.elevation || null;
    } catch (error) {
      console.error("Error fetching altitude:", error);
      setIsLoadingAltitude(false);
      
      // Return null to indicate failure
      return null;
    }
  };

  // Format coordinate display
  const formatCoordinate = (coord: number): string => {
    return coord.toFixed(6);
  };

  // Format altitude display
  const formatAltitude = (alt: number | null): string => {
    if (alt === null) return '--';
    return `${Math.round(alt)} m`;
  };

  // Handle map click events
  const handleMapClick = (e: any) => { // Map event type
    const { lng, lat } = e.lngLat;
    const latRounded = parseFloat(lat.toFixed(6));
    const lngRounded = parseFloat(lng.toFixed(6));
    
    setCoordinates({ lat: latRounded, lng: lngRounded });
    
    // Fetch altitude for the clicked coordinates
    getAltitude(latRounded, lngRounded).then(setAltitude);
  };

  const styles = {
    'Dark': '/styles/dark.json', // Using local dark map style
    'Satellite': 'https://tiles.stadiamaps.com/styles/alidade_satellite.json',
  };

  // Determine the current style based on basemap state
  const currentStyle = styles[basemap];

  return (
    <div className={`w-full h-full ${className} relative overflow-hidden flex flex-col`}>
      {typeof window !== 'undefined' ? (
        <RMap
          initialCenter={initialPosition as [number, number]}
          initialZoom={zoom}
          style={{ width: '100%', height: '100%' }}
          mapStyle={currentStyle}
          onClick={handleMapClick}
          initialAttributionControl={false}
        >
          <RFullscreenControl position="top-left" />
          <RNavigationControl position="top-left" showCompass={false} showZoom={true} />
          <RGeolocateControl
            showUserLocation={true}
            showAccuracyCircle={true}
            trackUserLocation={false}
            position="bottom-left"
          />
          
          <LayerSwitcherControl
            style={basemap}
            setStyle={setBasemap as React.Dispatch<React.SetStateAction<StyleID>>}
          />
        </RMap>
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          Loading map...
        </div>
      )}
      
      {/* Coordinate display positioned at bottom-left corner */}
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 z-10 text-[10px] text-white">
        {coordinates ? (
          <div className="flex items-center space-x-1">
            <span className="font-medium">Lat:</span> <span>{formatCoordinate(coordinates.lat)}</span>
            <span className="font-medium">Lng:</span> <span>{formatCoordinate(coordinates.lng)}</span>
            <span className="font-medium">Alt:</span> 
            {isLoadingAltitude ? (
              <span className="inline-block h-2 w-2 animate-spin rounded-full border border-current border-t-transparent align-middle"></span>
            ) : (
              <span>{formatAltitude(altitude)}</span>
            )}
          </div>
        ) : (
          <div>
            Click or tap on map
          </div>
        )}
      </div>
    </div>
  );
};

export { MapLibreMap };