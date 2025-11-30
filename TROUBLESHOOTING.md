# Troubleshooting Guide

## Port 5000 Already in Use Error

If you see the error:
```
Error: listen EADDRINUSE: address already in use :::5000
```

### Solution 1: Kill the process using the script
```bash
cd backend
npm run kill-port
```

### Solution 2: Kill manually
```bash
# Find the process
lsof -ti:5000

# Kill it (replace PID with the number from above)
kill -9 <PID>

# Or in one command:
lsof -ti:5000 | xargs kill -9
```

### Solution 3: Use a different port
Edit `backend/.env` and change:
```
PORT=5001
```

Then update `frontend/src/services/api.ts`:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
```

### Solution 4: Restart the server
```bash
cd backend
npm run restart
```

## Common Issues

### 1. Backend won't start
- Check if port 5000 is free: `lsof -ti:5000`
- Verify dependencies are installed: `npm install`
- Check for syntax errors in server.js

### 2. Frontend can't connect to backend
- Verify backend is running: `curl http://localhost:5000/api/health`
- Check CORS settings in `backend/server.js`
- Verify `VITE_API_URL` in frontend `.env` matches backend port

### 3. Authentication not working
- Clear browser localStorage
- Check JWT_SECRET is set in backend `.env`
- Verify token is being sent in request headers

### 4. Database errors
- Delete `backend/data/database.json` to reset
- Check file permissions on `backend/data/` directory
- Verify bcryptjs is installed: `npm list bcryptjs`

### 5. Module not found errors
- Run `npm install` in both frontend and backend
- Check Node.js version (should be v16+)
- Verify all imports are correct

## Quick Health Checks

### Backend Health
```bash
curl http://localhost:5000/api/health
```
Should return: `{"status":"OK","message":"Gymkhana API is running"}`

### Frontend Health
Open browser to: `http://localhost:5173`

### Check if servers are running
```bash
# Backend
lsof -ti:5000 && echo "Backend running" || echo "Backend not running"

# Frontend
lsof -ti:5173 && echo "Frontend running" || echo "Frontend not running"
```

