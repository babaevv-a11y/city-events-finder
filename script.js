document.getElementById('search-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const city = document.getElementById('city-input').value.trim();
  const results = document.getElementById('results');

  if (!city) {
    results.innerHTML = '<p>Please enter a city.</p>';
    return;
  }

  results.innerHTML = '<p>Loading...</p>';

  try {
    const response = await fetch(`/search?city=${encodeURIComponent(city)}`);
    const data = await response.json();

    if (!data.length) {
      results.innerHTML = '<p>No events found for that city.</p>';
      return;
    }

    results.innerHTML = data.map(event => `
      <div style="margin-bottom: 20px; padding: 12px; border: 1px solid #ccc; border-radius: 6px;">
        <h3>${event.title}</h3>
        <p><strong>Date:</strong> ${event.date || 'Not available'}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p><strong>Source:</strong> ${event.source}</p>
        <a href="${event.url}" target="_blank">View Details</a>
      </div>
    `).join('');

  } catch (error) {
    results.innerHTML = '<p>Error loading events. Please try again.</p>';
  }
});