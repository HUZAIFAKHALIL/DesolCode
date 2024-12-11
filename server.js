require('dotenv').config();
const express = require('express');
const { connectDB } = require('./config/db'); // Ensure this is correctly exported
const userRoutes = require('./routes/userRoutes');
const carRoutes = require('./routes/carRoutes');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8443;

app.use(cors());

app.use(express.json());

connectDB();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/cars", carRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Car API!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
