import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { readDB, writeDB } from '../data/database.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, rollNumber } = req.body;

    if (!name || !email || !password || !rollNumber) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const db = await readDB();
    
    // Check if user already exists
    const existingUser = db.users.find(u => u.email === email || u.rollNumber === rollNumber);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: db.users.length > 0 ? Math.max(...db.users.map(u => u.id)) + 1 : 1,
      name,
      email,
      password: hashedPassword,
      rollNumber,
      isAdmin: false,
      createdAt: new Date().toISOString()
    };

    db.users.push(newUser);
    await writeDB(db);

    // Generate token
    const jwtSecret = process.env.JWT_SECRET || 'gymkhana-secret-key-2024-change-in-production';
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, isAdmin: newUser.isAdmin },
      jwtSecret,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        rollNumber: newUser.rollNumber,
        isAdmin: newUser.isAdmin
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const db = await readDB();
    const user = db.users.find(u => u.email === email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password using bcrypt
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const jwtSecret = process.env.JWT_SECRET || 'gymkhana-secret-key-2024-change-in-production';
    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.isAdmin },
      jwtSecret,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        rollNumber: user.rollNumber,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided', code: 'NO_TOKEN' });
    }

    const jwtSecret = process.env.JWT_SECRET || 'gymkhana-secret-key-2024-change-in-production';
    const decoded = jwt.verify(token, jwtSecret);
    const db = await readDB();
    const user = db.users.find(u => u.id === decoded.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found', code: 'USER_NOT_FOUND' });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      rollNumber: user.rollNumber,
      isAdmin: user.isAdmin
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired. Please login again.', code: 'TOKEN_EXPIRED' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token. Please login again.', code: 'INVALID_TOKEN' });
    }
    return res.status(401).json({ error: 'Token verification failed', code: 'TOKEN_ERROR' });
  }
});

export default router;

