var endpoint = "https://api.openweathermap.org/data/2.5/weather";
var apiKey = "26bce2e84b51e9e428e64fda61e2292c";

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getLocationCallback);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function exctractTemperature(weatherData) {
    var kelvinTemperature = weatherData.main.temp
    var celsiusTemperature = kelvinTemperature - 273.15
    return Math.round(celsiusTemperature * 10) / 10;
}

function setTemperature(lat, long) {
    var temperatureElement = document.getElementById("temperature");
    var parameters = `?lat=${lat}&lon=${long}&appid=${apiKey}`;
    var weatherData = fetchAsync(endpoint + parameters);
    weatherData.then(
        (data) => {
            temperatureElement.textContent = exctractTemperature(data);
        },
      );    
}

async function fetchAsync (url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

function getLocationCallback(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    setTemperature(latitude, longitude);
}

getLocation();
