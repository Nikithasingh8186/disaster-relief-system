#!/bin/bash

echo "📦 Setting up model directories..."

mkdir -p models/whisper
mkdir -p models/phi3
mkdir -p models/tesseract

echo "✅ Model folders created."

echo "⚠️ IMPORTANT:"
echo "Download and place the following files manually:"
echo "- models/whisper/ggml-base.bin"
echo "- models/phi3/phi-3-mini-instruct-q4.gguf"
echo "- models/tesseract/eng.traineddata"

echo "Done."