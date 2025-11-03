'use client';

// External libraries
import * as React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, FeatureGroup, Polygon, LayersControl } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// UI components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Icons
import { 
  Layers, 
  FileText, 
  Trash2, 
  Info,
  House,
  Search,
  CloudSun,
  Locate,
  Ruler
} from 'lucide-react';

// Other components
import LocationTracker from '@/components/LocationTracker';

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Turf.js for measurements
import * as turf from '@turf/turf';

// Type definitions
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
  const [mapLayer, setMapLayer] = React.useState<MapLayerState['type']>('osm'); // Default to OpenStreetMap
  const [showWeather, setShowWeather] = React.useState<boolean>(false); // Weather overlay state

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
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        )}
        {mapLayer === 'satellite' && (
          <TileLayer
            url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
          />
        )}
        
        {/* Weather overlay - always shown when selected, regardless of base layer */}
        {showWeather && (
          <TileLayer
            url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${process.env.NEXT_PUBLIC_OWM_API_KEY}`}
          />
        )}
        
        <MapResizeHandler />
        
        {/* Search control */}
        <SearchControl />
        
        {/* Custom zoom control component */}
        <MapZoomControl />
        
        {/* Location tracker */}
        <LocationTracker />
        
        {/* Location tracker toggle button */}
        <LocationButton />
        <CoordinateDisplay />
        <MeasurementTool />
      </MapContainer>
      
      {/* Weather toggle */}
      <div className="absolute top-4 right-[60px] z-50">
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
      <div className="absolute top-4 right-4 z-50">
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
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};



// Type definitions
interface LocationButtonProps {}

interface CoordinateDisplayProps {}

interface MapResizeHandlerProps {}

interface SearchControlProps {}

interface MapZoomControlProps {}

interface MapLayerState {
  type: 'osm' | 'satellite' | 'weather';
  showWeather: boolean;
}

interface MeasurementState {
  mode: 'distance' | 'area' | null;
  points: L.LatLngLiteral[];
}

interface MeasurementToolProps {}

// Component for location tracker button
const LocationButton: React.FC<LocationButtonProps> = () => {
  const map = useMap();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  
  const handleClick = () => {
    console.log("Location button clicked"); // Debug log
    setIsLoading(true);
    
    if (!navigator.geolocation) {
      console.log("Geolocation not supported by browser");
      alert("Geolocation is not supported by your browser");
      setIsLoading(false);
      return;
    }
    
    console.log("Getting geolocation..."); // Debug log
    
    // Try with high accuracy first
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Got position:", latitude, longitude); // Debug log
        map.setView([latitude, longitude], 14);
        setIsLoading(false);
      },
      (error) => {
        console.log("First error object:", error);
        console.log("Error properties:", Object.keys(error || {}));
        console.log("Error code:", error?.code);
        console.log("Error message:", error?.message);
        
        // If high accuracy fails, try with lower accuracy
        if (!error || error.code === 3 || error.code === 1 || error.code === 2) { // Timeout, permission denied, or position unavailable
          console.log("Trying with lower accuracy...");
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              console.log("Got low accuracy position:", latitude, longitude);
              map.setView([latitude, longitude], 14);
              setIsLoading(false);
            },
            (error2) => {
              console.log("Second error object:", error2);
              console.log("Error2 properties:", Object.keys(error2 || {}));
              console.log("Error2 code:", error2?.code);
              console.log("Error2 message:", error2?.message);
              setIsLoading(false);
              
              // Check common issues
              if (!error2) {
                alert("Unable to get your location. Geolocation may be blocked by your browser or firewall.");
              } else if (error2.code === 1) {
                alert("Permission denied. Please allow location access and try again.");
              } else if (error2.code === 2) {
                alert("Position unavailable. Please check your location settings.");
              } else if (error2.code === 3) {
                alert("Location request timed out. Please try again or check your location settings.");
              } else {
                alert("Unable to get your location. Please check your location settings and try again.");
              }
            }
          );
        } else {
          console.log("Other error:", error.message);
          alert("Unable to get your location: " + error.message);
          setIsLoading(false);
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };
  
  return (
    <div className="absolute top-[178px] left-4 z-1000">
      <Button
        variant="outline"
        size="sm"
        className="bg-background/80 backdrop-blur w-8 h-8 p-0"
        onClick={handleClick}
        title="Locate me"
        disabled={isLoading}
      >
        {isLoading ? (
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <Locate className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
};

// Component for coordinate display
const CoordinateDisplay: React.FC<CoordinateDisplayProps> = () => {
  const map = useMap();
  const [coordinates, setCoordinates] = React.useState<{ lat: number; lng: number } | null>(null);
  const [altitude, setAltitude] = React.useState<number | null>(null);
  const [isLoadingAltitude, setIsLoadingAltitude] = React.useState<boolean>(false);
  const [debounceTimer, setDebounceTimer] = React.useState<NodeJS.Timeout | null>(null);

  // Get altitude from Open-Elevation API
  const getAltitude = async (lat: number, lng: number): Promise<number | null> => {
    if (!lat || !lng) return null;
    
    setIsLoadingAltitude(true);
    try {
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch(`https://api.open-elevation.com/api/v1/lookup?locations=${lat},${lng}`, {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setIsLoadingAltitude(false);
      return data.results[0]?.elevation || null;
    } catch (error) {
      // Check if it's an AbortError (user moved cursor or component unmounted)
      if (error instanceof Error && error.name === 'AbortError') {
        // Don't log abort errors as they are expected when requests are cancelled
        setIsLoadingAltitude(false);
        return null;
      }
      
      console.error("Error fetching altitude:", error);
      setIsLoadingAltitude(false);
      
      // Return null to indicate failure
      return null;
    }
  };

  // Update coordinates on mouse move with debouncing
  React.useEffect(() => {
    const handleMouseMove = (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      
      // Clear previous timer
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      
      // Set new timer to debounce altitude requests
      const timer = setTimeout(() => {
        setCoordinates({ lat, lng });
      }, 100); // 100ms debounce
      
      setDebounceTimer(timer);
    };

    const handleMouseOut = () => {
      // Clear debounce timer
      if (debounceTimer) {
        clearTimeout(debounceTimer);
        setDebounceTimer(null);
      }
      
      setCoordinates(null);
      setAltitude(null);
    };

    map.on('mousemove', handleMouseMove);
    map.on('mouseout', handleMouseOut);

    return () => {
      map.off('mousemove', handleMouseMove);
      map.off('mouseout', handleMouseOut);
      
      // Clear timer on unmount
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [map, debounceTimer]);

  // Fetch altitude when coordinates change (debounced)
  React.useEffect(() => {
    if (coordinates) {
      getAltitude(coordinates.lat, coordinates.lng).then(setAltitude);
    }
  }, [coordinates]);

  // Format coordinate display
  const formatCoordinate = (coord: number): string => {
    return coord.toFixed(6);
  };

  // Format altitude display
  const formatAltitude = (alt: number | null): string => {
    if (alt === null) return '--';
    return `${Math.round(alt)} m`;
  };

  return (
    <div className="absolute bottom-1 left-1 z-1000 text-[10px]">
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
        <div className="text-muted-foreground">
          Move cursor over map
        </div>
      )}
    </div>
  );
};

// Component to handle map invalidation when container size changes
const MapResizeHandler: React.FC<MapResizeHandlerProps> = () => {
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
const SearchControl: React.FC<SearchControlProps> = () => {
  const map = useMap();
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [isSearching, setIsSearching] = React.useState<boolean>(false);
  const [searchResults, setSearchResults] = React.useState<any[]>([]);
  const [showResults, setShowResults] = React.useState<boolean>(false);
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

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

  const performSearch = async (): Promise<void> => {
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
    
    // Close the search panel after selecting a result
    setShowResults(false);
    setSearchQuery('');
    setIsExpanded(false); // Collapse the search input
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
          className="absolute top-full mt-1 left-10 w-64 bg-background/90 backdrop-blur border rounded-md shadow-lg z-1001 p-2 text-sm cursor-pointer"
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
          onClick={() => {
            // Close the search panel when clicking on "No results found"
            setIsExpanded(false);
            setShowResults(false);
            setSearchQuery('');
          }}
        >
          No results found
        </div>
      )}
    </div>
  );
};

// Component for custom zoom control styled like the layer toggle
const MapZoomControl: React.FC<MapZoomControlProps> = () => {
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

// Component for measurement tools
const MeasurementTool: React.FC<MeasurementToolProps> = () => {
  const map = useMap();
  const [measurementState, setMeasurementState] = React.useState<MeasurementState>({ 
    mode: null, 
    points: [] 
  });
  const [measurementLayer, setMeasurementLayer] = React.useState<L.LayerGroup | null>(null);

  // Initialize the layer group for measurements
  React.useEffect(() => {
    const layerGroup = new L.LayerGroup();
    map.addLayer(layerGroup);
    setMeasurementLayer(layerGroup);

    return () => {
      if (measurementLayer) {
        map.removeLayer(measurementLayer);
      }
    };
  }, [map]);

  // Handle map clicks for measurements
  React.useEffect(() => {
    if (!measurementState.mode || !measurementLayer) return;

    const handleClick = (e: L.LeafletEvent) => {
      const latlng = (e as L.LeafletMouseEvent).latlng;
      const newPoints = [...measurementState.points, latlng];
      
      setMeasurementState(prev => ({
        ...prev,
        points: newPoints
      }));

      // Add marker for the clicked point
      const marker = L.circleMarker([latlng.lat, latlng.lng], {
        radius: 5,
        color: '#3b82f6',
        fillColor: '#93c5fd',
        fillOpacity: 0.8
      }).addTo(measurementLayer);
      
      // Update measurement if we have at least 2 points for distance or 3 for area
      if (newPoints.length >= 2 && measurementState.mode) {
        updateMeasurement(newPoints, measurementState.mode as 'distance' | 'area', measurementLayer);
      }
    };

    map.on('click', handleClick);
    return () => {
      map.off('click', handleClick);
    };
  }, [measurementState.mode, measurementState.points, measurementLayer, map]);

  // Calculate and display distance
  const calculateDistance = (points: L.LatLngExpression[]): number => {
    if (points.length < 2) return 0;

    let totalDistance = 0;
    for (let i = 1; i < points.length; i++) {
      const start = points[i - 1];
      const end = points[i];
      
      // Create points for Turf.js
      const startLat = typeof start === 'object' && 'lat' in start ? start.lat : (Array.isArray(start) ? start[0] : 0);
      const startLng = typeof start === 'object' && 'lng' in start ? start.lng : (Array.isArray(start) ? start[1] : 0);
      const endLat = typeof end === 'object' && 'lat' in end ? end.lat : (Array.isArray(end) ? end[0] : 0);
      const endLng = typeof end === 'object' && 'lng' in end ? end.lng : (Array.isArray(end) ? end[1] : 0);
      
      const startPoint = turf.point([startLng, startLat]);
      const endPoint = turf.point([endLng, endLat]);
      
      // Calculate distance using Turf.js
      const distance = turf.distance(startPoint, endPoint, { units: 'kilometers' });
      totalDistance += distance;
    }

    return totalDistance;
  };

  // Calculate and display area
  const calculateArea = (points: L.LatLngExpression[]): number => {
    if (points.length < 3) return 0;

    // Create a polygon with Turf.js
    const coordinates = points.map(point => {
      const lat = typeof point === 'object' && 'lat' in point ? point.lat : (Array.isArray(point) ? point[0] : 0);
      const lng = typeof point === 'object' && 'lng' in point ? point.lng : (Array.isArray(point) ? point[1] : 0);
      return [lng, lat];
    });
    // Close the polygon by adding the first point at the end
    if (points.length > 0) {
      const firstPoint = points[0];
      const firstLat = typeof firstPoint === 'object' && 'lat' in firstPoint ? firstPoint.lat : (Array.isArray(firstPoint) ? firstPoint[0] : 0);
      const firstLng = typeof firstPoint === 'object' && 'lng' in firstPoint ? firstPoint.lng : (Array.isArray(firstPoint) ? firstPoint[1] : 0);
      coordinates.push([firstLng, firstLat]);
    }
    
    const polygon = turf.polygon([coordinates]);
    const area = turf.area(polygon); // in square meters
    
    return area;
  };

  // Update the measurement display
  const updateMeasurement = (
    points: L.LatLngExpression[], 
    mode: 'distance' | 'area', 
    layer: L.LayerGroup
  ) => {
    // Clear previous measurement results
    layer.eachLayer(layer => {
      if (layer instanceof L.Polyline || layer instanceof L.Polygon || layer instanceof L.Marker) {
        // Check if the layer is not a measurement marker by checking a custom property
        const isMeasurementMarker = (layer.options as any).isMeasurementMarker;
        if (!isMeasurementMarker) {
          layer.remove();
        }
      }
    });

    if (mode === 'distance' && points.length >= 2) {
      const distance = calculateDistance(points);
      const distanceInKm = distance.toFixed(2);
      
      // Draw the line
      const line = L.polyline(points, { color: '#3b82f6', weight: 3 }).addTo(layer);
      
      // Add distance label at midpoint
      const midIndex = Math.floor(points.length / 2);
      if (midIndex > 0 && midIndex < points.length) {
        const point1 = points[midIndex - 1];
        const point2 = points[midIndex];
        
        // Handle both LatLngLiteral and LatLngTuple types
        const lat1 = typeof point1 === 'object' && 'lat' in point1 ? point1.lat : (Array.isArray(point1) ? point1[0] : 0);
        const lng1 = typeof point1 === 'object' && 'lng' in point1 ? point1.lng : (Array.isArray(point1) ? point1[1] : 0);
        const lat2 = typeof point2 === 'object' && 'lat' in point2 ? point2.lat : (Array.isArray(point2) ? point2[0] : 0);
        const lng2 = typeof point2 === 'object' && 'lng' in point2 ? point2.lng : (Array.isArray(point2) ? point2[1] : 0);
        
        const midPoint = L.latLng(
          (lat1 + lat2) / 2,
          (lng1 + lng2) / 2
        );
        
        L.marker(midPoint, {
          icon: L.divIcon({
            className: 'measurement-label',
            html: `<div class="bg-blue-500 text-white text-xs px-2 py-1 rounded shadow">Distance: ${distanceInKm} km</div>`,
            iconSize: undefined
          })
        }).addTo(layer);
      }
    } 
    else if (mode === 'area' && points.length >= 3) {
      const area = calculateArea(points);
      const areaInHectares = (area / 10000).toFixed(2); // Convert to hectares
      
      // Draw the polygon
      const polygon = L.polygon(points, { 
        color: '#3b82f6', 
        weight: 2,
        fillOpacity: 0.2
      }).addTo(layer);
      
      // Add area label at centroid
      const centroidLat = points.reduce((sum, point) => {
        const lat = typeof point === 'object' && 'lat' in point ? point.lat : (Array.isArray(point) ? point[0] : 0);
        return sum + lat;
      }, 0) / points.length;
      const centroidLng = points.reduce((sum, point) => {
        const lng = typeof point === 'object' && 'lng' in point ? point.lng : (Array.isArray(point) ? point[1] : 0);
        return sum + lng;
      }, 0) / points.length;
      
      L.marker([centroidLat, centroidLng], {
        icon: L.divIcon({
          className: 'measurement-label',
          html: `<div class="bg-blue-500 text-white text-xs px-2 py-1 rounded shadow">Area: ${areaInHectares} ha</div>`,
          iconSize: undefined
        })
      }).addTo(layer);
    }
  };

  // Clear measurements
  const clearMeasurements = () => {
    if (measurementLayer) {
      measurementLayer.clearLayers();
    }
    setMeasurementState({ mode: null, points: [] });
  };

  // Toggle measurement mode
  const toggleMode = (mode: 'distance' | 'area') => {
    if (measurementState.mode === mode) {
      clearMeasurements();
    } else {
      setMeasurementState({ mode, points: [] });
    }
  };

  return (
    <div className="absolute top-[230px] left-4 z-1000 flex flex-col gap-1">
      <Button
        variant={measurementState.mode === 'distance' ? "default" : "outline"}
        size="sm"
        className="bg-background/80 backdrop-blur w-8 h-8 p-0"
        onClick={() => toggleMode('distance')}
        title="Measure distance"
      >
        <Ruler className="w-4 h-4" />
      </Button>
      <Button
        variant={measurementState.mode === 'area' ? "default" : "outline"}
        size="sm"
        className="bg-background/80 backdrop-blur w-8 h-8 p-0"
        onClick={() => toggleMode('area')}
        title="Measure area"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <rect x="2" y="2" width="20" height="20" rx="2" ry="2"/>
        </svg>
      </Button>
      {measurementState.mode && (
        <Button
          variant="outline"
          size="sm"
          className="bg-background/80 backdrop-blur w-8 h-8 p-0"
          onClick={clearMeasurements}
          title="Clear measurements"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </Button>
      )}
    </div>
  );
};

export { LandMap };