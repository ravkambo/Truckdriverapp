# Stage 1: Build the React application
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
# We use arguments for the API URL and Gemini Key so they can be baked into the static files
ARG VITE_API_URL
ARG GEMINI_API_KEY
ENV VITE_API_URL=$VITE_API_URL
ENV GEMINI_API_KEY=$GEMINI_API_KEY

RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:stable-alpine

# Copy the build output to Nginx's default public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a custom Nginx configuration to handle React Router (if needed)
# Since this is a SPA, we need to redirect all requests to index.html
RUN echo 'server { \
    listen 8080; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expose port 8080 (Cloud Run default)
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
