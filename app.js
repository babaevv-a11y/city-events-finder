require('dotenv').config();
const normalizeTicketmaster = require('./services/normalizeEvents');
const sortEventsByDate = require('./utils/sortEvents');
const normalizePlaces = require('./services/normalizePlaces');
const dedupeEvents = require('./utils/dedupe');
const normalizeGeocoding = require('./services/normalizeGeocoding');


const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.static(path.join(__dirname, 'public')));


app.get('/health', (req, res) => {
  res.status(200).send('OK');
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/test-api', async (req, res) => {
  const axios = require('axios');

  const city = 'Richmond';

  try {
    const response = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/events.json`,
      {
        params: {
          apikey: process.env.TICKETMASTER_API_KEY,
          city: city
        }
      }
    );

    const normalized = normalizeTicketmaster(response.data);
res.json(normalized);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

app.get('/search', async (req, res) => {
  const axios = require('axios');

  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
  const geoResponse = await axios.get(
    'https://maps.googleapis.com/maps/api/geocode/json',
    {
      params: {
        address: city,
        key: process.env.GEOCODING_API_KEY
      }
    }
  );

  const geo = normalizeGeocoding(geoResponse.data);

  const ticketmasterResponse = await axios.get(
    'https://app.ticketmaster.com/discovery/v2/events.json',
    {
      params: {
        apikey: process.env.TICKETMASTER_API_KEY,
        latlong: geo ? `${geo.lat},${geo.lng}` : undefined
      }
    }
  );

  const placesResponse = await axios.get(
    'https://maps.googleapis.com/maps/api/place/textsearch/json',
    {
      params: {
        query: `events in ${city}`,
        key: process.env.GOOGLE_PLACES_API_KEY
      }
    }
  );

  const ticketmasterEvents = normalizeTicketmaster(ticketmasterResponse.data);
  const placesEvents = normalizePlaces(placesResponse.data);

  const combined = [...ticketmasterEvents, ...placesEvents];
  const deduped = dedupeEvents(combined);
  const sorted = sortEventsByDate(deduped);

  res.json(sorted);

} catch (error) {
  res.status(500).json({
    error: error.message
  });
}
});

app.get('/test-places', async (req, res) => {
  const axios = require('axios');

  const city = 'Richmond';

  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/place/textsearch/json',
      {
        params: {
          query: `events in ${city}`,
          key: process.env.GOOGLE_PLACES_API_KEY
        }
      }
    );

    const normalized = normalizePlaces(response.data);
res.json(normalized);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});