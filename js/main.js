"use strict"

let searchInput = document.getElementById("search");
let submit = document.getElementById("submit");
let weather = document.getElementById("weather");

async function countryWeather() {
    let x = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=c7ee15bc794341f281144828252105&q=cairo&days=3`)
    if (x.ok) {
        let data = await x.json();
        displayCountryWeather(data.forecast.forecastday, data.location);
        displayAnotherWeather(data.forecast.forecastday)
        console.log(data.forecast.forecastday);
    }else {
        throw new Error("Weather data not found for cairo");
        
    }
}
countryWeather();

function displayCountryWeather(forecastday, location) {
    let today = forecastday[0];
    let cartona = `
    <div class="card todayWeather text-white p-0" style="background-color: #323544; width: 30%;">
              <div class="forecast-header bg-dark rounded-top px-4 py-2 d-flex justify-content-between mb-4" id="today">
                <div class="day">${new Date(today.date).toLocaleDateString('en-US', { weekday: 'long' })}</div>
                <div class="date">${today.date}</div>
              </div>
              <div class="forecaat-content px-3" id="current">
                <div class="location" style="font-size: 18px; color: rgb(191, 193, 200); font-weight: 400;">${location.name}, ${location.country}</div>
                <div class="degree">
                  <div class="num" style="font-size: 90px; font-weight: 700;">${today.day.avgtemp_c}<sup>o</sup>C</div>
                  <div class="forecast-icon">
                    <img src="https:${today.day.condition.icon}" width=90>
                  </div>
                </div>
                <div class="custom">${today.day.condition.text}</div>
                <div class="icons mt-2">
                  <span><img src="./imgs/icon-umberella.png" class="me-2">${today.day.daily_chance_of_rain}%</span>
                  <span><img src="./imgs/icon-wind.png" class="me-2">${today.day.maxwind_kph}km/h</span>
                  <span><img src="./imgs/icon-compass.png" class="me-2">East</span>
                </div>
              </div>
            </div>
    `;
    weather.innerHTML = cartona
}

function displayAnotherWeather(forecastday) {
    let cartona = ""
    for (let i = 1; i < forecastday.length; i++) {
        let day = forecastday[i];
        cartona += `

            <div class="card forecast text-white p-0" style="background-color: #262936; width: 30%;">
              <div class="forecast-header bg-dark rounded-top px-4 py-2 text-center">
                <div class="day">${new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}</div>
              </div>
              <div class="forecast-content px-3 m-auto">
                <div class="forecast-icon">
                  <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}" width=90>
                </div>
                <div class="degree">
                  <div class="num" style="font-size: 18px; font-weight: 700;">${day.day.maxtemp_c}<sup>o</sup>C</div>
                </div>
                <small style="color: rgb(191, 193, 200);">${day.day.mintemp_c}<sup>o</sup></small>
                <div class="custom">${day.day.condition.text}</div></div>
              </div>
            </div>

        `;
    }
    weather.innerHTML += cartona
}



submit.addEventListener("click", (e) => {
    e.preventDefault();
    let searchTerm = searchInput.value.trim();
    if (searchTerm) {
        getWeather(searchTerm);    
    } else {
        alert("Please enter a location");
    }
})
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        let searchTerm = searchInput.value.trim();
        if (searchTerm) {
            getWeather(searchTerm); 
            console.log(searchTerm);
            
        }
    }
})

async function getWeather(term) {
    let x = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c7ee15bc794341f281144828252105&q=${term}&days=3`)
    if (x.ok) {
        let data = await x.json();
        displayCurrent(data.forecast.forecastday, data.location);
        displayAnotherDays(data.forecast.forecastday)
        console.log(data.forecast.forecastday);
    }else {
        throw new Error("Weather data not found for " + term);
        
    }
}

function displayCurrent(forecastday, location) {
    let today = forecastday[0];
    let cartona = `
    <div class="card todayWeather text-white p-0" style="background-color: #323544; width: 30%;">
              <div class="forecast-header bg-dark rounded-top px-4 py-2 d-flex justify-content-between mb-4" id="today">
                <div class="day">${new Date(today.date).toLocaleDateString('en-US', { weekday: 'long' })}</div>
                <div class="date">${today.date}</div>
              </div>
              <div class="forecaat-content px-3" id="current">
                <div class="location" style="font-size: 18px; color: rgb(191, 193, 200); font-weight: 400;">${location.name}, ${location.country}</div>
                <div class="degree">
                  <div class="num" style="font-size: 90px; font-weight: 700;">${today.day.avgtemp_c}<sup>o</sup>C</div>
                  <div class="forecast-icon">
                    <img src="https:${today.day.condition.icon}" width=90>
                  </div>
                </div>
                <div class="custom">${today.day.condition.text}</div>
                <div class="icons mt-2">
                  <span><img src="./imgs/icon-umberella.png" class="me-2">${today.day.daily_chance_of_rain} %</span>
                  <span><img src="./imgs/icon-wind.png" class="me-2">${today.day.maxwind_kph}km/h</span>
                  <span><img src="./imgs/icon-compass.png" class="me-2">East</span>
                </div>
              </div>
            </div>
    `;
    weather.innerHTML = cartona
}

function displayAnotherDays(forecastday) {
    let cartona = ""
    for (let i = 1; i < forecastday.length; i++) {
        let day = forecastday[i];
        cartona += `

             <div class="card forecast text-white p-0" style="background-color: #262936; width: 30%;">
              <div class="forecast-header bg-dark rounded-top px-4 py-2 text-center">
                <div class="day">${new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}</div>
              </div>
              <div class="forecast-content px-3 m-auto">
                <div class="forecast-icon">
                  <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}" width=90>
                </div>
                <div class="degree">
                  <div class="num" style="font-size: 18px; font-weight: 700;">${day.day.maxtemp_c}<sup>o</sup>C</div>
                </div>
                <small style="color: rgb(191, 193, 200);">${day.day.mintemp_c}<sup>o</sup></small>
                <div class="custom">${day.day.condition.text}</div></div>
              </div>
            </div>

        `;
    }
    weather.innerHTML += cartona
}
