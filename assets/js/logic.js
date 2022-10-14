//Global Variables
var searchEl = document.getElementById('searchBox');
var sbtnEl = document.getElementById('sbtn');
var todayEl = document.getElementById('today');
var historyEl = document.getElementById('history');
var APIkey = 'd07d922262517dc70fc0e185f07feddb'

// Creating elements and adding to page
function renderForecast(data3) {
  // Created elements for page
  var dateEl = document.createElement('h3');
  var iconEl = document.createElement('img');
  var tempEl = document.createElement('p');
  var humidEl = document.createElement('p');
  var windEl = document.createElement('p');
  var divEl = document.createElement('div')

    // Use moment to get the current time
    var now = moment().format('MM/DD/YYYY');
    // Gets icon from data
    // var icon = data3.weather[0].icon;
    // var iconUrl = "https://openweathermap.org/img/wn/" + icon + ".png";

    console.log(data3)

  // // Adding text content and data values to created elements
  dateEl.textContent = now;
  // iconEl.src = iconUrl;
  tempEl.textContent = 'Temp: ' + data3.list[0].main.temp; 
  humidEl.textContent = 'Humidity: ' + data3.list[0].main.humidity; 
  windEl.textContent = 'Wind: ' + data3.list[0].wind.speed;

  // Class for CSS
  divEl.className = 'card';

  // Append elements
  var cardEl = document.querySelector('#fiveDay');
  divEl.append(dateEl, tempEl, humidEl, windEl);
  cardEl.append(divEl);

}


// Function to push city and data info to functions for adding to page
// function renderItems(data3) {
//   // renderCurrentWeather(city, data.list[0]);
//   renderForecast(data3);
// }

// Function to retrieve 5 day forecast based on geo coordinates from location in search
function getFiveDayForecast(lat, lon) {
  fetch("http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIkey)
  .then((response) => response.json())
  .then((data3) => {
    // var dailyForecast = data3.list;
    var city = data3.city.name;
    // console.log(city);
    // console.log(data3);
    renderForecast(data3);
  });
}

// Function to retrieve weather based on geo coordinates from location in search
function getWeather(name, lat, lon) {
  console.log(name, lat, lon);
    // Fetch using the api url, .then that return the response as json, .then that calls renderItems(city, data)
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIkey)
    .then((response) => response.json())
    .then((data2) => {
      // console.log(data);
      getFiveDayForecast(lat, lon);
    });

}

// Function to get response from geo and plug in city from search to receive lat and lon on data return
function getCityData(city) {
  fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIkey)
  .then((response) => {
    // console.log(response)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data1) => {
    // var city = data[0].name;
    var lat = data1[0].lat;
    var lon = data1[0].lon;
    // console.log(data)
    getWeather(city, lat, lon);
  });
}

// Adds getCityData function to retrieve the lat and lon
sbtnEl.addEventListener('click', function (e) {
  e.preventDefault();
  var city = searchEl.value.trim();
  // console.log(city);
  getCityData(city);
});