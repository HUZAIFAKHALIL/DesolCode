// server.js

require('dotenv').config();
const express = require('express');
const { connectDB } = require('./config/db'); // Ensure this is correctly exported
const userRoutes = require('./routes/userRoutes');
const carRoutes = require('./routes/carRoutes');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8443;

// CORS Configuration
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
}));

app.use(express.json());

// Connect to MongoDB
connectDB();

// Serve static files from 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use("/api/cars", carRoutes);
app.use('/api/users', userRoutes);

// Root Route (Optional)
app.get('/', (req, res) => {
    res.send('Welcome to the Car API!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
