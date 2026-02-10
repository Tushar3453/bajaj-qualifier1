require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bfhlRoutes = require('./src/routes/bfhlRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow requests from anywhere
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/', bfhlRoutes);

// Root route for sanity check
app.get('/', (req, res) => {
    res.send("Chitkara Qualifier API is Running!");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});