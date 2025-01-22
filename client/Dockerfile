# Use a Node.js base image to build the React app
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire client directory
COPY . .

# Build the application
RUN npm run build

# Use a lightweight web server to serve static files
FROM nginx:alpine

# Copy build files to Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 9000 for Traefik
EXPOSE 9000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]