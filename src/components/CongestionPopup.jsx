import React, { useState } from 'react';
import { X, Download, Calendar, TrendingUp } from 'lucide-react';
import './CongestionPopup.css';

const CongestionPopup = ({ onClose }) => {
  const [selectedRoute, setSelectedRoute] = useState('all');

  const historicalData = [
    { date: '2025-07-20', route: 'Edarikode–Chankuvetty', congestionLevel: 78, time: '08:30 AM' },
    { date: '2025-07-18', route: 'Chankuvetty–Kottakkal', congestionLevel: 52, time: '10:15 AM' },
    { date: '2025-07-13', route: 'Kottakkal–Puthur', congestionLevel: 25, time: '12:25 AM' },
    { date: '2025-07-10', route: 'chankuvetty–Palathara', congestionLevel: 25, time: '12:25 AM' },
    { date: '2025-07-13', route: 'Mammalippadi–Edarikkode', congestionLevel: 25, time: '12:25 AM' },
    { date: '2025-07-09', route: 'Edarikode–Chankuvetty', congestionLevel: 85, time: '02:45 AM' },
    { date: '2025-06-28', route: 'Chankuvetty–Kottakkal', congestionLevel: 48, time: '07:25 AM' },
    { date: '2025-06-14', route: 'Kottakkal–Puthur', congestionLevel: 32, time: '05:40 AM' },
    { date: '2025-06-11', route: 'chankuvetty–Palathara', congestionLevel: 25, time: '12:25 AM' },
    { date: '2025-06-09', route: 'Mammalippadi–Edarikkode', congestionLevel: 25, time: '12:25 AM' },
    { date: '2025-06-07', route: 'Edarikode–Chankuvetty', congestionLevel: 67, time: '09:00 AM' },
    { date: '2025-05-25', route: 'Chankuvetty–Kottakkal', congestionLevel: 89, time: '11:10 AM' },
    { date: '2025-05-15', route: 'Kottakkal–Puthur', congestionLevel: 38, time: '12:35 PM' },
    { date: '2025-05-13', route: 'chankuvetty–Palathara', congestionLevel: 25, time: '12:25 AM' },
    { date: '2025-05-08', route: 'Mammalippadi–Edarikkode', congestionLevel: 25, time: '12:25 AM' },
  ];

  const routes = [...new Set(historicalData.map(item => item.route))];
  const filteredData = selectedRoute === 'all' ? historicalData : historicalData.filter(item => item.route === selectedRoute);

  const downloadCSV = () => {
    const headers = ['Date', 'Route', 'Congestion Level', 'Time'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(item => [
        item.date,
        `"${item.route}"`,
        item.congestionLevel,
        item.time
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `congestion-data-${selectedRoute}-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusClass = (level) => {
    if (level >= 70) return 'status-red';
    if (level >= 40) return 'status-yellow';
    return 'status-green';
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <div className="popup-header">
          <div className="popup-title">
            <TrendingUp size={24} />
            <h2>Historical Congestion Data</h2>
          </div>
          <button onClick={onClose} className="close-btn">
            <X size={24} />
          </button>
        </div>

        <div className="popup-content">
          <div className="popup-controls">
            <div className="popup-filter">
              <label>Filter by Route</label>
              <select value={selectedRoute} onChange={(e) => setSelectedRoute(e.target.value)}>
                <option value="all">All Routes</option>
                {routes.map(route => (
                  <option key={route} value={route}>{route}</option>
                ))}
              </select>
            </div>
            <button onClick={downloadCSV} className="download-btn">
              <Download size={20} /> Download CSV
            </button>
          </div>

          <div className="popup-stats">
            <div className="stat-box blue">
              <Calendar size={20} />
              <span>Total Records</span>
              <p>{filteredData.length}</p>
            </div>
            <div className="stat-box red">
              <TrendingUp size={20} />
              <span>Average Level</span>
              <p>{Math.round(filteredData.reduce((acc, item) => acc + item.congestionLevel, 0) / filteredData.length || 0)}%</p>
            </div>
            <div className="stat-box yellow">
              <Calendar size={20} />
              <span>Date Range</span>
              <p>{filteredData.length > 0 ? `${filteredData[filteredData.length - 1].date} - ${filteredData[0].date}` : 'N/A'}</p>
            </div>
          </div>

          <div className="popup-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Route</th>
                  <th>Time</th>
                  <th>Congestion Level</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, i) => (
                  <tr key={i}>
                    <td>{item.date}</td>
                    <td>{item.route}</td>
                    <td>{item.time}</td>
                    <td><span className={`status ${getStatusClass(item.congestionLevel)}`}>{item.congestionLevel}%</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CongestionPopup;