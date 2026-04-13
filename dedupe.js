function dedupeEvents(events) {
  const seen = new Set();

  return events.filter(event => {
    const key = `${event.title.toLowerCase()}|${event.location.toLowerCase()}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

module.exports = dedupeEvents;