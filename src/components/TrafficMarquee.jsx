import { useEffect, useState } from 'react'
import { AlertCircle } from 'lucide-react'

const TrafficMarquee = () => {
  const [trafficUpdates, setTrafficUpdates] = useState([])
  const [counter, setCounter] = useState(0)

  const summaryUrl = 'https://4a1d5b339c98.ngrok-free.app/traffic-summary'

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        setCounter(prev => prev + 1)

        const res = await fetch(summaryUrl,{headers:{'ngrok-skip-browser-warning':'true'}})
        const data = await res.json()

        const updates = []

        for (const route in data) {
          const routeData = data[route]
          const level = routeData.level?.toLowerCase()

          if (level === 'high') {
            updates.push({
              id: Date.now() + Math.random(),
              type: 'alert',
              icon: AlertCircle,
              message: `Heavy traffic at ${route}`,
              time: 'Just now',
              route
            })
          }
        }

        setTrafficUpdates(updates)
      } catch (err) {
        console.error('Fetch error:', err)
      }
    }, 10000) // every 10 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="traffic-marquee">
      <div className="marquee-header">
        <span className="live-indicator">LIVE</span>
       
      </div>
      <div className="marquee-container">
        <div className="marquee-content">
          {trafficUpdates.length === 0 ? (
            <div className="marquee-item">No heavy traffic currently</div>
          ) : (
            trafficUpdates.map((update, index) => {
              const Icon = update.icon
              return (
                <div key={`${update.id}-${index}`} className={`marquee-item ${update.type}`}>
                  <Icon size={16} />
                  <span className="update-message">{update.message}</span>
                  <span className="update-time">{update.time}</span>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default TrafficMarquee
