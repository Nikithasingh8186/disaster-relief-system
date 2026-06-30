#!/bin/bash

echo "🚀 Starting RescueSync AI Backend..."

# Activate virtual environment (optional)
# source venv/bin/activate

# Start backend server
uvicorn backend.app.main:app --reload --host 127.0.0.1 --port 8000