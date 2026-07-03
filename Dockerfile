FROM python:3.10

# Set working directory
WORKDIR /app

# Copy requirements first
COPY backend/requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY backend/ .

# Expose the port
EXPOSE 10000

# Start FastAPI
CMD uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-10000}