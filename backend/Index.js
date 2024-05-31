import express from 'express';
import cors from 'cors';
import pool from './conexion.db.js';

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Start server
app.listen(3001, () => {
    console.log('Server running on port 3001');
});

// Register endpoint
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    try {
        const sql = 'INSERT INTO user (nombre, correo, contraseña) VALUES (?, ?, ?)';
        const [result] = await pool.execute(sql, [name, email, password]);

        res.status(201).json({ message: 'se regustro correctamente' });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


