// Fix for Windows Node.js MongoDB Atlas DNS SRV resolution issue
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { autoSeedIfEmpty } = require('./controllers/foodController');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (origin.indexOf('localhost') !== -1 || origin.indexOf('127.0.0.1') !== -1) {
            return callback(null, true);
        }
        return callback(null, true); // Fallback to allow all for local dev
    },
    credentials: true
}));
app.use(express.json());

// DB Connection + auto-seed
mongoose.set('strictQuery', false);
mongoose.set('bufferCommands', false); // Disable buffering
mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
    .then(async () => {
        console.log('✓ MongoDB Connected Successfully');
        await autoSeedIfEmpty();
    })
    .catch(err => {
        console.error('✗ MongoDB Connection Error Details:', err);
    });

// Health check
app.get('/', (req, res) => {
    res.json({ status: 'SpicyWorld API is running 🌶', version: '1.0.0' });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/foods', require('./routes/foodRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`✓ SpicyWorld server running on port ${PORT}`);
});
