//Global Variables
var searchEl = document.getElementById('searchBox');
var sbtnEl = document.getElementById('sbtn');
var todayEl = document.getElementById('today');
var historyEl = document.getElementById('history');
var APIkey = 'd07d922262517dc70fc0e185f07feddb'

// Function to retrieve weather based on geo coordinates from location in search
var getWeather = function(lat, lon) {
  console.log(lat, lon);
    //Fetch using the api url, .then that return the response as json, .then that calls renderItems(city, data)
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      //getFiveDayForecast();
    });

}

// Function to get response from geo and plug in city from search to receive lat and lon on data return
var getCityData = function (city) {
  fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIkey)
  .then((response) => {
    console.log(response)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    var lat = data[0].lat;
    var lon = data[0].lon;
    console.log(data)
    getWeather(lat, lon);
  });
}

// Adds getCityData function to retrieve the lat and lon
sbtnEl.addEventListener('click', function (e) {
  e.preventDefault();
  var city = searchEl.value.trim();
  console.log(city);
  getCityData(city);
});