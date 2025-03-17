//
// VARIABLES
//
const API_KEY = "14ae22d50996a7279216be0e62040a03";

const input = document.getElementById("search");
const searchBtn = document.querySelector(".search-button");
const cityName = document.getElementById("city");
const temp = document.getElementById("temperature");
const wind = document.querySelector(".wind-info p");
const humidityInfo = document.querySelector(".humidity-info p"); 
const pressureInfo = document.querySelector(".pressure-info p");
const wrapper = document.querySelector(".wrapper");
const defaultWrapper = document.querySelector(".default-wrapper");
const weatherImage = document.querySelector(".weather-status img");
const weatherConditions = {
    "Sunny": "clear sky",
    "Cloudy": ["overcast clouds", "scattered clouds", "broken clouds"],
    "Partly cloudy": ["few clouds", "partly cloudy"],
    "Rainy": ["light rain", "moderate rain", "heavy intensity rain", "very heavy rain", "extreme rain"],
    "Stormy": ["thunderstorm"],
    "Snowy": ["light snow", "snow", "heavy snow"]
};
const cards = document.querySelectorAll(".forecast .card p");

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

function generateForecastDates() {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const date = new Date();
    cards.forEach((card, day) => {
        const forecastDate = new Date(date);
        forecastDate.setDate(date.getDate() + day + 1);

        const today = forecastDate.getDate();
        const month = months[forecastDate.getMonth()];
        card.textContent = `${today} ${month}`;
    });
}

function convertToCelsius(temp) {
    return Number(Math.round(parseFloat(temp) - 273.15));
}

function convertToKm(wind) {
    return Number((wind * 3.6).toFixed(2));
}

function getWeatherCondition(currWeatherInfo) {
    const weatherState = currWeatherInfo.weather[0].description;

    Object.entries(weatherConditions).forEach(([condition, values]) => {
        if (Array.isArray(values)) {
            if (values.some(value => weatherState.includes(value))) {
                setWeatherImage(condition);
            }
        }
        else if (weatherState.includes(values)) {
            setWeatherImage(condition);
        }
    });
}

function setWeatherImage(condition) {
    switch(condition) {
        case "Sunny":
            weatherImage.src = "./images/sunny.png";
            break;
        case "Partly cloudy":
            weatherImage.src = "./images/partly_cloudy.png";
            break;
        case "Cloudy":
            weatherImage.src = "./images/cloudy.png";
            break;
        case "Rainy":
            weatherImage.src = "./images/rainy.png";
            break;
        case "Stormy":
            weatherImage.src = "./images/stormy.png";
            break;
        case "Snowy":
            weatherImage.src = "./images/snowy.png";
            break;
    }
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

    getWeatherCondition(currWeatherInfo);
}

/*
async function parseForecastWeatherData(city) {

}
*/


//
// EVENTS
//
getTodaysDate();
generateForecastDates();

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