# Build Stage
FROM node:23 AS builder
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Inject API key at compile stage
ARG VITE_FOURSQUARE_API_KEY
ENV VITE_FOURSQUARE_API_KEY $VITE_FOURSQUARE_API_KEY

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.json
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the Tanstack-start app
RUN pnpm build

# Production Stage
FROM node:23-alpine

# Inject API key at runtime
ARG VITE_FOURSQUARE_API_KEY
ENV VITE_FOURSQUARE_API_KEY $VITE_FOURSQUARE_API_KEY

# Copy the built application from the builder stage
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/.output /app/.output
COPY --from=builder /app/.vinxi /app/.vinxi
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/public /app/public

# Set the working directory
WORKDIR /app

# Expose the port the app runs on
EXPOSE 3000

# Start the Tanstack-start app
CMD ["pnpm", "start"]