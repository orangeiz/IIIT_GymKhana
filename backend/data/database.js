import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '..', 'data');
const dbFile = path.join(dataDir, 'database.json');

// Hash password for default admin (password: admin123)
const defaultAdminPassword = bcrypt.hashSync('admin123', 10);

// Initialize database with default data
const defaultData = {
  users: [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "admin@gymkhana.edu",
      password: defaultAdminPassword,
      rollNumber: "ADMIN001",
      isAdmin: true,
      createdAt: new Date().toISOString()
    }
  ],
  bookings: [
    {
      id: 101,
      userId: 1,
      name: "Rahul Sharma",
      rollNumber: "21CS045",
      facility: "Main Cricket Ground",
      date: "2025-12-05",
      timeSlot: "2:00 PM - 5:00 PM",
      purpose: "Team Practice",
      status: "pending",
      createdAt: new Date().toISOString()
    },
    {
      id: 102,
      userId: 1,
      name: "Priya Verma",
      rollNumber: "22EC012",
      facility: "Auditorium",
      date: "2025-12-10",
      timeSlot: "6:00 PM - 9:00 PM",
      purpose: "Cultural Rehearsal",
      status: "approved",
      createdAt: new Date().toISOString()
    },
    {
      id: 103,
      userId: 1,
      name: "Amit Kumar",
      rollNumber: "21ME078",
      facility: "Indoor Stadium",
      date: "2025-11-30",
      timeSlot: "9:00 AM - 12:00 PM",
      purpose: "Badminton Tournament",
      status: "pending",
      createdAt: new Date().toISOString()
    }
  ],
  events: [
    {
      id: 1,
      club: "sports",
      title: "Inter-College Cricket Tournament 2025",
      date: "15 Dec 2025",
      venue: "Main Ground",
      registered: 120,
      description: "Annual inter-college cricket tournament",
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      club: "sports",
      title: "Annual Football League",
      date: "20 Nov 2025",
      venue: "Football Field",
      registered: 96,
      description: "Annual football league competition",
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      club: "sports",
      title: "Badminton Championship",
      date: "5 Nov 2025",
      venue: "Indoor Stadium",
      registered: 64,
      description: "Badminton championship tournament",
      createdAt: new Date().toISOString()
    },
    {
      id: 4,
      club: "technical",
      title: "TechFest 2026",
      date: "10–12 Jan 2026",
      venue: "Engineering Block",
      registered: 450,
      description: "Annual technical festival",
      createdAt: new Date().toISOString()
    },
    {
      id: 5,
      club: "technical",
      title: "National Level Hackathon",
      date: "28 Dec 2025",
      venue: "CSE Lab",
      registered: 280,
      description: "National level coding competition",
      createdAt: new Date().toISOString()
    },
    {
      id: 6,
      club: "technical",
      title: "Robotics Workshop",
      date: "18 Nov 2025",
      venue: "Mech Lab",
      registered: 85,
      description: "Hands-on robotics workshop",
      createdAt: new Date().toISOString()
    },
    {
      id: 7,
      club: "cultural",
      title: "UTSAV 2026 – Annual Cultural Fest",
      date: "20–22 Feb 2026",
      venue: "Open Air Theatre",
      registered: 1200,
      description: "Annual cultural festival",
      createdAt: new Date().toISOString()
    },
    {
      id: 8,
      club: "cultural",
      title: "Diwali Night",
      date: "8 Nov 2025",
      venue: "Auditorium",
      registered: 890,
      description: "Diwali celebration night",
      createdAt: new Date().toISOString()
    },
    {
      id: 9,
      club: "cultural",
      title: "Freshers Dance Competition",
      date: "12 Oct 2025",
      venue: "Main Stage",
      registered: 320,
      description: "Dance competition for freshers",
      createdAt: new Date().toISOString()
    }
  ],
  eventRegistrations: [
    {
      id: 201,
      eventId: 1,
      userId: 1,
      name: "Rohan Singh",
      rollNumber: "21CS101",
      eventTitle: "Inter-College Cricket Tournament",
      registeredOn: "2025-11-25",
      createdAt: new Date().toISOString()
    },
    {
      id: 202,
      eventId: 4,
      userId: 1,
      name: "Sneha Patel",
      rollNumber: "22IT056",
      eventTitle: "TechFest 2026 Hackathon",
      registeredOn: "2025-11-26",
      createdAt: new Date().toISOString()
    },
    {
      id: 203,
      eventId: 7,
      userId: 1,
      name: "Vikram Singh",
      rollNumber: "21EE089",
      eventTitle: "UTSAV 2026 - Dance Competition",
      registeredOn: "2025-11-28",
      createdAt: new Date().toISOString()
    },
    {
      id: 204,
      eventId: 5,
      userId: 1,
      name: "Anjali Mehta",
      rollNumber: "22CS034",
      eventTitle: "National Robotics Championship",
      registeredOn: "2025-11-27",
      createdAt: new Date().toISOString()
    }
  ],
  teamMembers: {
    sports: [
      { id: 1, name: "Arjun Kapoor", role: "President", year: "4th Year", sport: "Cricket Captain", phone: "+91 98765 43210", email: "arjun.sports@college.edu" },
      { id: 2, name: "Priya Sharma", role: "Vice President", year: "3rd Year", sport: "Football Captain", phone: "+91 87654 32109", email: "priya.sports@college.edu" },
      { id: 3, name: "Rohan Verma", role: "General Secretary", year: "3rd Year", sport: "Badminton Lead", phone: "+91 76543 21098", email: "rohan.sports@college.edu" },
      { id: 4, name: "Ananya Singh", role: "Joint Secretary", year: "2nd Year", sport: "Athletics Head", phone: "+91 65432 10987", email: "ananya.sports@college.edu" },
      { id: 5, name: "Vikram Rao", role: "Treasurer", year: "4th Year", sport: "Chess Captain", phone: "+91 54321 09876", email: "vikram.sports@college.edu" },
      { id: 6, name: "Neha Gupta", role: "Event Coordinator", year: "3rd Year", sport: "Volleyball Captain", phone: "+91 43210 98765", email: "neha.sports@college.edu" }
    ],
    technical: [
      { id: 1, name: "Aryan Patel", role: "President", year: "4th Year", domain: "Full Stack & AI Lead", phone: "+91 98765 11111", email: "aryan.tech@college.edu", github: "github.com/aryanpatel" },
      { id: 2, name: "Sanya Gupta", role: "Vice President", year: "3rd Year", domain: "Web Dev & UI/UX", phone: "+91 87654 22222", email: "sanya.tech@college.edu", github: "github.com/sanyagupta" },
      { id: 3, name: "Rahul Mehta", role: "General Secretary", year: "3rd Year", domain: "Competitive Programming", phone: "+91 76543 33333", email: "rahul.tech@college.edu", github: "github.com/rahulcp" },
      { id: 4, name: "Isha Singh", role: "Technical Head", year: "4th Year", domain: "Machine Learning", phone: "+91 65432 44444", email: "isha.tech@college.edu", github: "github.com/ishaml" },
      { id: 5, name: "Vivek Kumar", role: "Event Coordinator", year: "3rd Year", domain: "Cybersecurity", phone: "+91 54321 55555", email: "vivek.tech@college.edu", github: "github.com/vivekcyber" },
      { id: 6, name: "Pooja Sharma", role: "Design & Media Head", year: "2nd Year", domain: "Graphics & Video", phone: "+91 43210 66666", email: "pooja.tech@college.edu", github: "github.com/poojadesign" }
    ],
    cultural: [
      { id: 1, name: "Aditi Sharma", role: "President", year: "4th Year", domain: "Dance & Choreography", phone: "+91 98765 55555", email: "aditi.cultural@college.edu", instagram: "instagram.com/aditi_dance" },
      { id: 2, name: "Karan Malhotra", role: "Vice President", year: "3rd Year", domain: "Music & Singing", phone: "+91 87654 44444", email: "karan.cultural@college.edu", instagram: "instagram.com/karan_sings" },
      { id: 3, name: "Riya Kapoor", role: "General Secretary", year: "3rd Year", domain: "Drama & Theatre", phone: "+91 76543 33333", email: "riya.cultural@college.edu", instagram: "instagram.com/riya_drama" },
      { id: 4, name: "Arnav Singh", role: "Event Head", year: "4th Year", domain: "Fashion & Ramp Walk", phone: "+91 65432 22222", email: "arnav.cultural@college.edu", instagram: "instagram.com/arnav_fashion" },
      { id: 5, name: "Nisha Verma", role: "Creative Head", year: "2nd Year", domain: "Art & Photography", phone: "+91 54321 11111", email: "nisha.cultural@college.edu", instagram: "instagram.com/nisha_art" },
      { id: 6, name: "Siddhant Rao", role: "Media & PR Head", year: "3rd Year", domain: "Videography & Reels", phone: "+91 43210 99999", email: "siddhant.cultural@college.edu", instagram: "instagram.com/siddhant_reels" }
    ]
  }
};

// Database helper functions
export const readDB = async () => {
  try {
    await fs.mkdir(dataDir, { recursive: true });
    const data = await fs.readFile(dbFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, create it with default data
    await writeDB(defaultData);
    return defaultData;
  }
};

export const writeDB = async (data) => {
  try {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(dbFile, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing to database:', error);
    throw error;
  }
};

// Initialize database on first run
readDB().then(() => {
  console.log('📦 Database initialized');
}).catch(err => {
  console.error('Error initializing database:', err);
});

