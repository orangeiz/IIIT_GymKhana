# Gymkhana Backend API

Backend API server for IIIT Gymkhana Portal.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (or use the example):
```bash
PORT=5000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
```

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Bookings
- `GET /api/bookings` - Get bookings (requires auth)
- `POST /api/bookings` - Create booking (requires auth)
- `GET /api/bookings/:id` - Get booking by ID (requires auth)

### Events
- `GET /api/events` - Get all events (optional ?club=sports|technical|cultural)
- `GET /api/events/:id` - Get event by ID
- `POST /api/events/:id/register` - Register for event

### Clubs
- `GET /api/clubs` - Get all clubs info
- `GET /api/clubs/:club/team` - Get team members for a club

### Admin
- `GET /api/admin/stats` - Get dashboard stats (requires admin)
- `GET /api/admin/bookings` - Get all bookings (requires admin)
- `PATCH /api/admin/bookings/:id/approve` - Approve booking (requires admin)
- `PATCH /api/admin/bookings/:id/reject` - Reject booking (requires admin)
- `GET /api/admin/registrations` - Get event registrations (requires admin)

## Default Admin Credentials

- Email: `admin@gymkhana.edu`
- Password: `admin123`

## Database

The backend uses a JSON file-based database stored in `data/database.json`. This is initialized automatically on first run with default data.

