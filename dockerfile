# Use the official Node.js LTS (Long Term Support) version as the base image
FROM node:lts

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on (assuming your app runs on port 3000)
EXPOSE 3000

# The command to run the application
CMD [ "node", "server.js" ]
