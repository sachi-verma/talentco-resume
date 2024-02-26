#!/bin/bash

# Build frontend
cd frontend
npm install
npm run build

# Build backend
cd ../backend
npm install

# Start backend
node index.js
