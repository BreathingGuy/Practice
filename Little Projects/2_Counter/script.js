"use strict";

// const numCounter = document.querySelector('.container-counter-number');
const btns = document.querySelectorAll('.button');
const value = document.querySelector('#value');
// const decreaseBtn = document.querySelector('.decrease');
// const resetBtn = document.querySelector('.reset');
// const increaseBtn = document.querySelector('.increase');

let count = 0;

// LISTENERS BUTTONS
// decreaseBtn.addEventListener('click', e => {
//     count -= 1;
//     numCounter.textContent = `${count}`;
//     numCounter.style.color = 'red';
//     if (count < 0) {
//         numCounter.style.color = 'red';
//     }
// });

// resetBtn.addEventListener('click', e => {
//     count = 0;
//     numCounter.textContent = `${count}`;
//     numCounter.style.color = 'black';
// });

// increaseBtn.addEventListener('click', e => {
//     count += 1;
//     numCounter.textContent = `${count}`;
//     if (count > 0) {
//         numCounter.style.color = 'green';
//     }
// });

btns.forEach(btn => {
    btn.addEventListener('click', e => {
        const styles = e.currentTarget.classList;
        
        if (styles.contains('decrease')) {
            count--;
            if (count < 0) {
                value.style.color = 'red';
            }
        } else if (styles.contains('increase')) {
            count++;
            if (count > 0) {
                value.style.color = 'green';
            }
        } else {
            count = 0;
            value.style.color = 'black';
        }
        value.textContent = count;
    })
})