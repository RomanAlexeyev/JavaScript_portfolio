const url = 'http://api.openweathermap.org/data/2.5/weather?q=Volgograd&appid=583856ea872b338f6dbf750beba1e52d&units=metric&lang=ru';
const url2 = 'https://api.openweathermap.org/data/2.5/onecall?lat=48.7194&lon=44.5018&exclude=current,minutely,daily,alerts&appid=583856ea872b338f6dbf750beba1e52d&units=metric';
const tempUnit = '˚';
const humidUnit = '%';
const windUnit = ' м/с';

let currentData;
let forecastData;

async function getData () {
    let response = await fetch (url);
    if (response.ok) {
        let jsonData = response.json();
        return jsonData;
    } else {alert('Ошибка, не удалось получить API состояния погоды для приложения №5')}
}

async function getForecast () {
    let response = await fetch (url2);
    if (response.ok) {
        let jsonDataForecast = response.json();
        return jsonDataForecast;
    } else {alert('Ошибка, не удалось получить API прогноза погоды для приложения №5')}
}

function valueUnit (value, unit) {
    return `${value}${unit}`;
}
  
function getHoursString(dateTime) {
    let date = new Date(dateTime);
    let hours = date.getHours().pad();
  
    return hours;
}

function displayTemp (value) {
    let floorValue = value.toFixed();
    return valueUnit (floorValue, tempUnit)
}

function render (data) {
    renderCurrentDate();
    renderCity (data);
    renderCurrentTemp (data);
    renderCurrentDescription (data);
    renderIcon (data);
    renderDetails (data);
}

function renderCurrentDate () {
    let currentDate = document.querySelector('.current__date');
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    const  months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
    currentDate.innerHTML = `${day} ${months[month]}`;
}

function renderCity (data) {
    let cityName = document.querySelector('.current__city');
    cityName.innerHTML = data.name;
}

function renderCurrentTemp (data) {
    let tmp = data.main.temp;
    let currentTmp = document.querySelector('.current__temperature');
    currentTmp.innerHTML = displayTemp(tmp);
}

function renderCurrentDescription (data) {
    let descript = data.weather[0].description;
    let descriptUpperFirst = descript.charAt(0).toUpperCase() + descript.slice(1);
    let description = document.querySelector('.current__description');
    description.innerHTML = descriptUpperFirst;
}

function renderIcon (data) {
    let icon = data.weather[0].icon;
    let displayIcon = document.querySelector('.current__icon');
    displayIcon.classList.add(`icon__${icon}`)
}

function renderForecast (data) {
    let forecastDiv = document.querySelector('.forecast');
    let forecasts = '';

    for (let w = 0; w < 6; w++) {
        let item = data.hourly[w];
        let temp = displayTemp (item.temp);
        let hours = (w == 0 ? 'сейчас' : `${getHoursString(item.dt*1000)}:00`);

        let template = `<div class="forecast__item">
        <div class="forecast__time">${hours}</div>
        <div class="forecast__temperature">${temp}</div>
      </div>`

      forecasts += template;
    }

    forecastDiv.innerHTML = forecasts;
}

function renderDetails (data) {
    let humidity = valueUnit(data.main.humidity, humidUnit);
    let wind = valueUnit(data.wind.speed, windUnit);

    let humidityValue = document.querySelector('.humidity').querySelector('.details__value');
    let windValue = document.querySelector('.wind').querySelector('.details__value');
    humidityValue.innerHTML = humidity;
    windValue.innerHTML = wind;
}

function start () {
    getData().then(data => {
        currentData = data;
        render(data);
    })

    getForecast().then(data => {
        forecastData = data;
        renderForecast (data);
    })
}

start();