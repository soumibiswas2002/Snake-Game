const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// creating unit
let box = 32;

//load images
const ground = new Image();
ground.src = "img/ground.png";
const foodImg = new Image();
foodImg.src = "img/food.png";

//load audio
let dead = new Audio();
let down = new Audio();
let eat = new Audio();
let left = new Audio();
let right = new Audio();
let up = new Audio();
let bg=new Audio();
let award=new Audio("audio/award.mp3");

dead.src = "audio/dead.mp3";
down.src = "audio/down.mp3";
eat.src = "audio/eat.mp3";
left.src = "audio/left.mp3";
right.src = "audio/right.mp3";
up.src = "audio/up.mp3";
bg.src="audio/bg.wav";

//creat the snake
let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box
};

//creat food
let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box
};

//creat score variable
let score = 0;

// Controlling snake
let d;
document.addEventListener("keydown", function(event) {
  key = event.keyCode;
  if (key == 37 && d != "RIGHT") {
    d = "LEFT";
    left.play();
  } else if (key == 38 && d != "DOWN") {
    d = "UP";
    up.play();
  } else if (key == 39 && d != "LEFT") {
    d = "RIGHT";
    right.play();
  } else if (key == 40 && d != "UP") {
    d = "DOWN";
    down.play();
  }
});
document.addEventListener("keypress", function(event) {
  if (event.keyCode == 13 || event.keyCode == 32 || event.keyCode == 27) {
    location.reload();
  }
})

/*high score part */
// get item from localStorage
let hiscore= localStorage.getItem("hiscore");

//check if data is not empty
if (hiscore===null) {
  hiscoreval=0;
  localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else {
  hiscoreval=JSON.parse(hiscore);
  hs.innerHTML="🏆HIGHSCORE : "+ hiscoreval;
}


/* draw everything in canvas */
function draw() {
  //drawing ground
  ctx.drawImage(ground, 0, 0); //variable.drawImage(imagename,x,y)

  // drawing Snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = (i == 0) ? "green" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }
  //drawing food
  ctx.drawImage(foodImg, food.x, food.y);

  //Moving Snake
  //old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  //which direction
  if (d == "LEFT")
    snakeX -= box;
  if (d == "RIGHT")
    snakeX += box;
  if (d == "UP")
    snakeY -= box;
  if (d == "DOWN")
    snakeY += box;

  //if the snake eats food
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    if(score>hiscoreval){
      award.play();
      /*highscore part*/
      hiscoreval=score;
      localStorage.setItem("hiscore",JSON.stringify(score));
      hs.innerHTML="🏆HIGHSCORE : "+ hiscoreval;
    }
    eat.play();
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box
    }


  }
  else {
    //remove tail
    snake.pop();
  }

  //add new Head
  let newHead = {
    x: snakeX,
    y: snakeY
  }

  //Game Over
  if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
    clearInterval(game);
    dead.play();
    bg.pause();
  }

  snake.unshift(newHead);

  //score
  ctx.fillStyle = "white";
  ctx.font = "45px Changa one";
  ctx.fillText(score, 2 * box, 1.6 * box);
}


//call draw function every 100 ms
let game = setInterval(draw, 100);



//check collision function
function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y)
      return true;
  }
  return false;
  
}

  document.addEventListener("keydown", function(event) {
    if (event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 38 || event.keyCode == 40) {
      bg.play();
    }
  })
