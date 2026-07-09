"use client";

import React, { useEffect, useRef } from "react";

interface ProductMapProps {
  lat: number;
  lng: number;
  companyName: string;
}

export default function ProductMap({ lat, lng, companyName }: ProductMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Avoid running on server side
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
    
    const initializeMap = () => {
      const L = (window as any).L;
      if (!L || !mapContainerRef.current) return;

      try {
        // Clean up previous map if it exists
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }

        // Initialize map centering on lat, lng
        const map = L.map(mapContainerRef.current, {
          scrollWheelZoom: false
        }).setView([lat, lng], 13);
        
        mapInstanceRef.current = map;

        // Add CartoDB Voyager tiles (Modern & Clean)
        L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }).addTo(map);

        // Define a custom marker icon to avoid the default Leaflet asset path resolution issue
        const DefaultIcon = L.icon({
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });
        L.Marker.prototype.options.icon = DefaultIcon;

        // Add Marker
        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(`<b>${companyName}</b><br />Lokasi Produksi / Pabrik`)
          .openPopup();
      } catch (err) {
        console.error("Error initializing Leaflet map:", err);
      }
    };

    if (!(window as any).L) {
      if (!document.getElementById("leaflet-js")) {
        document.body.appendChild(script);
      }
      script.onload = () => {
        initializeMap();
      };
    } else {
      // Leaflet already loaded, initialize directly
      initializeMap();
    }

    return () => {
      // Cleanup map instance on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng, companyName]);

  return (
    <div 
      ref={mapContainerRef} 
      className="w-full h-80 rounded-[12px] border border-[#D6D3D1] overflow-hidden bg-[#FAFAF5]" 
      style={{ minHeight: "320px", zIndex: 1 }}
    />
  );
}
