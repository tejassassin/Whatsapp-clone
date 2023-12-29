# Use a Node.js base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire React app to the container
COPY . ./

# Build the React app
RUN npm run build

# Specify the command to start the app (for production)
CMD ["npm", "start"]
