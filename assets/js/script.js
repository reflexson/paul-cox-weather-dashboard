// Variables
var pastSearches = document.querySelector("#pastSearches");
var searchForm= document.querySelector("#searchForm")
var pastButtons = document.querySelectorAll('.pastButtons');
var pastCities = [];
var pastCitiesUnique = [...new Set(pastCities)];


getPreviousCities();

// Add new Button in list for each submit
function renderCities() {
  pastSearches.innerHTML = "";
  pastCitiesUnique = [...new Set(pastCities)];
  
  for (var i = 0; i < pastCitiesUnique.length; i++) {
    var cityIndex = pastCitiesUnique[i];
    var button = document.createElement("button");
    button.innerHTML = cityIndex;
    button.setAttribute("id", cityIndex)
    button.setAttribute("class", "list-group-item list-group-item-action list-group-item-secondary pastButtons");
    button.setAttribute("data-index", i)
    pastSearches.appendChild(button);
    pastButtons = document.querySelectorAll('.pastButtons');
    var btnsArr = Array.prototype.slice.call(pastButtons);
    
    btnsArr[i].addEventListener("click", function(){
      var buttonName = event.target.id;
      geoCode(buttonName);
      const cityName = document.getElementById("cityName")
      cityName.textContent = event.target.id;
    })
  }
  localStorage.setItem("pastcities", JSON.stringify(pastCitiesUnique));
}


// function to gather previous cities in list
function getPreviousCities(){
pastCities = JSON.parse(localStorage.getItem("pastcities"))
if(pastCities?.length){
  for (var i = 0; i < pastCities.length; i++) {
    var cityIndex = pastCities[i];
    var button = document.createElement("button");
    button.innerHTML = cityIndex;
    button.setAttribute("id", cityIndex)
    button.setAttribute("class", "list-group-item list-group-item-action list-group-item-secondary pastButtons");
    button.setAttribute("data-index", i)
    pastSearches.appendChild(button);
    pastButtons = document.querySelectorAll('.pastButtons');
    var btnsArr = Array.prototype.slice.call(pastButtons);
    
    btnsArr[i].addEventListener("click", function(){
      var buttonName = event.target.id;
      geoCode(buttonName);
      const cityName = document.getElementById("cityName")
      cityName.textContent = event.target.id;
    })
  }
}
else{
  pastCities = [];
}
}
// convert city name to lat and lon
  function geoCode(city){
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=$${city}&appid=f5b23a91c2f7a0c11c8a9728683cd8b0`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if(data.length !== 0){
      oneCall(data[0].lat, data[0].lon)
      }
      else{
       
        alert("Not a Valid City");
        return;
      }
    })
  }
// get weather data from lat and lon
  function oneCall(lat, lon){
    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=f5b23a91c2f7a0c11c8a9728683cd8b0&units=imperial`)
    .then(response => response.json())
    .then(data => {
console.log(data)
for(i=0;i<6; i++){
            document.getElementById("day" +(i)+ "Temp").textContent = "Temp: " + (data.daily[i].temp.day).toFixed(1)+"°F";
          }
          for(i=0;i<6; i++){
            document.getElementById("day" +(i)+ "Hum").textContent = "Humidity: " + (data.daily[i].humidity)+"%";
          }
          for(i=0;i<6; i++){
            document.getElementById("day" +(i)+ "Wind").textContent = "Wind: " + (data.daily[i].wind_speed).toFixed(1)+"MPH";
          }
          for(i=0;i<6; i++){
            var date = new Date(data.daily[i].dt *1000);
            document.getElementById("day" +(i)+ "Date").innerHTML = date.toLocaleDateString("en-US");
          }
          for(i=0;i<6; i++){
            document.getElementById("day" +(i)+ "Icon").src = "https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon+".png";
          }
          cityName = cityInput.value;
    })
  }
    
// Search Button Event Listener

  searchForm.addEventListener('submit', function(event){
    event.preventDefault();
    // pastCities = [];
    const cityName = document.getElementById("cityName")
    var cityInput= document.getElementById("cityInput").value
    
    cityName.textContent = cityInput.charAt(0).toUpperCase()+ cityInput.slice(1) + " ";
    geoCode(cityInput);
    pastCities.push(cityInput.charAt(0).toUpperCase()+ cityInput.slice(1) + " ");
    renderCities();
  })
    
 
    
    
    
    
    
    












// });
      





  

