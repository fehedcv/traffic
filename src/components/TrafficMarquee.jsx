import { AlertCircle, Clock, CheckCircle } from 'lucide-react'

const TrafficMarquee = () => {
  const trafficUpdates = [
    {
      id: 1,
      type: 'alert',
      icon: AlertCircle,
      message: 'Heavy traffic reported at Kottakkal Junction - Estimated delay: 15-20 minutes',
      time: '2 min ago'
    },
    {
      id: 2,
      type: 'update',
      icon: Clock,
      message: 'Road maintenance work on Medical College Road - Single lane traffic until 6 PM',
      time: '5 min ago'
    },
    {
      id: 3,
      type: 'resolved',
      icon: CheckCircle,
      message: 'Vehicle breakdown cleared on Railway Station Road - Traffic flow normalized',
      time: '8 min ago'
    },
    {
      id: 4,
      type: 'alert',
      icon: AlertCircle,
      message: 'Festival procession on Main Bazaar Road - Expect delays from 4 PM to 7 PM',
      time: '12 min ago'
    },
    {
      id: 5,
      type: 'update',
      icon: Clock,
      message: 'New traffic signal installed at Bus Stand junction - Please follow signals',
      time: '15 min ago'
    }
  ]

  return (
    <div className="traffic-marquee">
      <div className="marquee-header">
        <span className="live-indicator">LIVE</span>
        <span>Traffic Updates</span>
      </div>
      <div className="marquee-container">
        <div className="marquee-content">
          {trafficUpdates.map((update, index) => {
            const IconComponent = update.icon
            return (
              <div key={`${update.id}-${index}`} className={`marquee-item ${update.type}`}>
                <IconComponent size={16} />
                <span className="update-message">{update.message}</span>
                <span className="update-time">{update.time}</span>
              </div>
            )
          })}
          {/* Duplicate for seamless loop */}
          {trafficUpdates.map((update, index) => {
            const IconComponent = update.icon
            return (
              <div key={`${update.id}-${index}-dup`} className={`marquee-item ${update.type}`}>
                <IconComponent size={16} />
                <span className="update-message">{update.message}</span>
                <span className="update-time">{update.time}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TrafficMarquee