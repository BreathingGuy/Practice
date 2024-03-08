"use strict";

const buttons = document.querySelectorAll('.button');
const articles = document.querySelectorAll('.article-text');
const about = document.querySelector('.article');

about.addEventListener('click', e => {
    const id = e.target.dataset.id;

    if (id) {
        buttons.forEach(btn => {
            if (btn.dataset.id == id) {
                btn.classList.add('pressed');
            } else {
                btn.classList.remove('pressed');
            }
        });

        articles.forEach((article) => {
            if (article.dataset.id == id) {
                article.classList.add('active')
            } else {
                article.classList.remove('active');
            }
        })
    }
})
