"use client";

import React, { useEffect, useRef, useState } from "react";
import { Locate, MapPin, Loader2 } from "lucide-react";

interface MapPickerProps {
  lat: number | undefined;
  lng: number | undefined;
  onChange: (lat: number, lng: number) => void;
}

const DEFAULT_CENTER: [number, number] = [-6.9175, 107.6191]; // Bandung

export default function MapPicker({ lat, lng, onChange }: MapPickerProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  
  const [geoLoading, setGeoLoading] = useState(false);
  const [isLeafletLoaded, setIsLeafletLoaded] = useState(false);

  // Initialize and load Leaflet CSS/JS
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Load Leaflet CSS dynamically
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    link.id = "leaflet-css";
    if (!document.getElementById("leaflet-css")) {
      document.head.appendChild(link);
    }

    // Load Leaflet JS dynamically
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.async = true;
    script.id = "leaflet-js";

    const handleScriptLoad = () => {
      setIsLeafletLoaded(true);
    };

    if (!(window as any).L) {
      if (!document.getElementById("leaflet-js")) {
        document.body.appendChild(script);
      }
      script.onload = handleScriptLoad;
    } else {
      setIsLeafletLoaded(true);
    }

    return () => {
      // Clean up map instance on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!isLeafletLoaded || !mapContainerRef.current || mapInstanceRef.current) return;

    const L = (window as any).L;
    if (!L) return;

    try {
      const initialLat = lat ?? DEFAULT_CENTER[0];
      const initialLng = lng ?? DEFAULT_CENTER[1];

      // Setup custom marker icon
      const DefaultIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      L.Marker.prototype.options.icon = DefaultIcon;

      // Initialize map
      const map = L.map(mapContainerRef.current, {
        scrollWheelZoom: false
      }).setView([initialLat, initialLng], 13);
      
      mapInstanceRef.current = map;

      // Add CartoDB Voyager tiles
      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }).addTo(map);

      // Create a marker
      const marker = L.marker([initialLat, initialLng], {
        draggable: true
      }).addTo(map);
      
      markerRef.current = marker;

      // Handle marker drag event
      marker.on("dragend", (e: any) => {
        const position = e.target.getLatLng();
        onChange(position.lat, position.lng);
      });

      // Handle map click event (move marker and update coords)
      map.on("click", (e: any) => {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        onChange(lat, lng);
      });

    } catch (err) {
      console.error("Error setting up Leaflet MapPicker:", err);
    }
  }, [isLeafletLoaded, onChange]);

  // Sync prop changes back to the map/marker (if updated from inputs)
  useEffect(() => {
    if (!mapInstanceRef.current || !markerRef.current) return;
    
    const targetLat = lat ?? DEFAULT_CENTER[0];
    const targetLng = lng ?? DEFAULT_CENTER[1];
    
    const currentLatLng = markerRef.current.getLatLng();
    
    // Check if the change is significant to avoid infinite updates/jitter while dragging
    const isDifferent = 
      Math.abs(currentLatLng.lat - targetLat) > 0.00001 || 
      Math.abs(currentLatLng.lng - targetLng) > 0.00001;

    if (isDifferent) {
      markerRef.current.setLatLng([targetLat, targetLng]);
      mapInstanceRef.current.setView([targetLat, targetLng], mapInstanceRef.current.getZoom());
    }
  }, [lat, lng]);

  const handleGetCurrentLocation = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window === "undefined" || !navigator.geolocation) {
      alert("Browser Anda tidak mendukung deteksi lokasi (GPS).");
      return;
    }

    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onChange(latitude, longitude);
        setGeoLoading(false);
      },
      (error) => {
        console.error("Error fetching geolocation:", error);
        let errorMsg = "Gagal mendeteksi lokasi Anda.";
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = "Izin akses lokasi ditolak oleh browser. Harap aktifkan izin lokasi di pengaturan browser Anda.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMsg = "Informasi lokasi tidak tersedia.";
        } else if (error.code === error.TIMEOUT) {
          errorMsg = "Waktu permintaan lokasi habis.";
        }
        alert(errorMsg);
        setGeoLoading(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  return (
    <div className="space-y-2 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <span className="text-[11px] text-[#57534E] flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-[#166534]" />
          <span>Klik pada peta atau geser penanda merah untuk memindahkan lokasi.</span>
        </span>
        <button
          type="button"
          onClick={handleGetCurrentLocation}
          disabled={geoLoading}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F5F5EB] border border-[#D6D3D1] hover:border-[#A8A29E] disabled:opacity-50 text-xs font-semibold text-[#166534] rounded-[6px] transition-all hover:bg-[#EBEBD3] cursor-pointer animate-in fade-in"
        >
          {geoLoading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Mencari Lokasi...</span>
            </>
          ) : (
            <>
              <Locate className="w-3.5 h-3.5" />
              <span>Gunakan Lokasi Saat Ini</span>
            </>
          )}
        </button>
      </div>

      <div className="relative rounded-[12px] border border-[#D6D3D1] overflow-hidden bg-[#FAFAF5] shadow-inner" style={{ height: "260px", zIndex: 1 }}>
        <div ref={mapContainerRef} className="w-full h-full" />
        {!isLeafletLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#FAFAF5]/90 text-sm text-[#78716C] gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-[#166534]" />
            <span>Memuat peta interaktif...</span>
          </div>
        )}
      </div>
    </div>
  );
}
