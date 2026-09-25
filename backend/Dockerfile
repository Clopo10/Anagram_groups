# Using lightweight version of Pyhton
FROM python:3.11-slim

# Prevent Python from writing .pyc and __pycache__ files and prevent buffering so logs show instantly
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Copy requirements.txt file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy rest of backend
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Run FastAPI server in production mode
CMD ["fastapi", "run", "main.py", "--host", "0.0.0.0", "--port", "8000"]