# RescueSync AI Architecture

## System Overview

RescueSync AI is an offline-first, CPU-powered disaster information extraction platform.

## Architecture

```text
Audio/Image/Text
        ↓
Preprocessing
        ↓
Whisper.cpp / Tesseract OCR
        ↓
Text Cleaning
        ↓
Phi-3 Mini (Local LLM)
        ↓
Structured JSON
        ↓
SQLite Database
        ↓
Dashboard
```

## Components

### Frontend

- React
- Vite
- PWA

### Backend

- FastAPI
- SQLite

### AI Components

- Whisper.cpp
- Tesseract OCR
- Phi-3 Mini GGUF
- llama.cpp

### Storage

- SQLite
- Local Filesystem

## Design Principles

- Offline First
- CPU First
- Privacy by Design
- Low Resource Consumption
