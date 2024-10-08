# Stage 1: Build the application with Bun
FROM oven/bun:1 AS builder
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Copy all source files
COPY . .

# [optional] Run tests and build the application
RUN bun test
RUN bun run build

# Stage 2: Create the distroless image
FROM gcr.io/distroless/base

# Set the working directory in the final image
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /usr/src/app/dist ./dist  
# Copy compiled files from dist
COPY --from=builder /usr/src/app/public ./public  
# Copy the entire public folder
COPY --from=builder /usr/src/app/package.json ./

# Copy the Bun binary from the builder stage
COPY --from=builder /usr/local/bin/bun /usr/local/bin/bun

# Specify the command to run the app
USER nonroot:nonroot 
 # Use a non-root user for better security
EXPOSE 3000
ENTRYPOINT ["bun", "run", "--smol", "dist/index.js"]
