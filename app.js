const express = require('express');
const dbConnection = require('./config/connection');
const userRoutes = require('./routes/user');
const app = express();
const port = 3657;

// Import routes

// Middleware to parse JSON requests
app.use(express.json());
app.use('/api/v1/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Furniture API');
});

// Connect to MongoDB
dbConnection();

// Start the server
app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
});