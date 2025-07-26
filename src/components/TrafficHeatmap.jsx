// components/TrafficHeatmap.jsx
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';

export default function TrafficHeatmap({ points }) {
    const map = useMap();

    useEffect(() => {
        const heatLayer = L.heatLayer(points, {
            radius: 25,
            blur: 15,
            maxZoom: 17,
            gradient: {
                0.2: 'green',
                0.5: 'orange',
                0.8: 'red'
            }
        }).addTo(map);

        return () => {
            map.removeLayer(heatLayer);
        };
    }, [points, map]);

    return null;
}
