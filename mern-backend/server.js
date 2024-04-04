// server.js
// Import the Express library.
const express = require('express');
// Import CORS middleware
const cors = require('cors');
// Create an Express application instance
const app = express();
// Import mongoose to interact with MongoDB
const mongoose = require('mongoose');
// Load environment variables
require('dotenv').config();
const PORT = process.env.PORT || 5000;

const userRoutes = require('./routes/users');

// Apply CORS middleware to enable CORS requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Use the user routes
app.use('/api/users', userRoutes);

// MongoDB connection
mongoose.connect(process.env.MY_DB_URI)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));


// Tell the Express app to listen for incoming connections on a specified port (5000 by default)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
