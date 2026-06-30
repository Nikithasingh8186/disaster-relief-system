# AI Pipeline Specification

## Input Types

1. Audio
2. Image
3. Text

---

## Audio Pipeline

Audio
↓
Whisper.cpp
↓
Text

---

## Image Pipeline

Image
↓
Tesseract OCR
↓
Text

---

## Extraction Pipeline

Text
↓
Phi-3 Mini
↓
Structured JSON

---

## Storage Pipeline

JSON
↓
SQLite
