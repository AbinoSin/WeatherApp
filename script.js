"use strict";

// API variables
const apiKey = "46180124f03d33d3adb83019bf3eae62";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

// Accessing html elements
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Defining user interaction by mouse click (or search button)
searchBtn.addEventListener("click", () => {
  if (searchBox.value === "") {
    console.log("empty search box");
  } else {
    checkWeather(searchBox.value);
    searchBox.value = "";
  }
});

// Defining user interaction by keyboard enter key
searchBox.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    if (searchBox.value === "") {
      console.log("empty search box");
    } else {
      checkWeather(searchBox.value);
      searchBox.value = "";
    }
  }
});

// Function for whole weather api logic
async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  let data = await response.json();

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    document.querySelector(".error").style.display = "none";
    document.querySelector(".weather").style.display = "block";
  }

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML =
    Math.round(data.main.temp) + "&deg;c";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

  if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "assets/clouds.png";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "assets/clear.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src = "assets/drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.src = "assets/mist.png";
  } else if (data.weather[0].main == "rain") {
    weatherIcon.src = "assets/rain.png";
  } else if (data.weather[0].main == "snow") {
    weatherIcon.src = "assets/snow.png";
  } else {
    weatherIcon.src = "assets/wind.png";
  }
}
