function sortEventsByDate(events) {
  return events.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });
}

module.exports = sortEventsByDate;