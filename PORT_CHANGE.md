# Port Change Notice

## ⚠️ Important: Port Changed from 5000 to 5001

The backend port has been changed from **5000** to **5001** because port 5000 is commonly used by macOS AirPlay Receiver.

### What Changed:
- Backend default port: `5000` → `5001`
- Frontend API URL: `http://localhost:5000/api` → `http://localhost:5001/api`

### Files Updated:
1. `backend/server.js` - Changed default PORT to 5001
2. `frontend/src/services/api.ts` - Updated API_BASE_URL to use port 5001

### To Use a Different Port:

**Backend:**
Create or edit `backend/.env`:
```
PORT=3000
```

**Frontend:**
Create or edit `frontend/.env`:
```
VITE_API_URL=http://localhost:3000/api
```

### Verify the Change:

1. Start backend:
```bash
cd backend
npm start
```
You should see: `🚀 Server running on http://localhost:5001`

2. Check frontend API calls:
Open browser DevTools → Network tab → Verify API calls go to `http://localhost:5001/api`

### If You Still Want to Use Port 5000:

You need to disable macOS AirPlay Receiver:
1. System Settings → General → AirDrop & Handoff
2. Turn off "AirPlay Receiver"

Then change the ports back to 5000 in the files mentioned above.

