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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "ba73db419b4c99c0a6fa92bf9033b20d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  celciusTemperature = Math.round(response.data.main.temp);
  let headTemp = document.querySelector(".head-temperature");
  headTemp.innerHTML = celciusTemperature;

  let weatherDescription = response.data.weather[0].description;
  let descriptionDisplay = document.querySelector(".weather-description");
  descriptionDisplay.innerHTML = weatherDescription;

  let iconElement = document.querySelector(".head-emoji");

  let windSpeed = response.data.wind.speed;
  let windSpeedDisplay = document.querySelector(".wind-speed");
  windSpeedDisplay.innerHTML = `Wind speed: ${windSpeed}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(".weatherForecast");
  let days = ["Mon", "Tue", "Wed", "Thur", "Fri"];

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
 <div class="col">
              <div class="card weekday-card">
                <div class="card-body">
                  <h6 class="weekday">${formatDay(forecastDay.dt)}</h6>
                  <p class="body-temperature">
                    <span class="high">${Math.round(
                      forecastDay.temp.max
                    )}°</span>
                    <span class="low">${Math.round(
                      forecastDay.temp.min
                    )}°</span>
                    <img>
        
                    <img src="http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png"/
                              width="42"

                    >
                  
                  </p>
                </div>
              </div>
            </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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

showDefaultTemp();

let currentLocationButton = document.getElementById("current-location-button");
currentLocationButton.addEventListener("click", currentLocationClick);

let search = document.querySelector("#location-form");
search.addEventListener("submit", locationSearch);

showTime();
