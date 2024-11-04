const cityInput = document.getElementById("city-input");
const getWeatherBtn = document.getElementById("get-weather-btn");
const weatherInfo = document.getElementById("weather-info");

// API ключ для OpenWeatherMap
const API_KEY = "20b0aa0ca5d68e56a8d6f2a554656731"; // Замініть на свій API ключ

getWeatherBtn.addEventListener("click", function() {
    const city = cityInput.value;
    if (city) {
        getWeather(city);
    }
});

function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Місто не знайдено');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            weatherInfo.innerHTML = `<p style="color: red;">${error.message}</p>`;
        });
}

function displayWeather(data) {
    const { name, main, weather } = data;
    weatherInfo.innerHTML = `
        <h2>${name}</h2>
        <p>Температура: ${main.temp} °C</p>
        <p>Стан: ${weather[0].description}</p>
        <p>Вологість: ${main.humidity}%</p>
    `;
}
