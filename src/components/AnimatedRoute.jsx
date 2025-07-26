// components/AnimatedRoute.jsx
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.polyline.snakeanim'; // plugin extends L.Polyline

export default function AnimatedRoute({ coordinates }) {
    const map = useMap();

    useEffect(() => {
        const polyline = L.polyline(coordinates, {
            color: 'lime',
            weight: 5,
            snakingSpeed: 200,
        }).addTo(map);

        polyline.snakeIn();

        return () => {
            map.removeLayer(polyline);
        };
    }, [coordinates, map]);

    return null;
}
