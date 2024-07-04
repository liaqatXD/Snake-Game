const snake = document.createElement("div");
const food = document.createElement('div');
food.className = "food";
snake.className = "snake";
const gameBoard = document.querySelector("#game_board");
const menu = document.querySelector("#menu");
const score = document.querySelector("#score span");
let snakeParts = [];
const gridRowLines = 16;
const gridColumLines = 16;
let intervalId = null;

window.addEventListener('keydown', (e) => {

    if (e.key === ' ') {
        if (!menu.classList.contains('hide')) {
            menu.classList.toggle("hide");
            addSnakeAndFood();
            moveSnake("ArrowRight");
        }
    }
    switch (e.key) {
        case "ArrowRight":
        case "ArrowLeft":
        case "ArrowUp":
        case "ArrowDown":
            if (intervalId) clearInterval(intervalId);
            direction = e.key;
            moveSnake(direction);
            break;

    }
})

function addSnakeAndFood() {
    snake.style.gridColumnStart = 1;
    snake.style.gridRowStart = 1;
    food.style.gridColumnStart = randomNo();
    food.style.gridRowStart = randomNo();
    gameBoard.append(snake);
    gameBoard.append(food);

}

function moveSnake(key) {
    switch (key) {
        case "ArrowRight":
            intervalId = setInterval(() => {
                if (snake.style.gridColumnStart < gridColumLines - 1) {
                    for (let i = 0; i < snakeParts.length; i++) {
                        if (i === 0) {
                            snakeParts[0].style.gridColumnStart = snake.style.gridColumnStart;
                            snakeParts[0].style.gridRowStart = snake.style.gridRowStart;
                        }
                        else {
                            snakeParts[i].style.gridColumnStart = snakeParts[i - 1].style.gridColumnStart - 1;
                            snakeParts[i].style.gridRowStart = snakeParts[i - 1].style.gridRowStart;

                        }
                    }
                    snake.style.gridColumnStart++;
                    checkFoodCollision();
                }


                else {
                    resetGame();

                }
            }, 150)
            break;
        case "ArrowLeft":
            intervalId = setInterval(() => {
                const previousPositon = snake.style.gridColumnStart;
                const newPosition = previousPositon - 1;
                if (newPosition !== 0) {
                    snakeParts.forEach((snakePart) => {
                        snakePart.style.gridColumnStart = previousPositon;
                        snakePart.style.gridRowStart = snake.style.gridRowStart;
                    })
                    snake.style.gridColumnStart = newPosition;
                    checkFoodCollision();

                }
                else resetGame();

                if (snake.style.gridColumnStart === 1) resetGame()
            }, 150)
            break;
        case "ArrowDown":
            intervalId = setInterval(() => {
                if (snake.style.gridRowStart < gridRowLines - 1) {
                    snakeParts.forEach((snakePart) => {
                        snakePart.style.gridRowStart = snake.style.gridRowStart
                        snakePart.style.gridColumnStart = snake.style.gridColumnStart;
                    })
                    snake.style.gridRowStart++;

                    checkFoodCollision();
                }
                else resetGame()
            }, 150)
            break;
        case "ArrowUp":
            intervalId = setInterval(() => {
                const previousPositon = snake.style.gridRowStart;
                const newPosition = previousPositon - 1;

                if (newPosition !== 0) {
                    snake.style.gridRowStart = newPosition;
                    snakeParts.forEach((snakePart) => {
                        snakePart.style.gridRowStart = previousPositon;
                        snakePart.style.gridColumnStart = snake.style.gridColumnStart;
                    })
                    checkFoodCollision();

                }
                else resetGame();


            }, 150)
            break;

    }
    checkCollision();
}

function generateFood() {
    updateScore();
    growSnake();
    food.style.gridColumnStart = randomNo();
    food.style.gridRowStart = randomNo();
}
function randomNo() {
    return Math.floor(Math.random() * (gridColumLines - 1)) + 1;
}
function resetGame() {
    clearInterval(intervalId);
    score.innerHTML = 0;
    snake.remove();
    food.remove();
    snakeParts.forEach((snake) => snake.remove())
    snakeParts = [];
    menu.classList.remove("hide");
}

function updateScore() {
    score.innerHTML = Number(score.innerHTML) + 1;
}
function checkFoodCollision() {
    if (snake.style.gridRowStart === food.style.gridRowStart && snake.style.gridColumnStart === food.style.gridColumnStart) {
        generateFood();
    }
}

function moveSnake(key) {
    switch (key) {
        case "ArrowRight":
            intervalId = setInterval(() => {
                if (snake.style.gridColumnStart < gridColumLines - 1) {
                    moveSnakeParts();
                    snake.style.gridColumnStart++;
                    checkCollision();
                    checkFoodCollision();
                } else {
                    resetGame();
                }
            }, 150);
            break;
        case "ArrowLeft":
            intervalId = setInterval(() => {
                if (snake.style.gridColumnStart > 1) {
                    moveSnakeParts();
                    snake.style.gridColumnStart--;
                    checkCollision();
                    checkFoodCollision();
                } else {
                    resetGame();
                }
            }, 150);
            break;
        case "ArrowDown":
            intervalId = setInterval(() => {
                if (snake.style.gridRowStart < gridRowLines - 1) {
                    moveSnakeParts();
                    snake.style.gridRowStart++;
                    checkCollision();
                    checkFoodCollision();
                } else {
                    resetGame();
                }
            }, 150);
            break;
        case "ArrowUp":
            intervalId = setInterval(() => {
                if (snake.style.gridRowStart > 1) {
                    moveSnakeParts();
                    snake.style.gridRowStart--;
                    checkCollision();
                    checkFoodCollision();
                } else {
                    resetGame();
                }
            }, 150);
            break;
    }
}

function moveSnakeParts() {
    if (snakeParts.length > 0) {
        for (let i = snakeParts.length - 1; i > 0; i--) {
            snakeParts[i].style.gridColumnStart = snakeParts[i - 1].style.gridColumnStart;
            snakeParts[i].style.gridRowStart = snakeParts[i - 1].style.gridRowStart;
        }
        snakeParts[0].style.gridColumnStart = snake.style.gridColumnStart;
        snakeParts[0].style.gridRowStart = snake.style.gridRowStart;
    }
}

function growSnake() {
    const snakePart = document.createElement("div");
    snakePart.className = "snake";
    snakeParts.push(snakePart);
    snakePart.style.gridColumnStart = snake.style.gridColumnStart;
    snakePart.style.gridRowStart = snake.style.gridRowStart;
    gameBoard.append(snakePart);
}

function checkCollision() {

    for (let i = 0; i < snakeParts.length; i++) {
        if (snake.style.gridColumnStart === snakeParts[i].style.gridColumnStart && snake.style.gridRowStart === snakeParts[i].style.gridRowStart) {
            resetGame();
        }
    }
}