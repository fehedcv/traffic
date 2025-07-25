// src/MapComponent.jsx
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Prevent multiple map initializations
    if (mapRef.current !== null) return;

    // Create map
    const map = L.map('map').setView([10.9997, 76.0046], 13);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Add a marker
    L.marker([10.9997, 76.0046]).addTo(map)
      .bindPopup('Kottakkal')
      .openPopup();

    mapRef.current = map;
  }, []);

  return <div id="map" style={{ height: '100vh', width: '100%' }} />;
};

export default MapComponent;