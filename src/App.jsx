import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Map from './components/Map'
import Popup from './components/Popup'
import TrafficMarquee from './components/TrafficMarquee'
import './App.css'

function App() {
  const [activePopup, setActivePopup] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handlePopupOpen = (popupType) => {
    setActivePopup(popupType)
  }

  const handlePopupClose = () => {
    setActivePopup(null)
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Kottakkal Traffic Management System</h1>
          <button 
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <main className="app-main">
        <Sidebar 
          isOpen={sidebarOpen}
          onPopupOpen={handlePopupOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="main-content">
          <Map />
        </div>
      </main>

      <TrafficMarquee />

      {activePopup && (
        <Popup 
          type={activePopup}
          onClose={handlePopupClose}
        />
      )}
    </div>
  )
}

export default App