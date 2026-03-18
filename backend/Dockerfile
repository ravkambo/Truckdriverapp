# Use the official Python image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies (needed for some Python packages)
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend code
COPY . .

# Expose the port (Railway sets $PORT dynamically)
EXPOSE 8080

# Command to run the application
# Railway injects $PORT at runtime; default to 8080 if not set
CMD uvicorn main:app --host 0.0.0.0 --port ${PORT:-8080}
