import { useState } from 'react'
import { X, Send, MapPin, Clock, Phone } from 'lucide-react'

const Popup = ({ type, onClose }) => {
  const [formData, setFormData] = useState({})

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', { type, data: formData })
    // Here you would typically send the data to your backend
    alert('Report submitted successfully!')
    onClose()
  }

  const renderIncidentForm = () => (
    <form onSubmit={handleSubmit} className="popup-form">
      <div className="form-group">
        <label htmlFor="location">Incident Location</label>
        <div className="input-with-icon">
          <MapPin size={18} />
          <input
            type="text"
            id="location"
            placeholder="Enter exact location or landmark"
            onChange={(e) => handleInputChange('location', e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="incident-type">Incident Type</label>
        <select
          id="incident-type"
          onChange={(e) => handleInputChange('incidentType', e.target.value)}
          required
        >
          <option value="">Select incident type</option>
          <option value="accident">Vehicle Accident</option>
          <option value="breakdown">Vehicle Breakdown</option>
          <option value="road-block">Road Blockage</option>
          <option value="construction">Construction Work</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="severity">Severity Level</label>
        <select
          id="severity"
          onChange={(e) => handleInputChange('severity', e.target.value)}
          required
        >
          <option value="">Select severity</option>
          <option value="low">Low - Minor disruption</option>
          <option value="medium">Medium - Moderate disruption</option>
          <option value="high">High - Major disruption</option>
          <option value="critical">Critical - Emergency response needed</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Provide detailed description of the incident"
          rows="4"
          onChange={(e) => handleInputChange('description', e.target.value)}
          required
        ></textarea>
      </div>
      
      <button type="submit" className="submit-btn">
        <Send size={18} />
        Report Incident
      </button>
    </form>
  )

  const renderRecoveryForm = () => (
    <form onSubmit={handleSubmit} className="popup-form">
      <div className="form-group">
        <label htmlFor="area">Traffic Area</label>
        <div className="input-with-icon">
          <MapPin size={18} />
          <select
            id="area"
            onChange={(e) => handleInputChange('area', e.target.value)}
            required
          >
            <option value="">Select area</option>
            <option value="kottakkal-junction">Kottakkal Junction</option>
            <option value="medical-college">Medical College Road</option>
            <option value="railway-station">Railway Station Road</option>
            <option value="main-bazaar">Main Bazaar</option>
            <option value="bus-stand">Bus Stand Area</option>
          </select>
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="current-status">Current Traffic Status</label>
        <select
          id="current-status"
          onChange={(e) => handleInputChange('currentStatus', e.target.value)}
          required
        >
          <option value="">Select current status</option>
          <option value="blocked">Completely Blocked</option>
          <option value="heavy">Heavy Congestion</option>
          <option value="moderate">Moderate Congestion</option>
          <option value="clearing">Currently Clearing</option>
        </select>
      </div>
      
      <div className="estimated-time">
        <h4>Estimated Recovery Time</h4>
        <div className="time-options">
          <button type="button" className="time-option" onClick={() => handleInputChange('estimatedTime', '15-30')}>
            <Clock size={16} />
            15-30 min
          </button>
          <button type="button" className="time-option" onClick={() => handleInputChange('estimatedTime', '30-60')}>
            <Clock size={16} />
            30-60 min
          </button>
          <button type="button" className="time-option" onClick={() => handleInputChange('estimatedTime', '1-2')}>
            <Clock size={16} />
            1-2 hours
          </button>
          <button type="button" className="time-option" onClick={() => handleInputChange('estimatedTime', '2+')}>
            <Clock size={16} />
            2+ hours
          </button>
        </div>
      </div>
      
      <button type="submit" className="submit-btn">
        <Send size={18} />
        Update Recovery Time
      </button>
    </form>
  )

  const renderAmbulanceForm = () => (
    <form onSubmit={handleSubmit} className="popup-form emergency">
      <div className="emergency-header">
        <h3>Emergency Ambulance Request</h3>
        <p>For immediate emergency, call <strong>108</strong></p>
      </div>
      
      <div className="form-group">
        <label htmlFor="emergency-location">Emergency Location</label>
        <div className="input-with-icon">
          <MapPin size={18} />
          <input
            type="text"
            id="emergency-location"
            placeholder="Exact location of emergency"
            onChange={(e) => handleInputChange('location', e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="contact">Contact Number</label>
        <div className="input-with-icon">
          <Phone size={18} />
          <input
            type="tel"
            id="contact"
            placeholder="Your phone number"
            onChange={(e) => handleInputChange('contact', e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="emergency-type">Emergency Type</label>
        <select
          id="emergency-type"
          onChange={(e) => handleInputChange('emergencyType', e.target.value)}
          required
        >
          <option value="">Select emergency type</option>
          <option value="accident">Traffic Accident</option>
          <option value="medical">Medical Emergency</option>
          <option value="cardiac">Cardiac Emergency</option>
          <option value="trauma">Trauma/Injury</option>
          <option value="other">Other Emergency</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="patient-condition">Patient Condition</label>
        <textarea
          id="patient-condition"
          placeholder="Brief description of patient condition and symptoms"
          rows="3"
          onChange={(e) => handleInputChange('condition', e.target.value)}
          required
        ></textarea>
      </div>
      
      <button type="submit" className="submit-btn emergency-btn">
        <Send size={18} />
        Request Emergency Ambulance
      </button>
    </form>
  )

  const getPopupConfig = () => {
    switch (type) {
      case 'incident':
        return {
          title: 'Report Traffic Incident',
          content: renderIncidentForm(),
          className: 'incident'
        }
      case 'recovery':
        return {
          title: 'Traffic Recovery Time',
          content: renderRecoveryForm(),
          className: 'recovery'
        }
      case 'ambulance':
        return {
          title: 'Emergency Ambulance',
          content: renderAmbulanceForm(),
          className: 'ambulance'
        }
      default:
        return {
          title: 'Unknown',
          content: <div>Unknown popup type</div>,
          className: ''
        }
    }
  }

  const config = getPopupConfig()

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className={`popup ${config.className}`} onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h2>{config.title}</h2>
          <button className="popup-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="popup-content">
          {config.content}
        </div>
      </div>
    </div>
  )
}

export default Popup