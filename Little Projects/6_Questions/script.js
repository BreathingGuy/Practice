"use strict";

// traversing the DOM 

// const btns = document.querySelectorAll('.question-btn');

// btns.forEach(item => {
//     item.addEventListener('click', e => {
//         const question = e.currentTarget.parentElement.parentElement;
//         for (let i = 0; i < btns.length; i++) {
//             if (btns[i] == item) {
//                 continue;
//             }
//             if (btns[i].parentElement.parentElement.classList.contains('show-text')) {
//                 btns[i].parentElement.parentElement.classList.remove('show-text')
//             }
//         }
//         question.classList.toggle('show-text');
//     })
// });




// using selectors inside the element

const questions = document.querySelectorAll('.question');

questions.forEach(question => {
    const btn = question.querySelector('.question-btn');

    btn.addEventListener('click', e => {
        for (let i = 0; i < questions.length; i++) {
            if (questions[i] != question) {
                questions[i].classList.remove('show-text')
            };
        }
        question.classList.toggle('show-text');
    });
})