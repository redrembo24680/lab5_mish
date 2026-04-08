import express from 'express';
import { db } from '../firebaseAdmin.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// GET /api/vacancies - Fetch all vacancies
router.get('/', async (req, res) => {
    try {
        if (!db) return res.status(500).json({ message: 'Database not initialized' });

        const snapshot = await db.collection('vacancies').get();
        const vacancies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(vacancies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching vacancies' });
    }
});

// POST /api/vacancies - Create a vacancy (Protected)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, company, location, type, salary, description } = req.body;

        if (!title || !company) {
            return res.status(400).json({ message: 'Title and Company are required' });
        }

        if (!db) return res.status(500).json({ message: 'Database not initialized' });

        const newVacancy = {
            title,
            company,
            location: location || 'Remote',
            type: type || 'Full-time',
            salary: salary || 'Negotiable',
            description: description || '',
            postedBy: req.user.email,
            createdAt: new Date().toISOString()
        };

        const docRef = await db.collection('vacancies').add(newVacancy);
        res.status(201).json({ id: docRef.id, ...newVacancy });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating vacancy' });
    }
});

export default router;
