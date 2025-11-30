import express from 'express';
import { readDB } from '../data/database.js';

const router = express.Router();

// Get team members for a club
router.get('/:club/team', async (req, res) => {
  try {
    const { club } = req.params;
    const db = await readDB();

    if (!['sports', 'technical', 'cultural'].includes(club)) {
      return res.status(400).json({ error: 'Invalid club name' });
    }

    const teamMembers = db.teamMembers[club] || [];
    res.json(teamMembers);
  } catch (error) {
    console.error('Get team members error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all clubs info
router.get('/', async (req, res) => {
  try {
    const db = await readDB();
    res.json({
      sports: {
        name: 'Sports Club',
        teamMembers: db.teamMembers.sports || []
      },
      technical: {
        name: 'Technical Club',
        teamMembers: db.teamMembers.technical || []
      },
      cultural: {
        name: 'Cultural Club',
        teamMembers: db.teamMembers.cultural || []
      }
    });
  } catch (error) {
    console.error('Get clubs error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

