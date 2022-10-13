//Global Variables
var searchEl = document.getElementById('searchBox');
var sbtnEl = document.getElementById('sbtn');
var todayEl = document.getElementById('today');
var historyEl = document.getElementById('history');
var APIkey = 'd07d922262517dc70fc0e185f07feddb'

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
  });
}

// Adds getCityData function to retrieve the lat and lon
sbtnEl.addEventListener('click', function (e) {
  e.preventDefault();
  var city = searchEl.value.trim();
  console.log(city);
  getCityData(city);
});