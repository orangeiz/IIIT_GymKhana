import express from 'express';
import { readDB, writeDB } from '../data/database.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authenticateToken);
router.use(requireAdmin);

// Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const db = await readDB();
    
    const pendingBookings = db.bookings.filter(b => b.status === 'pending').length;
    const approvedToday = db.bookings.filter(b => {
      const today = new Date().toISOString().split('T')[0];
      return b.status === 'approved' && b.createdAt.split('T')[0] === today;
    }).length;
    const totalRegistrations = db.eventRegistrations.length;
    const activeEvents = db.events.length;

    res.json({
      pendingRequests: pendingBookings,
      approvedToday,
      totalRegistrations,
      activeEvents
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all booking requests
router.get('/bookings', async (req, res) => {
  try {
    const db = await readDB();
    res.json(db.bookings);
  } catch (error) {
    console.error('Get admin bookings error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Approve booking
router.patch('/bookings/:id/approve', async (req, res) => {
  try {
    const db = await readDB();
    const booking = db.bookings.find(b => b.id === parseInt(req.params.id));

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Check for conflicts
    const conflictingBooking = db.bookings.find(
      b => b.id !== booking.id &&
           b.facility === booking.facility &&
           b.date === booking.date &&
           b.timeSlot === booking.timeSlot &&
           b.status === 'approved'
    );

    if (conflictingBooking) {
      return res.status(400).json({ error: 'This time slot is already booked' });
    }

    booking.status = 'approved';
    await writeDB(db);

    res.json({
      message: 'Booking approved successfully',
      booking
    });
  } catch (error) {
    console.error('Approve booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Reject booking
router.patch('/bookings/:id/reject', async (req, res) => {
  try {
    const db = await readDB();
    const booking = db.bookings.find(b => b.id === parseInt(req.params.id));

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    booking.status = 'rejected';
    await writeDB(db);

    res.json({
      message: 'Booking rejected successfully',
      booking
    });
  } catch (error) {
    console.error('Reject booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all event registrations
router.get('/registrations', async (req, res) => {
  try {
    const db = await readDB();
    const { limit } = req.query;
    
    let registrations = db.eventRegistrations;
    
    // Sort by most recent
    registrations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    if (limit) {
      registrations = registrations.slice(0, parseInt(limit));
    }

    res.json(registrations);
  } catch (error) {
    console.error('Get registrations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

