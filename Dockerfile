# Stage 1: Build the Flutter web app
FROM ghcr.io/cirruslabs/flutter:stable as builder

WORKDIR /app

# Build arguments for Appwrite configuration
ARG APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
ARG APPWRITE_PROJECT_ID=695ea80c0038b2a33779
ARG APPWRITE_DATABASE_ID=sportsacademy

# Copy pubspec files
COPY pubspec.yaml pubspec.lock* ./

# Download dependencies
RUN flutter pub get

# Copy the rest of the code
COPY . .

# Build the web app in release mode with dart-define
RUN flutter build web --release \
    --dart-define=APPWRITE_ENDPOINT=$APPWRITE_ENDPOINT \
    --dart-define=APPWRITE_PROJECT_ID=$APPWRITE_PROJECT_ID \
    --dart-define=APPWRITE_DATABASE_ID=$APPWRITE_DATABASE_ID

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
