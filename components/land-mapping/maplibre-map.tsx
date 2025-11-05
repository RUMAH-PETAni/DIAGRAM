'use client';

import * as React from 'react';
import 'maplibre-theme/icons.default.css';
import 'maplibre-theme/modern.css';
import { RMap, RNavigationControl, RGeolocateControl, RFullscreenControl, RLayer, RSource } from 'maplibre-react-components';
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
  const [flashingPoint, setFlashingPoint] = React.useState<{ lat: number; lng: number } | null>(null);
  const [showFlashingPoint, setShowFlashingPoint] = React.useState<boolean>(false);

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
    
    // Set flashing point at the clicked location
    setFlashingPoint({ lat: latRounded, lng: lngRounded });
    
    // Fetch altitude for the clicked coordinates
    getAltitude(latRounded, lngRounded).then(setAltitude);
  };

  const styles = {
    'Dark': '/styles/dark.json', // Using local dark map style
    'Satellite': {
      version: 8 as 8,
      name: 'ESRI World Imagery',
      sources: {
        'esri-world-imagery': {
          type: 'raster' as const,
          tiles: [
            'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
          ],
          tileSize: 256,
          attribution: 'Tiles © Esri'
        }
      },
      layers: [{
        id: 'esri-world-imagery',
        type: 'raster' as const,
        source: 'esri-world-imagery',
      }]
    }
  };

  // Determine the current style based on basemap state
  const currentStyle = styles[basemap];

  // State to track if component is mounted (client-side only)
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // State for animation properties
  const [animationStep, setAnimationStep] = React.useState<number>(0);

  // Effect to handle flashing animation
  React.useEffect(() => {
    if (flashingPoint) {
      setShowFlashingPoint(true);
      
      // Create animation loop for pulsing effect
      let animationFrame: number;
      const startTime = Date.now();
      const duration = 500; // 0.5 seconds total duration
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        if (elapsed < duration) {
          // Calculate animation step (0 to 1) for the pulsing effect
          const progress = (elapsed % 1000) / 1000; // 1 second cycle
          setAnimationStep(progress);
          animationFrame = requestAnimationFrame(animate);
        } else {
          setShowFlashingPoint(false);
          setAnimationStep(0);
        }
      };
      
      animationFrame = requestAnimationFrame(animate);
      
      // Hide the point after 0.2 seconds
      const timer = setTimeout(() => {
        setShowFlashingPoint(false);
      }, 500);
      
      return () => {
        cancelAnimationFrame(animationFrame);
        clearTimeout(timer);
      };
    }
  }, [flashingPoint]);


  return (
    <div className={`w-full h-full ${className} relative overflow-hidden flex flex-col`}>
      {isMounted ? (
        <RMap
          initialCenter={initialPosition as [number, number]}
          initialZoom={zoom}
          style={{ width: '100%', height: '100%' }}
          mapStyle={currentStyle}
          onClick={handleMapClick}
          initialAttributionControl={false}
        >
          {/* Source for the flashing point */}
          {flashingPoint && showFlashingPoint && (
            <RSource 
              id="flashing-point-source"
              type="geojson"
              data={{
                type: 'FeatureCollection',
                features: [
                  {
                    type: 'Feature',
                    geometry: {
                      type: 'Point',
                      coordinates: [flashingPoint.lng, flashingPoint.lat]
                    },
                    properties: {
                      id: 'flashing-point'
                    }
                  }
                ]
              }}
            />
          )}
          {/* Layer for the flashing point */}
          {flashingPoint && showFlashingPoint && (
            <RLayer
              id="flashing-point-layer"
              source="flashing-point-source"
              type="circle"
              paint={{
                'circle-radius': 2,
                'circle-color': '#ef4444', // Tailwind red-500
                'circle-opacity': 0.8,
                'circle-stroke-width': 1,
                'circle-stroke-color': '#ffffff',
              }}
            />
          )}
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
          
          {/* Coordinate display positioned at bottom-center of the map */}
          <div className="maplibregl-ctrl-bottom-right" style={{ margin: '10px', zIndex: 10 }}>
            <div className="bg-black/50 px-2 py-1 rounded text-[10px] text-white min-w-[200px]">
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
                <div className="text-center">
                  Click or tap on map
                </div>
              )}
            </div>
          </div>
        </RMap>
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          Loading map...
        </div>
      )}
    </div>
  );
};


export { MapLibreMap };