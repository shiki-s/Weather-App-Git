function showTime() {
  let now = new Date();
  let weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekday[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let date = `${day}, ${hour}:${minutes}`;
  let dateDisplay = document.querySelector("#today");
  dateDisplay.innerHTML = date;
}
function displayWeather(response) {
  let celciusTemperature = Math.round(response.data.main.temp);
  let headTemp = document.querySelector(".head-temperature");
  headTemp.innerHTML = celciusTemperature;

  let weatherDescription = response.data.weather[0].description;
  let descriptionDisplay = document.querySelector(".weather-description");
  descriptionDisplay.innerHTML = weatherDescription;

  let windSpeed = response.data.wind.speed;
  let windSpeedDisplay = document.querySelector(".wind-speed");
  windSpeedDisplay.innerHTML = `Wind speed: ${windSpeed}`;
}

function showDefaultTemp() {
  let apiKey = "ba73db419b4c99c0a6fa92bf9033b20d";
  let apiRoot = "https://api.openweathermap.org/data/2.5/weather";
  let units = "metric";
  let apiUrl = `${apiRoot}?q=Tokyo&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function currentLocationTemp(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);
  let apiKey = "ba73db419b4c99c0a6fa92bf9033b20d";
  let apiRoot = "https://api.openweathermap.org/data/2.5/weather";
  let units = "metric";
  let apiUrl = `${apiRoot}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function currentLocationClick(event) {
  navigator.geolocation.getCurrentPosition(currentLocationTemp);
}

function locationSearch(event) {
  event.preventDefault();
  let locationInput = document.querySelector("#location-form-input");
  let location = locationInput.value;
  let locationDisplay = document.querySelector("#location");
  locationDisplay.innerHTML = `${location}`;

  let apiKey = "ba73db419b4c99c0a6fa92bf9033b20d";
  let apiRoot = "https://api.openweathermap.org/data/2.5/weather";
  let units = "metric";
  let apiUrl = `${apiRoot}?q=${location}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function showFahrenheit(event) {
  event.preventDefault();
  let headTemp = document.querySelector(".head-temperature");
  let fahrenheitTempertature = (celciusTemperature * 9) / 5 + 32;
  headTemp.innerHTML = fahrenheitTempertature;
}

let celciusTemperature = null;
showDefaultTemp();

let currentLocationButton = document.getElementById("current-location-button");
currentLocationButton.addEventListener("click", currentLocationClick);

let fahrenheitButton = document.querySelector("#fahrenheit");
fahrenheitButton.addEventListener("click", showFahrenheit);

let search = document.querySelector("#location-form");
search.addEventListener("submit", locationSearch);

showTime();
