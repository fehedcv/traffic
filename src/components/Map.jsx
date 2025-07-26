// src/Map.jsx
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import 'leaflet.heat';

// Fix Leaflet icons for React
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl,
  shadowUrl: iconShadowUrl,
});

const Map = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const routingControlRef = useRef(null);
  const waypointsRef = useRef([]);
  const markersRef = useRef([]);
  const routeLayerRef = useRef(null);
  const heatmapLayerRef = useRef(null);

  useEffect(() => {
    if (!mapInstanceRef.current) {
      const map = L.map(mapRef.current).setView([10.99, 75.99], 13);
      mapInstanceRef.current = map;

      // Add OSM tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // Optional: Add traffic heatmap
      const heatPoints = [
        [10.994759, 75.980673, 0.6],
        [10.999145, 75.991659, 0.9],
        [11.001085, 76.004019, 0.4]
      ];
      heatmapLayerRef.current = L.heatLayer(heatPoints, { radius: 25 }).addTo(map);

      // Handle map click
      map.on('click', async (e) => {
        const latlng = e.latlng;

        if (waypointsRef.current.length < 2) {
          const marker = L.marker(latlng).addTo(map);
          markersRef.current.push(marker);
          waypointsRef.current.push(latlng);
        }

        if (waypointsRef.current.length === 2) {
          const [start, end] = waypointsRef.current;

          // Clean previous route
          if (routeLayerRef.current) {
            map.removeLayer(routeLayerRef.current);
          }

          const route = await fetchRoute(start, end);
          animateRoute(map, route);

          // Clean routing control if exists
          if (routingControlRef.current) {
            map.removeControl(routingControlRef.current);
          }
        }

        // Reset on 3rd click
        if (waypointsRef.current.length > 2) {
          markersRef.current.forEach((m) => m.remove());
          markersRef.current = [];
          waypointsRef.current = [];

          if (routeLayerRef.current) {
            map.removeLayer(routeLayerRef.current);
            routeLayerRef.current = null;
          }
        }
      });
    }
  }, []);

  // Fetch route using OSRM
  const fetchRoute = async (start, end) => {
    const url = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?geometries=geojson`;
    const res = await fetch(url);
    const data = await res.json();
    return data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
  };

  // Animate route like snake
  const animateRoute = (map, latlngs) => {
    let index = 0;
    const animatedLine = L.polyline([], { color: 'lime', weight: 5 }).addTo(map);
    routeLayerRef.current = animatedLine;

    const interval = setInterval(() => {
      if (index >= latlngs.length) {
        clearInterval(interval);
        return;
      }
      animatedLine.addLatLng(latlngs[index]);
      index++;
    }, 20); // speed
  };

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '610px', position: 'relative', zIndex: 1 }}
    />
  );
};

export default Map;
