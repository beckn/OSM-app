FROM node:18.18.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the rest of the application code
COPY . .


# Install dependencies
RUN npm install -f && \
    npm run build

# Expose the port the app runs on
EXPOSE 3000

# Use pm2-runtime to start the application
CMD ["npm", "start"]
