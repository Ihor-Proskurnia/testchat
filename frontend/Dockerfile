# Use a Node.js base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy only package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Expose port 8080
EXPOSE 8080

# Command to run the application
CMD ["npm", "start"]
