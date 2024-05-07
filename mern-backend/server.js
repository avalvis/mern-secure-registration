// server.js

/*
This JavaScript file, server.js, sets up an Express server with CORS and JSON parsing middleware, user routes, and a MongoDB connection.

The server.js file performs the following steps:

1. Imports the necessary modules: Express for the server, CORS for handling cross-origin requests, mongoose for interacting with MongoDB, and dotenv for loading environment variables.

2. Creates an Express application instance.

3. Loads the environment variables and sets the server port to the value of the 'PORT' environment variable, or 5000 if 'PORT' is not set.

4. Imports the user routes from './routes/users'.

5. Applies the CORS middleware to the Express application to enable handling of cross-origin requests.

6. Applies the JSON parsing middleware to the Express application to automatically parse JSON request bodies.

7. Applies the user routes to the Express application under the '/api/users' path.

8. Connects to the MongoDB database using the 'MY_DB_URI' environment variable. If the connection is successful, it logs a success message. If the connection fails, it logs the error.

9. Starts the Express server on the specified port and logs a message indicating that the server is running.

This file is typically the entry point of the application, and is responsible for setting up the server and starting it.
*/

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
