# Stage 1: Build
FROM node:18 as builder

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Stage 2: Run
FROM node:18-slim

# Set working directory
WORKDIR /usr/src/app

# Copy only necessary files from the builder stage
COPY package*.json ./
RUN npm install --omit=dev

# Copy the built application from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Copy production environment variables
COPY .env.prod ./

# Expose the port your app runs on
EXPOSE 3000

# Set environment variable to indicate production
ENV NODE_ENV production

# Command to run the application
CMD ["node", "dist/main"]
