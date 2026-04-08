import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../firebaseAdmin.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// POST /register
router.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        if (!db) return res.status(500).json({ message: 'Database not initialized' });

        // Check if user exists
        const userRef = db.collection('users').doc(email);
        const doc = await userRef.get();
        if (doc.exists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save user
        await userRef.set({
            email,
            password: hashedPassword,
            name: name || '',
            createdAt: new Date().toISOString()
        });

        // Generate JWT
        const token = jwt.sign({ email }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '1h' });

        res.status(201).json({ token, user: { email, name } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// POST /login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!db) return res.status(500).json({ message: 'Database not initialized' });

        const userRef = db.collection('users').doc(email);
        const doc = await userRef.get();
        if (!doc.exists) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const user = doc.data();
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '1h' });

        res.json({ token, user: { email: user.email, name: user.name } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// GET /profile
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        if (!db) return res.status(500).json({ message: 'Database not initialized' });

        const userRef = db.collection('users').doc(req.user.email);
        const doc = await userRef.get();
        
        if (!doc.exists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = doc.data();
        delete user.password; // Don't send password back

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
