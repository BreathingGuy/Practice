"use strict";

const form = document.querySelector('.lorem-form');
const amount = document.getElementById('amount');
const result = document.querySelector('.lorem-text');
const preloader = document.querySelector('.preloader');
const button = document.querySelector('.btn');

form.addEventListener('submit', (e) => {
    button.classList.add('loadingBtn');
    button.setAttribute('disabled', '');
    result.innerHTML = '';

    e.preventDefault();
    const value = parseInt(amount.value);

    if (isNaN(value) || value <= 0 || value > 40) {
        button.classList.remove('loadingBtn');
        button.removeAttribute('disabled', '');

        result.innerHTML = `<p>Input only number <br> Not less than 0 <br> No more than 40</p>`
    } else {
        preloader.classList.add('active');

        fetch(`http://hipsum.co/api/?type=hipster-centric&sentences=${value}`)
        .then(response => response.json())
        .then(json => {
            button.classList.remove('loadingBtn');
            button.removeAttribute('disabled', '');
            
            preloader.classList.remove('active');
            result.innerHTML = `<p class="result">${json.join()}</p>`
        });
    }
})


