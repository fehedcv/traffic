import React, { useState, useEffect } from 'react';
import CongestionPopup from './CongestionPopup';
import './dashboard.css';

const Dashboard = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://4a1d5b339c98.ngrok-free.app/traffic-summary',{headers:{'ngrok-skip-browser-warning':'true'}});
        const data = await response.json();
        const parsed = Object.entries(data).map(([routeName, info], index) => ({
          id: index + 1,
          routeName,
          congestionLevel: info.count,
          status: info.level,
          lastUpdated: info.last_updated,
        }));
        setRoutes(parsed);
      } catch (err) {
        console.error('Failed to fetch traffic data', err);
      }
      setLoading(false);
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    if (status === 'high') return 'red';
    if (status === 'moderate') return 'orange';
    return 'green';
  };

  return (
    <div className="dashboard">
      <div className="header">
        <h1>Traffic Congestion Dashboard</h1>
        <p>Real-time traffic monitoring and analysis</p>
        <button onClick={() => setShowPopup(true)}>Past Data</button>
      </div>

      <div className="stats">
        <div className="card">
          <h3>Active Routes</h3>
          <p>{routes.length}</p>
        </div>
        <div className="card">
          <h3>High Congestion</h3>
          <p>{routes.filter(route => route.status === 'high').length}</p>
        </div>
        <div className="card">
          <h3>Average Level</h3>
          <p>
            {Math.round(routes.reduce((acc, r) => acc + r.congestionLevel, 0) / (routes.length || 1))}%
          </p>
        </div>
      </div>

      {loading ? (
        <p className="loading">Loading traffic data...</p>
      ) : (
        <div className="grid">
          {routes.map(route => (
            <div key={route.id} className="route-card">
              <h3>{route.routeName}</h3>
              <div className="info">
                <span style={{ color: getStatusColor(route.status), fontWeight: 'bold' }}>
                  {route.congestionLevel*4}%
                </span>
                <span className={`status ${route.status}`}>{route.status}</span>
              </div>
              <div className="bar">
                <div
                  className="progress"
                  style={{
                    width: `${route.congestionLevel*4}%`,
                    backgroundColor: getStatusColor(route.status)
                  }}
                ></div>
              </div>
              <p className="time">Last updated: {route.lastUpdated}</p>
            </div>
          ))}
        </div>
      )}

      {showPopup && <CongestionPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default Dashboard;