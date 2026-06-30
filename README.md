# RescueSync AI

## Offline Disaster Relief Information Extractor

RescueSync AI is an offline-first, CPU-powered AI system that converts unstructured disaster reports (audio, images, and text) into structured incident data.

## Features

- Offline-first architecture
- CPU-only inference
- Audio transcription using Whisper.cpp
- OCR using Tesseract
- Structured extraction using Phi-3 Mini
- SQLite database
- Incident dashboard
- Search and filtering
- CSV export

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- PWA

### Backend

- FastAPI
- SQLite

### AI

- Whisper.cpp
- Tesseract OCR
- Phi-3 Mini GGUF
- llama.cpp

## Architecture

Audio/Image/Text
↓
Speech/OCR Processing
↓
Text Normalization
↓
Local LLM
↓
Structured JSON
↓
SQLite
↓
Dashboard

## Running

### Backend

```bash
pip install -r requirements.txt
uvicorn backend.app.main:app --reload
```

### Frontend

```bash
npm install
npm run dev
```

## Offline Demo

1. Disconnect internet.
2. Start backend.
3. Start frontend.
4. Upload sample files.
5. Verify structured output.

## License

GPL-3.0
