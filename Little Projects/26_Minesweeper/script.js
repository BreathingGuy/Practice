"use strict";

// DOM
const cells = document.querySelectorAll('.cell');
const btn = document.querySelector('.btn-flag');
const restartBtn = document.querySelector('.btn-restart');


// JS vars 
let arr = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];
let hash = new Map();
let pressed = false;

window.addEventListener('DOMContentLoaded', setGame);

// Button to put flags
btn.addEventListener('click', (e) => {
    if (!pressed) {
        pressed = true;
        btn.classList.add('clicked');
    } else {
        pressed = false;
        btn.classList.remove('clicked');
    }
});

// Button to restart 
restartBtn.addEventListener('click', (e) => {
    arr = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ];
    hash = new Map();

    cells.forEach((item) => {
        item.classList.remove('clicked');
        item.classList.remove('flag');
        item.classList.remove('bomb');
        item.classList.remove(`x${item.innerText}`);
        item.innerText = '';
    });

    setGame();

    restartBtn.classList.remove('restart');
})

// Set listener to cell
function setCell(e) {
    if (!pressed) {
        let row = e.target.dataset.row;
        let col = e.target.dataset.col;

        if (arr[row][col] === 0) {
            clickZero(row, col);
        } else if (arr[row][col] == '*') {
            if (e.target.classList.contains('flag')) {
                e.target.classList.remove('flag');
            }
            e.target.innerText = '*';
            e.target.classList.add('bomb');
            restartBtn.classList.add('restart');
            gameOver();
        } else {
            if (e.target.classList.contains('flag')) {
                e.target.classList.remove('flag');
            }
            e.target.classList.add('clicked');
            e.target.classList.add(`x${arr[row][col]}`);
            e.target.innerText = `${arr[row][col]}`;
        }
    } else {
        if (!e.target.classList.contains('clicked')) {
            e.target.classList.toggle('flag');
        }
    }
}

// GAMEOVER 
function gameOver() {
    cells.forEach((item) => {
        item.removeEventListener('click', setCell);
    })
}

// Set starting game
function setGame() {
    setBombs(10, arr, hash);
    setNumbers(arr, hash);
    arr = removeInf(arr);

    console.log(arr);

    // EventListeners to cells 
    cells.forEach((cell) => {
        cell.addEventListener('click', setCell);
    });
}

// Функция для автоматического открытия пустых полей
function clickZero(row, col) {
    row = Number(row);
    col = Number(col);

    // Проверяем, что указанные координаты находятся внутри игрового поля
    if (row < 0 || row >= arr.length || col < 0 || col >= arr[0].length) {
        return;
    }

    if (arr[row][col] == 0) {
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);

        // Проверяем, что клетка не была открыта ранее
        if (cell.classList.contains('clicked')) {
            return;
        }

        cell.classList.add('clicked');
        cell.innerText = '0';

        // Рекурсивно открываем соседние клетки с нулями
        clickZero(row + 1, col - 1);
        clickZero(row + 1, col);
        clickZero(row + 1, col + 1);

        clickZero(row, col - 1);
        clickZero(row, col + 1);

        clickZero(row - 1, col - 1);
        clickZero(row - 1, col);
        clickZero(row - 1, col + 1);

    } else {
        // Если не ноль, то открываем цифру
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        cell.classList.add('clicked');
        cell.classList.add(`x${arr[row][col]}`);
        cell.innerText = `${arr[row][col]}`;
    }
}

// Function to randomly set bombs
function setBombs(quantity, arr, hash) {
    let set = new Set();

    for (let i = 0; i < quantity; i++) {
        let f = Math.floor(Math.random() * 7 + 1);
        let s = Math.floor(Math.random() * 7 + 1);
        let v = Number(`${f}${s}`)

        if (!set.has(v)) {
            if (hash.has(f)) {
                hash.get(f).push(s);
            } else {
                hash.set(f, [s]);
            }
            set.add(v);
            arr[f][s] = Infinity;
        } else {
            i--;
        }
    }
}

// Function to set numbers 
function setNumbers(arr, hash) {
    for (let i = 0; i < arr.length; i++) {
        if (hash.has(i)) {
            let row = hash.get(i);

            for (let j = 0; j < row.length; j++) {
                let place = row[j];
                let test = place + 1 === arr.length;

                if (i === 0) {
                    arr[i + 1][place - 1] += 1;
                    arr[i + 1][place] += 1;
                    arr[i + 1][place + 1] += 1;

                    arr[i][place - 1] += 1;
                    arr[i][place + 1] += 1;

                    if (test) {
                        arr[i].pop();
                        arr[i + 1].pop();
                    }
                } else if (i === arr.length - 1) {
                    arr[i - 1][place - 1] += 1;
                    arr[i - 1][place] += 1;
                    arr[i - 1][place + 1] += 1;

                    arr[i][place - 1] += 1;
                    arr[i][place + 1] += 1;

                    if (test) {
                        arr[i].pop();
                        arr[i - 1].pop();
                    }
                } else {
                    arr[i + 1][place - 1] += 1;
                    arr[i + 1][place] += 1;
                    arr[i + 1][place + 1] += 1;

                    arr[i - 1][place - 1] += 1;
                    arr[i - 1][place] += 1;
                    arr[i - 1][place + 1] += 1;

                    arr[i][place - 1] += 1;
                    arr[i][place + 1] += 1;

                    if (test) {
                        arr[i].pop();
                        arr[i - 1].pop();
                        arr[i + 1].pop();
                    }
                }
            }
        }
    }
}

// Filter Infinity to '*'
function removeInf(arr) {
    return arr.map(function (currValue) {
        return currValue.map(function (val) {
            if (val === Infinity) {
                return val = '*';
            } else {
                return val;
            }
        })
    });
}

