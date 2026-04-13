function normalizeTicketmaster(events) {
  if (!events || !events._embedded || !events._embedded.events) {
    return [];
  }

  return events._embedded.events
    .map(event => {
      return {
        title: event.name || 'No title',
        date: event.dates?.start?.localDate || '',
        location: event._embedded?.venues?.[0]?.city?.name || 'Unknown',
        source: 'Ticketmaster',
        url: event.url || ''
      };
    })
    .filter(event => event.date);
}

module.exports = normalizeTicketmaster;