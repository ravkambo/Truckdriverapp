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

# Expose the port FastAPI will run on
EXPOSE 8080

# Command to run the application
# Cloud Run expects the app to listen on $PORT, which defaults to 8080
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
