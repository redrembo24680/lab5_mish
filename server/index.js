import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import vacancyRoutes from './routes/vacancyRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root Route
app.get('/', (req, res) => {
    res.send('<h1>Lab 5 API Server is Running</h1><p>Use <code>/api/test</code> to check status.</p>');
});

// Basic Test Route
app.get('/api/test', (req, res) => {
    res.json({ 
        message: 'Server is running successfully!', 
        dbConnected: !!db,
        timestamp: new Date() 
    });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/vacancies', vacancyRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
