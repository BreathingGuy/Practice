"use strict";

const simpleColors = ['red', 'yellow', 'blue', 'green', 'orange', 'white', 'black', 'violet', 'gray', 'brown'];
let turnedSimpleButton = true;
let turnedHexButton = false;

const body = document.querySelector('.body')
const colorButton = document.querySelector('.color-button');
const span = document.querySelector('.colorSpan');
const simple = document.querySelector('.simple');
const hex = document.querySelector('.hex');


// TRANSLATING FUNCT
function decimal(max, min) {
    let arrNum = [];
    for (let i = 0; i < 3; i++) {
        arrNum.push(Math.floor(Math.random() * (max - min)) + min);
    }
    return arrNum;
}

function hexiDecimal(arr) {
    let hexi = '';
    for (let i = 0; i < 3; i++) {
        hexi += arr[i].toString(16);
    }
    return hexi.length == 5 ? hexi + '0' : hexi;
}


// DOM FUNCT
simple.addEventListener('click', e => {
    turnedSimpleButton = true;
    turnedHexButton = false;
});

hex.addEventListener('click', e => {
    turnedSimpleButton = false;
    turnedHexButton = true;
})

colorButton.addEventListener('click', e => {
    if (!turnedSimpleButton) {
        let variable = hexiDecimal(decimal(255, 1));
        body.style.backgroundColor = `#${variable}`;
        span.textContent = `#${variable}`;
    } else {
        let variable = simpleColors[(decimal(9, 1)[1])];
        body.style.backgroundColor = `${variable}`;
        span.textContent = `${variable}`;
    }
})