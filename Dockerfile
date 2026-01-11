# Stage 1: Build the Flutter web app
FROM ghcr.io/cirruslabs/flutter:stable as builder

WORKDIR /app

# Copy pubspec files
COPY pubspec.yaml pubspec.lock* ./

# Download dependencies
RUN flutter pub get

# Copy the rest of the code
COPY . .

# Build the web app in release mode
RUN flutter build web --release

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy built web app to nginx
COPY --from=builder /app/build/web /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
