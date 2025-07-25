const express = require('express');
const router = express.Router();
const db = require('../db');
const { getDistanceFromLatLonInMeters } = require('../utils/geo');

// POST /report
router.post('/report', (req, res) => {
  const { latitude, longitude, type, place, description, timestamp } = req.body;

  const sql = `
    INSERT INTO incidents (latitude, longitude, type, place, description, timestamp)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [
    latitude,
    longitude,
    type,
    place || '',
    description || '',
    timestamp || new Date().toISOString()
  ];

  db.run(sql, values, function (err) {
    if (err) {
      console.error('Insert error:', err.message);
      return res.status(500).json({ error: 'Failed to report incident' });
    }
    res.status(201).json({ id: this.lastID, message: 'Incident reported' });
  });
});

// GET /incidents?type=accident&lat=..&lon=..&radius=..
router.get('/incidents', (req, res) => {
  const { type, lat, lon, radius } = req.query;

  db.all('SELECT * FROM incidents', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    let filtered = rows;

    if (type) {
      filtered = filtered.filter(row => row.type === type);
    }

    if (lat && lon && radius) {
      filtered = filtered.filter(row =>
        getDistanceFromLatLonInMeters(parseFloat(lat), parseFloat(lon), row.latitude, row.longitude) <= parseFloat(radius)
      );
    }

    res.json(filtered);
  });
});

// No PUT /resolve needed as resolved column is removed

module.exports = router;
