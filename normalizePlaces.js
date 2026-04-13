function normalizePlaces(data) {
  if (!data || !data.results) {
    return [];
  }

  return data.results.map(place => {
    return {
      title: place.name || 'No title',
      date: '',
      location: place.formatted_address || 'Unknown',
      source: 'Google Places',
      url: place.place_id
        ? `https://www.google.com/maps/place/?q=place_id:${place.place_id}`
        : ''
    };
  });
}

module.exports = normalizePlaces;