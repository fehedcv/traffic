import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Sidebar from './components/Sidebar'
import Map from './components/Map'
import Popup from './components/Popup'
import TrafficMarquee from './components/TrafficMarquee'
import Dashboard from './components/Dashboard'

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
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="header-content">
            <button
              className="menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <div className="title-wrapper">
              <h1 className="app-title">Kottakkal Traffic Monitoring System</h1>
            </div>
          </div>
        </header>

        <main className="app-main">
          <Sidebar
            isOpen={sidebarOpen}
            onPopupOpen={handlePopupOpen}
            onClose={() => setSidebarOpen(false)}
          />

          <div className="main-content">
            <Routes>
              <Route path="/" element={<Map />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </main>

        <TrafficMarquee />

        {activePopup && (
          <Popup type={activePopup} onClose={handlePopupClose} />
        )}
      </div>
    </Router>
  )
}

export default App