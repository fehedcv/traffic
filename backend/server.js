require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const incidentRoutes = require('./routes/incidentRoutes');

app.use(cors());
app.use(express.json());
app.use('/', incidentRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚦 Server running on http://localhost:${PORT}`);
});
