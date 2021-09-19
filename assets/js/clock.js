const hour = document.getElementById('clock-hour'),
    minutes = document.getElementById('clock-minutes'),
    seconds = document.getElementById('clock-seconds');

const clock = () => {
    let date = new Date()
    let hh = date.getHours() * 30,
        mm = date.getMinutes() * 6,
        ss = date.getSeconds() * 6;

    hour.style.transform = `rotateZ(${hh + mm/12}deg)`
    minutes.style.transform = `rotateZ(${mm}deg)`
    seconds.style.transform = `rotateZ(${ss}deg)`
}

setInterval(clock, 1000)

const textHour = document.getElementById('text-hour'),
      textMinutes = document.getElementById('text-minutes'),
      dateDay = document.getElementById('date-day'),
      dateMonth = document.getElementById('date-month'),
      dateYear = document.getElementById('date-year');

Number.prototype.pad = function(size) {
    let s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}

const clockText = () => {
    let date = new Date();

    let hh = date.getHours().pad(),
        mm = date.getMinutes().pad(),
        day = date.getDate(),
        month = date.getMonth(),
        year = date.getFullYear()

    textHour.innerHTML = `${hh}:`
    textMinutes.innerHTML = `${mm}`

    const  months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

    dateDay.innerHTML = day;
    dateMonth.innerHTML = `${months[month]}`
    dateYear.innerHTML = year;

}

setInterval(clockText, 1000)


