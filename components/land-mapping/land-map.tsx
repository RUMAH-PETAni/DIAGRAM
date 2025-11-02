'use client';

import * as React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, FeatureGroup, Polygon, LayersControl } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Layers, 
  FileText, 
  Trash2, 
  Info,
  House,
  Search,
  CloudSun
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import LocationTracker from '@/components/LocationTracker';

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export type LandBoundary = {
  id: string;
  name: string;
  coordinates: LatLngExpression[][];
  area?: number;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface LandMapProps {
  initialPosition?: LatLngExpression;
  zoom?: number;
  boundaries?: LandBoundary[];
  onBoundaryCreated?: (boundary: LandBoundary) => void;
  onBoundaryUpdated?: (boundary: LandBoundary) => void;
  onBoundaryDeleted?: (id: string) => void;
  editable?: boolean;
  className?: string;
}

const LandMap: React.FC<LandMapProps> = ({
  initialPosition = [-0.7893, 113.9213], // Center of Indonesia coordinates as default
  zoom = 5, // Lower zoom to show more of Indonesia
  boundaries = [],
  onBoundaryCreated,
  onBoundaryUpdated,
  onBoundaryDeleted,
  editable = true,
  className = '',
}) => {
  const [mapBoundaries, setMapBoundaries] = React.useState<LandBoundary[]>(boundaries);
  const [selectedBoundary, setSelectedBoundary] = React.useState<LandBoundary | null>(null);
  const [mapLayer, setMapLayer] = React.useState<'osm' | 'satellite' | 'topography' | 'weather'>('osm'); // Default to OpenStreetMap
  const [showWeather, setShowWeather] = React.useState(false); // Weather overlay state

  return (
    <div className={`w-full h-full ${className} relative overflow-hidden flex flex-col`}>
      <MapContainer 
        center={initialPosition} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg overflow-hidden z-0 flex-1"
        zoomControl={false}
      >
        {/* Conditionally render the appropriate tile layer based on state */}
        {mapLayer === 'osm' && (
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        )}
        {mapLayer === 'satellite' && (
          <TileLayer
            url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
            attribution="&copy; Google Maps"
          />
        )}
        {mapLayer === 'topography' && (
         <TileLayer
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenTopoMap"
          />
        )}
        
        {/* Weather overlay - always shown when selected, regardless of base layer */}
        {showWeather && (
          <TileLayer
            url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${process.env.NEXT_PUBLIC_OWM_API_KEY}`}
            attribution="OpenWeatherMap"
            opacity={1}
          />
        )}
        
        <MapResizeHandler />
        
        {/* Search control */}
        <SearchControl />
        
        {/* Custom zoom control component */}
        <MapZoomControl />
        
        {/* Location tracker */}
        <LocationTracker />
      </MapContainer>
      
      {/* Weather toggle */}
      <div className="absolute top-4 right-[60px] z-1000">
        <Button
          variant={showWeather ? "default" : "outline"}
          size="sm"
          className="bg-background/80 backdrop-blur w-8 h-8 p-0"
          onClick={() => setShowWeather(!showWeather)}
          title="Toggle weather overlay"
        >
          <CloudSun className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Layer control using shadcn dropdown */}
      <div className="absolute top-4 right-4 z-1000">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="bg-background/80 backdrop-blur w-8 h-8 p-0"
            >
              <Layers className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-background/80 backdrop-blur w-auto min-w-[unset]">
            <DropdownMenuItem 
              onClick={() => setMapLayer('osm')}
              className={`text-xs ${mapLayer === 'osm' ? 'font-medium' : ''}`}
            >
              OSM
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => setMapLayer('satellite')}
              className={`text-xs ${mapLayer === 'satellite' ? 'font-medium' : ''}`}
            >
              Satellite
            </DropdownMenuItem>
             <DropdownMenuItem 
              onClick={() => setMapLayer('topography')}
              className={`text-xs ${mapLayer === 'topography' ? 'font-medium' : ''}`}
            >
              Topography
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

// Component to handle map invalidation when container size changes
const MapResizeHandler = () => {
  const map = useMap();

  React.useEffect(() => {
    const handleResize = () => {
      setTimeout(() => map.invalidateSize());
    };

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    // MutationObserver to detect changes in the parent container
    const mapContainer = map.getContainer();
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    
    resizeObserver.observe(mapContainer.parentElement!);

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, [map]);

  return null;
};

// Component for search functionality
const SearchControl = () => {
  const map = useMap();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isSearching, setIsSearching] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState<any[]>([]);
  const [showResults, setShowResults] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);

  // Directly control map interactions based on search state
  React.useEffect(() => {
    const shouldDisableInteractions = isExpanded && (showResults || (searchResults.length > 0));
    
    if (map) {
      if (shouldDisableInteractions) {
        map.dragging.disable();
        map.scrollWheelZoom.disable();
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
      } else {
        map.dragging.enable();
        map.scrollWheelZoom.enable();
        map.touchZoom.enable();
        map.doubleClickZoom.enable();
      }
    }
  }, [isExpanded, showResults, searchResults.length, map]);

  const performSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setShowResults(true);
    
    try {
      // Using OpenStreetMap Nominatim API for geocoding
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      
      setSearchResults(data);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch();
  };

  const handleResultClick = (result: any) => {
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    
    if (!isNaN(lat) && !isNaN(lon)) {
      map.setView([lat, lon], 13); // Zoom to location
      
      // Add a temporary marker to show the location
      const marker = L.marker([lat, lon]).addTo(map);
      
      // Remove the marker after a few seconds
      setTimeout(() => {
        map.removeLayer(marker);
      }, 5000);
    }
    
    setShowResults(false);
    setSearchQuery('');
  };

  return (
    <div className="absolute top-4 left-4 z-1000">
      <div className="relative flex gap-1">
        {isExpanded ? (
          <form onSubmit={handleSearch} className="flex gap-1">
            <Button 
              type="submit" 
              size="sm" 
              variant="outline"
              className="bg-background/80 backdrop-blur w-8 h-8 p-0"
              disabled={isSearching}
            >
              {isSearching ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <Search className="w-4 h-4" />
              )}
            </Button>
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search location..."
              className="bg-background/80 backdrop-blur pl-3 pr-3 py-2 h-8 w-40 sm:w-64"
              autoFocus
              onBlur={() => {
                // Close the search after a delay to allow for result clicks
                setTimeout(() => {
                  if (!showResults || searchResults.length === 0) {
                    setIsExpanded(false);
                  }
                }, 200);
              }}
            />
            <Button 
              type="button"
              size="sm" 
              variant="outline"
              className="bg-background/80 backdrop-blur w-8 h-8 p-0"
              onClick={() => {
                setIsExpanded(false);
                setSearchQuery('');
                setShowResults(false);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </Button>
          </form>
        ) : (
          <Button 
            size="sm" 
            variant="outline"
            className="bg-background/80 backdrop-blur w-8 h-8 p-0"
            onClick={() => setIsExpanded(true)}
          >
            <Search className="w-4 h-4" />
          </Button>
        )}
      </div>
      
      {showResults && searchResults.length > 0 && isExpanded && (
        <div 
          className="absolute top-full mt-1 left-9 w-64 bg-background/90 backdrop-blur border rounded-md shadow-lg z-1001 max-h-60 overflow-y-auto overscroll-contain"
          onMouseDown={(e) => e.stopPropagation()}
          onMouseUp={(e) => e.stopPropagation()}
          onWheel={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onPointerDown={(e) => e.stopPropagation()}
          onPointerUp={(e) => e.stopPropagation()}
          onPointerMove={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          {searchResults.map((result, index) => (
            <div 
              key={index} 
              className="p-2 hover:bg-accent cursor-pointer text-sm border-b last:border-b-0"
              onClick={(e) => {
                e.stopPropagation();
                handleResultClick(result);
              }}
            >
              <div className="font-medium">{result.display_name}</div>
              <div className="text-xs text-muted-foreground truncate">
                {result.type} • {result.class}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {showResults && searchResults.length === 0 && searchQuery && !isSearching && isExpanded && (
        <div 
          className="absolute top-full mt-1 left-10 w-64 bg-background/90 backdrop-blur border rounded-md shadow-lg z-1001 p-2 text-sm"
          onMouseDown={(e) => e.stopPropagation()}
          onMouseUp={(e) => e.stopPropagation()}
          onWheel={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onPointerDown={(e) => e.stopPropagation()}
          onPointerUp={(e) => e.stopPropagation()}
          onPointerMove={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          No results found
        </div>
      )}
    </div>
  );
};

// Component for custom zoom control styled like the layer toggle
const MapZoomControl = () => {
  const map = useMap();
  
  return (
    <div className="absolute top-[70px] left-4 z-1000 flex flex-col gap-1">
      <Button
        variant="outline"
        size="sm"
        className="bg-background/80 backdrop-blur w-8 h-8 p-0"
        onClick={() => {
          // Zoom to default position (Indonesia)
          map.setView([-0.7893, 113.9213], 5);
        }}
        title="Zoom to default view"
      >
        <House className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="bg-background/80 backdrop-blur w-8 h-8 p-0"
        onClick={() => map.zoomIn()}
        title="Zoom in"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="bg-background/80 backdrop-blur w-8 h-8 p-0"
        onClick={() => map.zoomOut()}
        title="Zoom out"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </Button>
    </div>
  );
};

export { LandMap };