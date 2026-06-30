FROM python:3.10

# set working directory
WORKDIR /app

# copy backend requirements first
COPY backend/requirements.txt .

# install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# copy backend code
COPY backend/ .

# run FastAPI app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]