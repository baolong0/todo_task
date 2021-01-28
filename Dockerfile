# Create a base stage
FROM node:14.15.1-stretch AS base

# Create app directory
WORKDIR /opt/app

# Build & Testing
FROM base AS build
# Copy package.json and package-lock.json
COPY package.json package-lock.json* ./
# Install dependencies
RUN npm install && npm cache clean --force
# Copy source code to image
COPY . ./
# Run build & test
RUN npx webpack --config webpack.config.js

# Release
FROM node:14.15.1-stretch as release
# Create app directory
WORKDIR /opt
# Copy package.json and package-lock.json
COPY --from=build /opt/app/package.json /opt/app/package-lock.json /opt/app/firebase-service.json ./
# Install app dependencies
RUN npm install --only-production
WORKDIR /opt/app
COPY --from=build /opt/app/dist ./

CMD ["npx", "nodemon", "-V", "index.js"]