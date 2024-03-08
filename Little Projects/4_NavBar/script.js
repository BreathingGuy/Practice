"use strict";

// classList - show/gets all classes
// contains - checks classList for specific class
// add - add class
// remove - remove class
// toggle - toggle class

const barBtn = document.querySelector('.icon');
const links = document.querySelector('.links');

barBtn.addEventListener('click', e => {
    links.classList.toggle('show-links');
})

