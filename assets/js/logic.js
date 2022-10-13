//Global Variables
var searchEl = document.getElementById('searchBox');
var sbtnEl = document.getElementById('sbtn');
var todayEl = document.getElementById('today');
var historyEl = document.getElementById('history');


//Function to get search results from lat and lon
function searchRequest() {
  var current = searchEl.value.trim();
  var geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${current}&limit=1&appid=d07d922262517dc70fc0e185f07feddb`;


  //Fetch for geo api
  fetch(geoUrl)
    //If server is communicating then receive response else load text error to page
    .then (function (response) {
      console.log(response)
      if (response.ok) {
        return response.json();
      } else {
        todayEl.textContent = 'Error loading results'
        return;
      }
    })
    


}

sbtnEl.addEventListener('click', searchRequest);