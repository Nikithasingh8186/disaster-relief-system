#!/bin/bash

echo "📡 OFFLINE MODE ENABLED"
echo "🔌 Please disconnect internet now for demo..."

sleep 3

echo "🚀 Starting Backend..."
uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 &

BACKEND_PID=$!

sleep 3

echo "🌐 Starting Frontend..."
cd frontend
npm run dev &

FRONTEND_PID=$!

sleep 3

echo "✅ RescueSync AI is running OFFLINE"
echo "Backend: http://127.0.0.1:8000"
echo "Frontend: http://localhost:5173"

wait $BACKEND_PID $FRONTEND_PID