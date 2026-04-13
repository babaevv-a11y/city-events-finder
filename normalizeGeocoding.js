function normalizeGeocoding(data) {
  if (!data || !data.results || !data.results.length) {
    return null;
  }

  const location = data.results[0].geometry.location;

  return {
    lat: location.lat,
    lng: location.lng
  };
}

module.exports = normalizeGeocoding;