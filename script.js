//
// VARIABLES
//
const input = document.getElementById("search");
const searchBtn = document.querySelector(".search-button");
const cityName = document.getElementById("city");
const temp = document.getElementById("temperature");
const wind = document.querySelector(".wind-info p");
const humidityInfo = document.querySelector(".humidity-info p"); 
const pressureInfo = document.querySelector(".pressure-info p");
const wrapper = document.querySelector(".wrapper");
const defaultWrapper = document.querySelector(".default-wrapper");
const weatherConditions = {
    "Sunny": "clear sky",
    "Cloudy": ["overcast clouds", "scattered clouds", "broken clouds"],
    "Partly cloudy": ["few clouds", "partly cloudy"],
    "Rainy": ["light rain", "moderate rain", "heavy intensity rain", "very heavy rain", "extreme rain"],
    "Stormy": ["thunderstorm"],
    "Snowy": ["light snow", "snow", "heavy snow"]
};


const API_KEY = "14ae22d50996a7279216be0e62040a03";

//
// FUNCTIONS
//
function getTodaysDate() {
    const daysInWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date();
    const day = daysInWeek[date.getDay()];
    const today = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    document.getElementById("day").textContent = day;
    document.getElementById("date").textContent = `${today} ${month} ${year}`;
}

function convertToCelsius(temp) {
    return Number((parseFloat(temp) - 273.15).toFixed(1));
}

function convertToKm(wind) {
    return Number((wind * 3.6).toFixed(2));
}

async function fetchData(endpoint, city) {
    const url = `https://api.openweathermap.org/data/2.5/${endpoint}?q=${city}&appid=${API_KEY}`;

    try {
        const response = await fetch(url);
        return response.json();
    }
    catch (err) {
        console.error(err);
    }
}

async function parseCurrentWeatherData(city) {
    const currWeatherInfo = await fetchData("weather", city);

    const temperature = convertToCelsius(currWeatherInfo.main.temp);
    const windSpeed = convertToKm(currWeatherInfo.wind.speed);
    const humidity = currWeatherInfo.main.humidity;
    const pressure = currWeatherInfo.main.pressure;

    cityName.textContent = city;
    temp.textContent = `${temperature}°C`;
    wind.textContent = `${windSpeed} km/h`;
    humidityInfo.textContent = `${humidity} %`;
    pressureInfo.textContent = `${pressure} hPa`;
}
/*
function getWeatherCondition() {
    for ()
}
*/
/*
async function parseForecastWeatherData(city) {

}
*/


//
// EVENTS
//
getTodaysDate();

searchBtn.addEventListener("click", () => {
    if (input.value.trim() != "") {
        wrapper.style.display = "block";
        defaultWrapper.style.display = "none";
        parseCurrentWeatherData(input.value);
        input.value = "";
        input.blur();
    }
});

input.addEventListener("keydown", (e) => {
    if (e.key == "Enter" && input.value.trim() != "") {
        wrapper.style.display = "block";
        defaultWrapper.style.display = "none";
        parseCurrentWeatherData(input.value);
        input.value = "";
        input.blur();
    }
})