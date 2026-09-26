FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the frontend
COPY . .

# Expose the Vite development port
EXPOSE 5173

# Run Vite in development mode
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]