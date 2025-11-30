# IIIT Gymkhana Portal

A full-stack web application for managing the Gymkhana portal with facility bookings, event management, and club information.

## 🚀 Quick Start

### Backend Setup

```bash
cd backend
npm install
npm start
```

Backend runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

## 📋 Features

- **User Authentication**: Login/Register with JWT tokens
- **Facility Booking**: Book facilities (grounds, auditoriums, labs)
- **Event Management**: View and register for club events
- **Admin Panel**: Approve/reject bookings, view statistics
- **Club Pages**: Sports, Technical, and Cultural clubs with team information

## 🔑 Default Admin Credentials

- **Email**: `admin@gymkhana.edu`
- **Password**: `admin123`

## 📁 Project Structure

```
IIIT_GymKhana/
├── backend/
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── data/           # JSON database
│   └── server.js       # Express server
├── frontend/
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   └── services/   # API service layer
│   └── package.json
└── INTEGRATION_GUIDE.md # Detailed setup guide
```

## 🛠️ Tech Stack

### Backend
- Node.js + Express
- JWT Authentication
- JSON file-based database (easily migratable to MongoDB/PostgreSQL)

### Frontend
- React + TypeScript
- React Router
- Tailwind CSS
- Vite

## 📚 Documentation

See [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for detailed setup instructions and API documentation.

## 🔒 Security Notes

- Change JWT_SECRET in production
- Use a proper database (MongoDB/PostgreSQL) for production
- Implement rate limiting
- Add input validation and sanitization
- Use HTTPS in production

## 📝 License

This project is for educational purposes.

