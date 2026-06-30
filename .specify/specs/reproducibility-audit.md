# Reproducibility Audit

## Hardware

CPU:
Intel i5 or above

RAM:
8 GB minimum

Storage:
5 GB

---

## Software

Python: 3.12

Node.js: 20

SQLite: 3.x

---

## Models

Whisper.cpp

Phi-3 Mini Instruct Q4 GGUF

Tesseract OCR

---

## Environment Setup

### Backend

pip install -r requirements.txt

### Frontend

npm install

### Start Backend

uvicorn app.main:app --reload

### Start Frontend

npm run dev

---

## Offline Validation

1. Disconnect internet.
2. Start application.
3. Upload sample data.
4. Verify output generation.
