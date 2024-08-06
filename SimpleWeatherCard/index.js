const apiKey = "b9b1d732a08914fe384663dddfb06adf";
const weatherDataElement = document.getElementById("weather-data");
const cityInputElement = document.getElementById("city-input");
const formElement = document.querySelector("form");
formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputElement.value;
  getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
  console.log("weather data");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    const temperature = Math.round(data.main.temp);
    const icon = data.weather[0].icon;
    console.log(icon);
    const description = data.weather[0].description;
    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity}%`,
      `WindSpeed: ${data.wind.speed}m/s`,
    ];
    weatherDataElement.querySelector(
      ".icon"
    ).innerHTML = `<img src= https://openweathermap.org/img/wn/${icon}.png alt="weather icon">`;

    weatherDataElement.querySelector(
      ".temperature"
    ).textContent = `${temperature}°C`;
    weatherDataElement.querySelector(".description").textContent = description;
    weatherDataElement.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
  } catch (error) {}
}
