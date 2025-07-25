import { MapPin, Navigation } from 'lucide-react'

const Map = () => {
  const trafficPoints = [
    { id: 1, name: 'Kottakkal Junction', status: 'heavy', x: '45%', y: '30%' },
    { id: 2, name: 'Medical College Road', status: 'moderate', x: '65%', y: '50%' },
    { id: 3, name: 'Railway Station Road', status: 'light', x: '30%', y: '70%' },
    { id: 4, name: 'Main Bazaar', status: 'heavy', x: '55%', y: '45%' },
    { id: 5, name: 'Bus Stand Area', status: 'moderate', x: '40%', y: '55%' }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'heavy': return 'var(--color-error)'
      case 'moderate': return 'var(--color-warning)'
      case 'light': return 'var(--color-success)'
      default: return 'var(--color-primary)'
    }
  }

  return (
    <div className="map-container">
      <div className="map-header">
        <h2>Kottakkal Traffic Overview</h2>
        <div className="map-controls">
          <button className="map-btn">
            <Navigation size={16} />
            Navigate
          </button>
        </div>
      </div>
      
      <div className="map-area">
        <div className="map-background">
          <div className="map-grid"></div>
          <div className="area-label main">Kottakkal Town Center</div>
          <div className="area-label secondary">Medical College</div>
          <div className="area-label secondary">Railway Station</div>
          
          {trafficPoints.map((point) => (
            <div
              key={point.id}
              className="traffic-point"
              style={{
                left: point.x,
                top: point.y,
                '--point-color': getStatusColor(point.status)
              }}
            >
              <MapPin size={20} />
              <div className="traffic-tooltip">
                <h4>{point.name}</h4>
                <span className={`status ${point.status}`}>
                  {point.status.charAt(0).toUpperCase() + point.status.slice(1)} Traffic
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="map-legend">
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: 'var(--color-success)' }}></div>
          <span>Light Traffic</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: 'var(--color-warning)' }}></div>
          <span>Moderate Traffic</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: 'var(--color-error)' }}></div>
          <span>Heavy Traffic</span>
        </div>
      </div>
    </div>
  )
}

export default Map