import { AlertTriangle, Clock, Ambulance, X } from 'lucide-react'

const Sidebar = ({ isOpen, onPopupOpen, onClose }) => {
  const menuItems = [
    {
      id: 'ambulance',
      title: 'Emergency Ambulance',
      icon: Ambulance,
      color: 'var(--color-success)',
      description: 'Request emergency medical services'
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
            return (
              <button
                key={item.id}
                className="sidebar-item"
                onClick={() => onPopupOpen(item.id)}
                style={{ '--delay': `${index * 0.1}s` }}
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