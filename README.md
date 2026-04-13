# City Events Finder

This cloud-based web application allows users to search for events in a city.

# Technologies Used
- Node.js (Express)
- Docker
- Google Cloud Run
- Google Artifact Registry
- Google Cloud Load Balancer
- Ticketmaster API
- Google Places API
- Google Geocoding API

# Features
- Search for events by city
- Aggregates data from multiple APIs
- Removes duplicate results
- Sorts events by date
- Health check endpoint (/health)

# Deployment
The application is containerized using Docker, deployed to Google Cloud Run, and exposed via a Global External Application Load Balancer.

# Security
API keys are stored using environment variables and are not included in the source code.
