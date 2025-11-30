import express from 'express';
import { readDB, writeDB } from '../data/database.js';

const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
  try {
    const db = await readDB();
    const { club } = req.query;

    let events = db.events;
    if (club) {
      events = events.filter(e => e.club === club);
    }

    res.json(events);
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get event by ID
router.get('/:id', async (req, res) => {
  try {
    const db = await readDB();
    const event = db.events.find(e => e.id === parseInt(req.params.id));

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Register for event
router.post('/:id/register', async (req, res) => {
  try {
    const { name, rollNumber } = req.body;

    if (!name || !rollNumber) {
      return res.status(400).json({ error: 'Name and roll number are required' });
    }

    const db = await readDB();
    const event = db.events.find(e => e.id === parseInt(req.params.id));

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Check if already registered
    const existingRegistration = db.eventRegistrations.find(
      r => r.eventId === event.id && r.rollNumber === rollNumber
    );

    if (existingRegistration) {
      return res.status(400).json({ error: 'Already registered for this event' });
    }

    const newRegistration = {
      id: db.eventRegistrations.length > 0 
        ? Math.max(...db.eventRegistrations.map(r => r.id)) + 1 
        : 1,
      eventId: event.id,
      userId: null, // Can be linked to user if authenticated
      name,
      rollNumber,
      eventTitle: event.title,
      registeredOn: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };

    db.eventRegistrations.push(newRegistration);
    
    // Update event registration count
    event.registered = (event.registered || 0) + 1;
    
    await writeDB(db);

    res.status(201).json({
      message: 'Successfully registered for event',
      registration: newRegistration
    });
  } catch (error) {
    console.error('Event registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

