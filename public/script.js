const searchElement = document.querySelector('[data-city-search]');
// Make our input field a google search box.
// Accessed via the google maps API in index.html
const searchBox = new google.maps.places.SearchBox(searchElement);

// Use the google specific listener (not an eventListener!)
// When the user selects a place, 
searchBox.addListener('places_changed', () => {
  // console.log('searchBox.getPlaces():', searchBox.getPlaces());

  // Get the place object (it's returned in an array)
  // getPlaces() must do a kind of request to the maps.googleapis.com API for the object
  // containing the data of the selected place.
  const place = searchBox.getPlaces()[0];
  if (place == null) return;
  // get the place's latitude and longitude
  const latitude = place.geometry.location.lat();
  const longitude = place.geometry.location.lng();

  // Send (post) the lat and lng of the selected place to the 
  // weather endpoint (app.post('/weather') in server.js
  fetch('/weather', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      latitude: latitude,
      longitude: longitude
    })
    // Somehow the data returned from the axios call to the DarkSky API is passed to the res
    // parameter of the .then() function.
  }).then(res => res.json()).then(data => {
    console.log('fetch().then() data:', data);
    setWeatherData(data, place.formatted_address);
  });
});

const locationElement = document.querySelector('[data-location]');
const statusElement = document.querySelector('[data-status]');
const windElement = document.querySelector('[data-wind]');
const precipitationElement = document.querySelector('[data-precipitation]');
const temperatureElement = document.querySelector('[data-temperature]');

const icon = new Skycons({ color: '#222' });
// Set default displayed icon (before place selected)
icon.set('icon', 'clear-day');
icon.play();

const setWeatherData = (data, place) => {
  locationElement.textContent = place;
  statusElement.textContent = data.summary;
  temperatureElement.textContent = data.temperature;
  precipitationElement.textContent = `${data.precipProbability * 100}`;
  windElement.textContent = data.windSpeed;
  // First parm is the id of the canvas HTML element. 
  // Second param is the name of the icon (it's a property of the returned data object)
  icon.set('icon', data.icon);
  // Start animation!
  icon.play();
}