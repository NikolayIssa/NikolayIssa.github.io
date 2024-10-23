const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const upArr = document.querySelector('.up');
const leftArr = document.querySelector('.left');
const downArr = document.querySelector('.down');
const rightArr = document.querySelector('.right');
const stateText = document.querySelector('.snakeGame__stateText');

const startBtn = document.getElementById("start-game");

const ground = new Image();
ground.src = "../src/images/snake/background.png";

const foodImg = new Image();
foodImg.src = "../src/images/snake/food.svg";

const gameOver = new Image();
gameOver.src = "../src/images/snake/GG.png";

const victory = new Image();
victory.src = "../src/images/snake/end.png";

let box = 8;
let score = 0;
let game; // Игровой цикл
let dir;
let snake = [];
let food = {};

function startGame() {
    score = 0;
    dir = null;

    // Начальное положение змеи
    snake = [];
    snake[0] = {
        x: 15 * box,
        y: 18 * box,
    };

    // Начальное положение еды
    food = {
        x: Math.floor(Math.random() * 30) * box,
        y: Math.floor(Math.random() * 36) * box,
    };

    // Запуск игрового цикла
    game = setInterval(drawGame, 120);
}

// Кнопка запуска

startBtn.addEventListener('click', () => {
    startGame();
    stateText.textContent = `press arrows`;
    startBtn.setAttribute('disabled',"");
    startBtn.classList.add('offbtn');
});

// Функция для перезапуска игры
function restartGame() {
    clearInterval(game);  // Останавливаем текущий игровой цикл
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем canvas
    startGame();  // Запускаем игру заново
}

// Функция победы

// Обработка нажатия 

// Обработка направления движения
window.addEventListener("keydown", function(event) {
    // Проверяем, если клавиши влево (37), вверх (38), вправо (39), вниз (40)
    if ([37, 38, 39, 40].includes(event.keyCode)) {
        event.preventDefault();  // Отключаем стандартное поведение (прокрутка)
        // Продолжаем работу с этими клавишами для игры
        direction(event);  // Функция управления направления змейки
    }
});

// Обработка статуса клавиш
window.addEventListener("keyup", function(event) {
    // Проверяем, если клавиши влево (37), вверх (38), вправо (39), вниз (40)
    if ([37, 38, 39, 40].includes(event.keyCode)) {
        event.preventDefault();  // Отключаем стандартное поведение (прокрутка)
        // Продолжаем работу с этими клавишами для игры
        state(event);  // Функция управления направления змейки
    }
});

document.addEventListener("keydown", function (event) {
    if (event.keyCode === 82) {  // Если нажата клавиша "R"
        restartGame();
    }
});

let canMove = true;  // Флаг, который контролирует, можно ли менять направление

function direction(event) {
    if (!canMove) return;  // Если движение заблокировано, выходим

    if (event.keyCode == 37 && dir != "right") {
        dir = "left";
        leftArr.classList.add('keyActive');
    } else if (event.keyCode == 38 && dir != "down") {
        dir = "up";
        upArr.classList.add('keyActive');
    } else if (event.keyCode == 39 && dir != "left") {
        dir = "right";
        rightArr.classList.add('keyActive');
    } else if (event.keyCode == 40 && dir != "up") {
        dir = "down";
        downArr.classList.add('keyActive');
    }

    // Блокируем возможность движения на короткое время
    canMove = false;
    setTimeout(() => {
        canMove = true;  // Разрешаем движение после таймаута
    }, 100);  // Таймаут в 200 миллисекунд (можно настроить)
}

function state(event) {
    if (event.keyCode == 37 && dir != "right"){
        leftArr.classList.remove('keyActive');
    }
    else if (event.keyCode == 38 && dir != "down"){
        upArr.classList.remove('keyActive');
    }
        
    else if (event.keyCode == 39 && dir != "left"){
        rightArr.classList.remove('keyActive');
    }
        
    else if (event.keyCode == 40 && dir != "up"){
        downArr.classList.remove('keyActive');
    } 
}

function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) {
            clearInterval(game);
            stateText.textContent = 'GAME OVER!';
            startBtn.classList.remove('offbtn');
            startBtn.removeAttribute('disabled',"");
            ctx.drawImage(gameOver, 0, 0);
        }

        
    }
}

function highlightImages(score) {
    const images = document.querySelectorAll('.snakeGame__score-list img');
    
    // Удаляем выделение у всех изображений
    images.forEach(img => {
        img.classList.remove('highlight');
    });

    // Добавляем класс выделения к нужным элементам
    images.forEach((img, index) => {
        if (index < score) {
            img.classList.add('highlight');  // Выделяем до текущего значения score
        }
    });
}

function drawGame() {
    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(foodImg, food.x, food.y);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "#43D9AD";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        console.log(score);
        food = {
            x: Math.floor(Math.random() * 31) * box,
            y: Math.floor(Math.random() * 37) * box,
        };

        highlightImages(score);
        if (score == 10){
            clearInterval(game);
            ctx.drawImage(victory, 0, 0);
            stateText.textContent = 'GG!';
            startBtn.classList.remove('offbtn');
            startBtn.removeAttribute('disabled',"");
        }
        
    } else {
        snake.pop();
    }

    // Проверка выхода за границы
    if (snakeX < 0) snakeX = box * 30;
    if (snakeX > box * 30) snakeX = -8;
    if (snakeY < 0) snakeY = box * 36;
    if (snakeY > box * 36) snakeY = -8;

    // Движение змеи
    if (dir == "left") snakeX -= box;
    if (dir == "right") snakeX += box;
    if (dir == "up") snakeY -= box;
    if (dir == "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY,
    };

    eatTail(newHead, snake);
    snake.unshift(newHead);
}


