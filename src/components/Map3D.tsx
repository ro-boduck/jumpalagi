'use client';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useLanguage } from '@/contexts/LanguageContext';
import { Plus, Minus, RotateCw, Navigation, ExternalLink, AlertTriangle } from 'lucide-react';

const DICT = {
  ID: {
    fallbackTitle: 'KONFIGURASI PETA 3D DIBUTUHKAN',
    fallbackDesc: 'Peta 3D interaktif memerlukan Mapbox Access Token. Silakan tambahkan token Anda pada file `.env.local` dengan kunci:',
    fallbackBtn: 'BUKA GOOGLE MAPS SEBAGAI ALTERNATIF',
    fallbackHint: 'Dapatkan token gratis di mapbox.com',
    resetView: 'Reset Kamera',
    autoRotateOn: 'Auto-Putar: Aktif',
    autoRotateOff: 'Auto-Putar: Nonaktif',
    zoomIn: 'Perbesar',
    zoomOut: 'Perkecil',
    viewInGoogleMaps: 'Buka di Google Maps',
    hqTitle: 'MARKAS JUMPA LAGI',
    hqSubtitle: 'Kampus Bukit Jimbaran'
  },
  EN: {
    fallbackTitle: '3D MAP CONFIGURATION REQUIRED',
    fallbackDesc: 'The interactive 3D map requires a Mapbox Access Token. Please add your token to the `.env.local` file with the key:',
    fallbackBtn: 'OPEN GOOGLE MAPS AS ALTERNATIVE',
    fallbackHint: 'Get a free token at mapbox.com',
    resetView: 'Reset Camera',
    autoRotateOn: 'Auto-Rotate: ON',
    autoRotateOff: 'Auto-Rotate: OFF',
    zoomIn: 'Zoom In',
    zoomOut: 'Zoom Out',
    viewInGoogleMaps: 'View on Google Maps',
    hqTitle: 'JUMPA LAGI HQ',
    hqSubtitle: 'Bukit Jimbaran Campus'
  }
};

const COORDS: [number, number] = [115.162450, -8.799150]; // [lng, lat]
const GOOGLE_MAPS_LINK = "https://maps.google.com/?q=-8.799150,115.162450";

export default function Map3D() {
  const { lang } = useLanguage();
  const t = DICT[lang];

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  
  const [mapboxToken, setMapboxToken] = useState<string | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isRotating, setIsRotating] = useState(true);

  // Retrieve Mapbox token on mount
  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    if (token) {
      setMapboxToken(token);
      mapboxgl.accessToken = token;
    }
  }, []);

  // Initialize Mapbox map
  useEffect(() => {
    if (!mapboxToken || !mapContainerRef.current || mapRef.current) return;

    try {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: COORDS,
        zoom: 16.7,
        pitch: 60,
        bearing: -15,
        antialias: true,
      });

      mapRef.current = map;

      // Handle map loading
      map.on('style.load', () => {
        setIsMapLoaded(true);

        // Add 3D building extrusion layer
        const layers = map.getStyle().layers;
        const labelLayerId = layers?.find(
          (layer) => layer.type === 'symbol' && layer.layout && 'text-field' in layer.layout
        )?.id;

        map.addLayer(
          {
            id: 'add-3d-buildings',
            source: 'composite',
            'source-layer': 'building',
            filter: ['==', 'extrude', 'true'],
            type: 'fill-extrusion',
            minzoom: 15,
            paint: {
              'fill-extrusion-color': '#EAE8E4', // Classic Google Maps building color (neutral warm gray/off-white)
              'fill-extrusion-height': [
                'interpolate',
                ['linear'],
                ['zoom'],
                15,
                0,
                15.05,
                ['get', 'height']
              ],
              'fill-extrusion-base': [
                'interpolate',
                ['linear'],
                ['zoom'],
                15,
                0,
                15.05,
                ['get', 'min_height']
              ],
              'fill-extrusion-opacity': 0.65
            }
          },
          labelLayerId
        );
      });

      // Custom Neobrutalist Popup content (VISIT US linked directly to Google Maps)
      const popup = new mapboxgl.Popup({ 
        offset: 35, 
        closeButton: false,
        closeOnClick: false,
        className: 'neobrutalist-mapbox-popup'
      }).setHTML(`
        <a href="${GOOGLE_MAPS_LINK}" target="_blank" rel="noopener noreferrer" class="block px-3 py-1.5 border-2 border-[#111827] bg-accent text-[#111827] font-black text-[10px] uppercase tracking-widest shadow-[3px_3px_0_0_#111827] hover:bg-[#1D699B] hover:text-white transition-colors duration-200 text-center w-24">
          VISIT US
        </a>
      `);

      // Create Custom Neobrutalist SVG Pin Marker
      const markerEl = document.createElement('div');
      markerEl.className = 'custom-neobrutalist-svg-marker';
      markerEl.innerHTML = `
        <div class="relative cursor-pointer select-none" style="filter: drop-shadow(2.5px 2.5px 0px #111827); width: 38px; height: 38px;">
          <!-- Teardrop SVG Pin -->
          <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="#E7AF36" stroke="#111827" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="marker-pin-svg transition-all duration-200">
            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3" fill="#111827"/>
          </svg>
        </div>
      `;

      // Create Marker (without adding popup immediately)
      const marker = new mapboxgl.Marker({ element: markerEl })
        .setLngLat(COORDS)
        .addTo(map);

      markerRef.current = marker;

      // Click pin redirects directly to Google Maps
      markerEl.addEventListener('click', () => {
        window.open(GOOGLE_MAPS_LINK, '_blank', 'noopener,noreferrer');
      });

      // Handle hover trigger for showing/hiding popup
      let isHovering = false;

      const showPopup = () => {
        if (!popup.isOpen()) {
          popup.setLngLat(COORDS).addTo(map);
        }
      };

      const hidePopup = () => {
        setTimeout(() => {
          if (!isHovering) {
            popup.remove();
          }
        }, 150);
      };

      markerEl.addEventListener('mouseenter', () => {
        isHovering = true;
        showPopup();
      });

      markerEl.addEventListener('mouseleave', () => {
        isHovering = false;
        hidePopup();
      });

      // Keep popup open when hovering inside the popup itself
      popup.on('open', () => {
        const popupEl = popup.getElement();
        if (popupEl) {
          popupEl.addEventListener('mouseenter', () => {
            isHovering = true;
          });
          popupEl.addEventListener('mouseleave', () => {
            isHovering = false;
            hidePopup();
          });
        }
      });

      // Disable rotation if user interacts
      const stopRotation = () => {
        setIsRotating(false);
      };

      map.on('dragstart', stopRotation);
      map.on('zoomstart', stopRotation);
      map.on('pitchstart', stopRotation);
      map.on('touchstart', stopRotation);

    } catch (e) {
      console.error("Failed to initialize Mapbox Map:", e);
    }

    // Cleanup on unmount
    return () => {
      if (markerRef.current) markerRef.current.remove();
      if (mapRef.current) mapRef.current.remove();
      mapRef.current = null;
    };
  }, [mapboxToken, t.hqTitle, t.hqSubtitle, t.viewInGoogleMaps]);

  // Handle Cinematic Auto-Rotation animation loop
  useEffect(() => {
    if (!isMapLoaded || !mapRef.current || !isRotating) return;

    let frameId: number;
    
    const rotate = () => {
      if (!mapRef.current || !isRotating) return;
      const currentBearing = mapRef.current.getBearing();
      mapRef.current.setBearing((currentBearing + 0.018) % 360);
      frameId = requestAnimationFrame(rotate);
    };

    frameId = requestAnimationFrame(rotate);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isMapLoaded, isRotating]);

  // Interaction handlers
  const handleZoomIn = () => {
    if (!mapRef.current) return;
    mapRef.current.zoomIn();
    setIsRotating(false);
  };

  const handleZoomOut = () => {
    if (!mapRef.current) return;
    mapRef.current.zoomOut();
    setIsRotating(false);
  };

  const handleReset = () => {
    if (!mapRef.current) return;
    mapRef.current.flyTo({
      center: COORDS,
      zoom: 16.7,
      pitch: 60,
      bearing: -15,
      essential: true
    });
    // Auto-open marker popup just in case it closed
    if (markerRef.current) {
      const popup = markerRef.current.getPopup();
      if (popup && !popup.isOpen()) {
        markerRef.current.togglePopup();
      }
    }
  };

  const toggleRotation = () => {
    setIsRotating(!isRotating);
  };

  // If Mapbox token is not configured, show a beautiful fallback
  if (!mapboxToken) {
    return (
      <div className="w-full h-full border-2 border-[#111827] bg-[#F9F6EE] p-6 md:p-12 flex flex-col justify-between items-center text-center relative shadow-[8px_8px_0_0_#111827] min-h-[400px]">
        <div className="flex-1 flex flex-col justify-center items-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-accent border-2 border-[#111827] flex items-center justify-center shadow-[4px_4px_0_0_#111827] mb-6">
            <AlertTriangle className="w-8 h-8 text-[#111827]" />
          </div>
          <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-[#111827] mb-4">
            {t.fallbackTitle}
          </h3>
          <p className="text-xs md:text-sm font-bold uppercase tracking-widest leading-relaxed text-[#111827]/80 mb-6">
            {t.fallbackDesc}
          </p>
          <code className="block w-full p-3 bg-white border-2 border-dashed border-[#111827] text-xs font-mono font-bold tracking-tight text-primary select-all break-all shadow-[2px_2px_0_0_#111827] mb-4">
            NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_token
          </code>
          <span className="text-[10px] uppercase tracking-widest font-black text-accent mb-6">
            {t.fallbackHint}
          </span>
        </div>

        <a
          href={GOOGLE_MAPS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto flex items-center justify-center gap-2 py-4 px-8 border-2 border-[#111827] bg-accent text-[#111827] font-black tracking-widest text-xs md:text-sm shadow-[4px_4px_0_0_#111827] hover:-translate-x-1 hover:-translate-y-1 active:scale-[0.98] transition-all duration-200"
        >
          {t.fallbackBtn}
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    );
  }

  return (
    <div className="w-full h-full border-2 border-[#111827] overflow-hidden relative shadow-[8px_8px_0_0_#111827]">
      {/* Mapbox container */}
      <div ref={mapContainerRef} className="w-full h-full absolute inset-0" />

      {/* Styled Override for Mapbox Popups to make them Neobrutalist & Hide Watermarks & Fix Jitter */}
      <style dangerouslySetInnerHTML={{ __html: `
        .neobrutalist-mapbox-popup .mapboxgl-popup-content {
          background: none !important;
          box-shadow: none !important;
          padding: 0 !important;
          border-radius: 0 !important;
        }
        .neobrutalist-mapbox-popup .mapboxgl-popup-tip {
          display: none !important;
        }
        .mapboxgl-ctrl-logo {
          display: none !important;
        }
        .mapboxgl-ctrl-attrib {
          display: none !important;
        }
        .mapboxgl-marker {
          will-change: transform !important;
          backface-visibility: hidden !important;
          -webkit-backface-visibility: hidden !important;
          transform-style: preserve-3d !important;
        }
        @keyframes custom-marker-bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .custom-neobrutalist-svg-marker:hover .marker-pin-svg {
          animation: custom-marker-bounce 0.55s ease-in-out infinite;
        }
      ` }} />

      {/* Control Overlay Panels - Top Right & Symbol Only */}
      {isMapLoaded && (
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end">
          {/* Zoom Buttons Group */}
          <div className="flex flex-col border-2 border-[#111827] bg-[#FEFCFF] shadow-[2px_2px_0_0_#111827]">
            <button
              onClick={handleZoomIn}
              className="w-8 h-8 flex items-center justify-center border-b-2 border-[#111827] hover:bg-accent/20 active:scale-90 transition-all text-[#111827]"
              title={t.zoomIn}
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="w-8 h-8 flex items-center justify-center hover:bg-accent/20 active:scale-90 transition-all text-[#111827]"
              title={t.zoomOut}
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>

          {/* Reset Camera Button */}
          <button
            onClick={handleReset}
            className="w-8 h-8 flex items-center justify-center border-2 border-[#111827] bg-[#FEFCFF] text-[#111827] shadow-[2px_2px_0_0_#111827] hover:-translate-x-0.5 hover:-translate-y-0.5 active:scale-95 transition-all duration-150"
            title={t.resetView}
          >
            <Navigation className="w-4 h-4 rotate-45" />
          </button>

          {/* Auto Rotation Button */}
          <button
            onClick={toggleRotation}
            className={`w-8 h-8 flex items-center justify-center border-2 border-[#111827] shadow-[2px_2px_0_0_#111827] hover:-translate-x-0.5 hover:-translate-y-0.5 active:scale-95 transition-all duration-150 ${
              isRotating ? 'bg-accent text-[#111827]' : 'bg-[#FEFCFF] text-[#111827]'
            }`}
            title={isRotating ? t.autoRotateOff : t.autoRotateOn}
          >
            <RotateCw className={`w-4 h-4 ${isRotating ? 'animate-spin' : ''}`} />
          </button>
        </div>
      )}
    </div>
  );
}
