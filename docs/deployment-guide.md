# Deployment Guide

## Requirements

* Python 3.12
* Node.js 20
* SQLite

## Backend Setup

```bash
pip install -r requirements.txt
uvicorn backend.app.main:app --reload
```

## Frontend Setup

```bash
npm install
npm run dev
```

## Offline Demo

1. Turn off Wi-Fi.
2. Start backend.
3. Start frontend.
4. Upload sample files.
5. Verify extraction.
