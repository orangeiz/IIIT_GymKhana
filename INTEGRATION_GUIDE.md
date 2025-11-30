# Backend-Frontend Integration Guide

This guide explains how to set up and run the integrated Gymkhana Portal with backend and frontend.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Backend Setup

1. Navigate to the backend directory:
```bash
cd IIIT_GymKhana/backend
```

2. Install dependencies:
```bash
npm install
```

3. The `.env` file is already created with default values. If you need to modify it:
   - PORT: Backend server port (default: 5000)
   - FRONTEND_URL: Frontend URL for CORS (default: http://localhost:5173)
   - JWT_SECRET: Secret key for JWT tokens
   - JWT_EXPIRES_IN: Token expiration time (default: 7d)

4. Start the backend server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

## Frontend Setup

1. Navigate to the frontend directory:
```bash
cd IIIT_GymKhana/frontend
```

2. Install dependencies (if not already installed):
```bash
npm install
```

3. Create a `.env` file in the frontend directory (optional):
```
VITE_API_URL=http://localhost:5000/api
```

If you don't create this file, it will default to `http://localhost:5000/api`

4. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Default Admin Credentials

- **Email**: `admin@gymkhana.edu`
- **Password**: `admin123`

## Features Integrated

### ✅ Authentication
- Login/Register functionality
- JWT token-based authentication
- Protected routes
- User session management

### ✅ Facility Booking
- Create booking requests
- View booking status
- Admin approval/rejection

### ✅ Events Management
- View events by club (Sports, Technical, Cultural)
- Event registration
- Event details

### ✅ Admin Panel
- Dashboard with statistics
- Approve/Reject bookings
- View event registrations
- Manage bookings

### ✅ Club Pages
- Dynamic event loading from backend
- Team members information
- Club-specific data

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
- `GET /api/events` - Get all events
- `GET /api/events?club=sports|technical|cultural` - Get events by club
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

## Database

The backend uses a JSON file-based database stored in `backend/data/database.json`. This is automatically initialized on first run with default data including:
- Default admin user
- Sample bookings
- Sample events
- Team members for all clubs
- Event registrations

## Troubleshooting

### CORS Errors
If you encounter CORS errors, make sure:
1. Backend `.env` has the correct `FRONTEND_URL`
2. Both servers are running
3. Frontend is accessing the correct API URL

### Authentication Issues
- Clear browser localStorage if tokens are corrupted
- Make sure JWT_SECRET is set in backend `.env`
- Check that tokens are being sent in request headers

### Database Issues
- Delete `backend/data/database.json` to reset to default data
- Make sure the `backend/data` directory has write permissions

## Next Steps

1. **Production Deployment**: 
   - Replace JSON database with MongoDB/PostgreSQL
   - Set up proper environment variables
   - Configure HTTPS
   - Set up proper JWT secret

2. **Additional Features**:
   - Email notifications for booking approvals
   - Event management CRUD operations
   - User profile management
   - Payment integration for events

3. **Security Enhancements**:
   - Rate limiting
   - Input validation and sanitization
   - Password strength requirements
   - Email verification

