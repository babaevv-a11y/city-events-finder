# City Events Finder

City Events Finder is a web application that lets a user search for upcoming city events and related venues by entering a city name.

## Features
- Search by city
- Pulls data from multiple external APIs. From 3 to be exact
- Normalizes event data into one format
- Removes duplicate results
- Sorts results by date
- Includes a `/health` endpoint for deployment health checks

## Tech Stack
- Node.js
- Express
- HTML/CSS/JavaScript
- Docker
- Google Cloud Run
- External HTTP(S) Load Balancer

## Local Run
1. Install dependencies:
   npm install

2. Start the app:
   npm start

3. Open in browser:
   http://localhost:8080

4. Health check:
   http://localhost:8080/health