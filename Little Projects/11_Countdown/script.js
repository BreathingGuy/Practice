"use strict";

const deadline = '2023-10-27';

function getTheRemainingTime(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 * 24)),
          hours = Math.floor((t / (1000 * 60 * 60)) % 24),
          minutes = Math.floor((t / 1000 / 60) % 60),
          seconds = Math.floor((t / 1000) % 60);

    return {
        total: t,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    }
}

function getZero(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`
    } else {
        return num;
    }
}


// //

function setClock(selector, deadline) {
    const clock = document.querySelector(selector),
          days = clock.querySelector('.days'),
          hours = clock.querySelector('.hours'),
          minutes = clock.querySelector('.mins'),
          seconds = clock.querySelector('.seconds');
    
    const timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
        const t = getTheRemainingTime(deadline);

        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    }
}

setClock('.boxes', deadline);

