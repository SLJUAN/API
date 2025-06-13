import express from 'express';
import router from './router';
import db from './config/db';

export const server = express();

// Middleware
server.use(express.json());

// Database connection
async function connectDB() {
    try {
        await db.authenticate();
        await db.sync();
        console.log('✅ Database connected');
    } catch (error) {
        console.error('❌ Database connection error:', error);
        process.exit(1);
    }
}

connectDB();

// Routes
server.use('/api', router);

// Health check endpoint
server.get('/health', async (req, res) => {
    try {
        await db.authenticate();
        res.status(200).json({ status: 'ok', db: 'connected' });
    } catch (error) {
        res.status(500).json({ status: 'error', db: 'disconnected', error: error.message });
    }
});