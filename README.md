# 🚨 Disaster Relief Information Extractor

An AI-powered Disaster Relief Information System that helps users report, store, and view disaster incidents with **offline support, GPS location, and image/text reporting**.

---

## 🌐 Live Features

✔ Submit disaster reports (text + image)  
✔ Automatic GPS location detection  
✔ Manual location input (offline mode)  
✔ Offline-first support using localStorage  
✔ Backend storage using FastAPI  
✔ Image upload support (Base64 encoding)  
✔ Real-time incident dashboard  

---

## 🧠 Tech Stack

### Frontend
- React (Vite)
- JavaScript
- HTML/CSS
- localStorage (offline mode)

### Backend
- FastAPI
- Python
- SQLite / MongoDB (based on setup)
- REST APIs

### Tools
- Git
- Bandit (security)
- Flake8 / MyPy (linting)
- Pre-commit hooks

---

## 📂 Project Structure
backend/
├── app/
│ ├── main.py
│ ├── database/
│ ├── models/
│ ├── schemas/
│ └── services/

frontend/
├── src/
│ ├── components/
│ ├── pages/
│ ├── services/
│ └── App.jsx

---

## 🚀 Features

### 📍 Location System
- Auto GPS detection (online)
- Manual location input (offline fallback)

### 📝 Reporting System
- Text incident reporting
- Image upload support
- Timestamped entries

### 📡 Offline Support
- Works without internet
- Saves data in localStorage
- Sync-ready architecture

### 🧠 Backend System
- FastAPI REST APIs
- Incident parsing & normalization
- Structured data storage

---

## 📦 API Endpoints

### ➤ Create Incident
```

POST /incidents
➤ Get All Incidents

GET /incidents
⚙️ Setup Instructions
1️⃣ Clone Repo
git clone <your-repo-url>
cd disaster-relief-information-extractor
2️⃣ Backend Setup
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

Backend runs on:

http://127.0.0.1:8000
3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173
📱 Offline Mode

If internet is OFF:

Data is saved in browser localStorage
Manual location can be entered
Data syncs when backend is available
📱 Offline Mode

If internet is OFF:

Data is saved in browser localStorage
Manual location can be entered
Data syncs when backend is available
🔒 Security
Input validation on backend
Safe JSON parsing
No exposed secrets
Bandit security scanning supported
🧪 Future Improvements
AI-based incident classification
Real-time disaster alerts
Map visualization (Leaflet/Google Maps)
Cloud database integration
User authentication system
👨‍💻 Author

Nikitha Singh
spurthi
Disaster Relief AI System Project
# Disaster Relief Information Extractor

## Features

## Technology Stack

## Installation

### Backend

### Frontend

## Usage

## Project Structure

## API Endpoints

## Contributing

## License

⭐ Project Goal

To build a hybrid offline + online disaster reporting system that works even in low connectivity areas and helps in emergency response coordination.


