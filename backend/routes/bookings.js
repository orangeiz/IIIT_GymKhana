import express from 'express';
import { readDB, writeDB } from '../data/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all bookings (for admin) or user's bookings
router.get('/', authenticateToken, async (req, res) => {
  try {
    const db = await readDB();
    
    if (req.user.isAdmin) {
      // Admin sees all bookings
      res.json(db.bookings);
    } else {
      // User sees only their bookings
      const userBookings = db.bookings.filter(b => b.userId === req.user.id);
      res.json(userBookings);
    }
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new booking
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, rollNumber, facility, date, timeSlot, purpose } = req.body;

    if (!name || !rollNumber || !facility || !date || !timeSlot || !purpose) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const db = await readDB();

    // Check for conflicts (same facility, date, and time slot)
    const conflictingBooking = db.bookings.find(
      b => b.facility === facility && 
           b.date === date && 
           b.timeSlot === timeSlot && 
           b.status === 'approved'
    );

    if (conflictingBooking) {
      return res.status(400).json({ error: 'This time slot is already booked' });
    }

    const newBooking = {
      id: db.bookings.length > 0 ? Math.max(...db.bookings.map(b => b.id)) + 1 : 1,
      userId: req.user.id,
      name,
      rollNumber,
      facility,
      date,
      timeSlot,
      purpose,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    db.bookings.push(newBooking);
    await writeDB(db);

    res.status(201).json({
      message: 'Booking request submitted successfully',
      booking: newBooking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get booking by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const db = await readDB();
    const booking = db.bookings.find(b => b.id === parseInt(req.params.id));

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Check if user has access
    if (!req.user.isAdmin && booking.userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(booking);
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

