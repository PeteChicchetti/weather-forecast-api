//Global Variables
var searchEl = document.getElementById('searchBox');
var sbtnEl = document.getElementById('sbtn');
var todayEl = document.getElementById('today');
var fiveDayEl = document.getElementById('fiveDay')
var historyEl = document.getElementById('history');
var APIkey = 'd07d922262517dc70fc0e185f07feddb';



function renderForecast(data3) {
  // set up elements for this section
  //console.log(data);
  fiveDayEl.textContent = "";


  for (var i = 1; i < 6; i++) {
      var tempForecast = data3.list[i].main.temp;
      var humidityForecast = data3.list[i].main.humidity;
      var windForecast = data3.list[i].wind.speed;
      var iconForecast = data3.list[i].weather[0].icon;

      var cardEl = document.createElement("div");
      cardEl.setAttribute("class", "card col-xl-2 col-md-5 col-sm-10 mx-2 my-1 bg-primary text-white text-left h-25");

      var cardBodyEl = document.createElement("div");
      cardBodyEl.setAttribute("class", "card-body");

      var cardDateEl = document.createElement("h6");
      cardDateEl.textContent = moment().add(i, "days").format("MM/DD/YYYY");

      var cardIconEl = document.createElement("img");
      cardIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + iconForecast + "@2x.png");

      var cardTempEl = document.createElement("p");
      cardTempEl.setAttribute("class", "card-text");
      cardTempEl.textContent = "Temp: " + tempForecast + "°F";

      var cardWindEl = document.createElement("p");
      cardWindEl.setAttribute("class", "card-text");
      cardWindEl.textContent = "Wind: " + windForecast + "MPH";

      var cardHumidEl = document.createElement("p");
      cardHumidEl.setAttribute("class", "card-text");
      cardHumidEl.textContent = "Humidity: " + humidityForecast + "%";

      // append
      cardBodyEl.appendChild(cardDateEl)
      cardBodyEl.appendChild(cardIconEl)
      cardBodyEl.appendChild(cardTempEl)
      cardBodyEl.appendChild(cardHumidEl)
      cardBodyEl.appendChild(cardWindEl)

      cardEl.appendChild(cardBodyEl);
      fiveDayEl.appendChild(cardEl);

      //cityFormEl.reset()
  }
}


function renderCurrentWeather (data2) {
  var nameEl = document.createElement('h3');
  var dateEl = document.createElement('h4');
  var tempEl = document.createElement('p');
  var humidEl = document.createElement('p');
  var windEl = document.createElement('p');

  var today = moment().format('MM/DD/YYYY');
  console.log(data2);
  nameEl.textContent = data2.name;
  dateEl.textContent = today;
  // iconEl.src = iconUrl;
  tempEl.textContent = 'Temp: ' + data2.main.temp; 
  humidEl.textContent = 'Humidity: ' + data2.main.humidity; 
  windEl.textContent = 'Wind: ' + data2.wind.speed;

  var cardEl = document.querySelector('#today');
  cardEl.append(nameEl, dateEl, tempEl, humidEl, windEl);
}



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
      renderCurrentWeather(data2);
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