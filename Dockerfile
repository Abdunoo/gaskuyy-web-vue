# # build stage
# FROM node:lts-alpine as build-stage
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # production stage
# FROM nginx:stable-alpine as production-stage
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:18 as build

# Set the working directory
WORKDIR /home/abdun/vueapp

# Add the source code to app
COPY ./ /home/abdun/vueapp/

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build

WORKDIR /home/abdun/vueapp/dist

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output to replace the default nginx contents.
COPY --from=build /home/abdun/vueapp/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80