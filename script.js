const apiKey = "46180124f03d33d3adb83019bf3eae62";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  var data = await response.json();

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

searchBtn.addEventListener("click", () => {
  if (searchBox.value === "") {
    console.log("empty search box");
  } else {
    checkWeather(searchBox.value);
    searchBox.value = "";
  }
});

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
