import { Link } from 'react-router-dom'
import { AlertTriangle, Ambulance, X } from 'lucide-react'

const Sidebar = ({ isOpen, onPopupOpen, onClose }) => {
  const menuItems = [
    {
      id: 'ambulance',
      title: 'Emergency Ambulance',
      icon: Ambulance,
      color: 'var(--color-success)',
      description: 'Request emergency medical services',
      actionType: 'popup'
    },
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: AlertTriangle,
      color: 'var(--color-warning)',
      description: 'View traffic dashboard',
      to: '/dashboard',
      actionType: 'link'
    }
  ]

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Quick Actions</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon
            const delayStyle = { '--delay': `${index * 0.1}s` }

            if (item.actionType === 'link') {
              return (
                <Link
                  key={item.id}
                  to={item.to}
                  className="sidebar-item"
                  style={delayStyle}
                  onClick={onClose}
                >
                  <div className="sidebar-icon" style={{ color: item.color }}>
                    <IconComponent size={24} />
                  </div>
                  <div className="sidebar-content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </Link>
              )
            }

            return (
              <button
                key={item.id}
                className="sidebar-item"
                onClick={() => onPopupOpen(item.id)}
                style={delayStyle}
              >
                <div className="sidebar-icon" style={{ color: item.color }}>
                  <IconComponent size={24} />
                </div>
                <div className="sidebar-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </button>
            )
          })}
        </nav>
      </aside>
    </>
  )
}

export default Sidebar