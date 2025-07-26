// src/MapComponent.jsx
import { useEffect, useRef } from 'react';
function MapComponent() {
  return (
    <div style={{ width: '100%', height: '780px' }}>
      <iframe
        src="https://4a1d5b339c98.ngrok-free.app/"
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        style={{ border: 0, display: 'block' }}
        allowFullScreen
      />
    </div>
  );
}

export default MapComponent;