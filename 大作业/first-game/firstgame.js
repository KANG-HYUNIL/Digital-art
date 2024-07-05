
//get canvas
const canvas = document.getElementById('canvas');
const cvs = canvas.getContext('2d');
const timer = document.querySelector('.timer');

const clearSrc = "../second-introduction/secondintro.html";
const failSrc = "../endings/ending1.html";

//set images sprite
const player = new Image();
const enemy = new Image();
player.src = "../images/turtle egg for game1.jpg";
enemy.src = "../images/hands for game1.jpg";

let enemySpawnInterval, moveObjectInterval, timerInterval;

//variables for movement
let right = false;
let left = false;
let up = false;
let down = false;
const movementspeed = 3;


//players rect variables
let rectX = 350;
let rectY = 350;

//move interval and image size
const interval = 10;
const setWidth = 50;

var playerSize;
var enemySize;


var enemySpeed = 3;
var levelCount = 0;
var enemySpeedUpRate = 1;
var levelUpInterval = 5000;
var curTime = 0
const clearTime = 30;

//Enemy Class
class Enemy {

    constructor(enemyX, enemyY, moveX, moveY, outOfBound){
        this.enemyX = enemyX
        this.enemyY = enemyY;
        
        this.moveX = moveX;
        this.moveY = moveY;
        this.outOfBound = outOfBound;
    }//constructor

    //enemy movement function
    move(){

        this.enemyX += this.moveX * enemySpeed;
        this.enemyY += this.moveY * enemySpeed;

        //if enemy's position is out of canvas
        if(this.outOfBound == 0 && this.enemyY > canvas.height){
            this.enemyX = Math.random()*(canvas.width - enemySize.width);
            this.enemyY = -enemySize.height;

        }

        else if (this.outOfBound == 1 && this.enemyX < -enemySize.width){
            this.enemyX = canvas.width;
            this.enemyY = Math.random() * (canvas.height - enemySize.height);

        }

        else if (this.outOfBound == 2 && this.enemyY < -enemySize.height){
            this.enemyX = Math.random()*(canvas.width - enemySize.width);
            this.enemyY = canvas.height + enemySize.height;

 
        }

        else if (this.outOfBound == 3 && this.enemyX > canvas.width){
            this.enemyX = -enemySize.width;
            this.enemyY = Math.random() * (canvas.height - enemySize.height);

        }


    }//move

}//Enemy class

//List for Enemy
var Enemys = []

//change imgs size
function changeSize(img, setWidth){

    const raito = img.height / img.width;
    const newWidth = setWidth;
    const newHeight = setWidth * raito;

    return {width:newWidth, height:newHeight};

}//changeSize


//draw canvas
function drawPlayer(){

    cvs.clearRect(0,0, canvas.width, canvas.height);    
    playerSize = changeSize(player, setWidth);
    cvs.drawImage(player, rectX, rectY, playerSize.width, playerSize.height);
    
}//drawPlayer

//draw canvas when player image successfully loaded
player.onload = function () {

    drawPlayer();
}
 

enemy.onload = function(){
    enemySize = changeSize(enemy, setWidth);
}


 

//method for keydown 
function keyDownHandler(e) {

    if(e.key == "ArrowRight") {
		right = true;
	}
	else if(e.key == "ArrowLeft") {
	  left = true;
    }

    if(e.key == "ArrowUp") {
        up = true;
    }
    else if(e.key == "ArrowDown") {
        down = true;
    }
}//keyDownHandler

//method for keyup
function keyUpHandler(e){

    if(e.key == "ArrowRight") {
        right = false;
    }
    else if( e.key == "ArrowLeft") {
        left = false;
    }
    else if( e.key == "ArrowUp") {
        up = false;
    }
    else if(e.key == "ArrowDown") {
        down = false;
    }
}//keyUpHandler

function moveObject(){

    if (right){
        rectX += movementspeed;
    }

    else if (left){
        rectX -= movementspeed;
    }

    if(up){
        rectY -= movementspeed;
    }

    else if (down){
        rectY += movementspeed;
    }

    if (rectX < 0){
        rectX = 0;
    }

    else if (rectX > canvas.width - playerSize.width){
        rectX = canvas.width - playerSize.width
    }

    if (rectY < 0){
        rectY = 0;
    }

    else if (rectY > canvas.height - playerSize.height){
        rectY = canvas.height - playerSize.height
    }

    drawPlayer();
    moveEnemy();
}//moveObject

function enemySpawn(){

    var x;
    var y;
    var moveX;
    var moveY;
    var outOfBound;

    switch (levelCount % 4){
        
        //spawn at top
        case (0):
            x = Math.random()*(canvas.width - enemySize.width);
            y = -enemySize.height;
            moveX = 0;
            moveY = 1;
            outOfBound = 0;

            break;
        
        //spawn at right
        case (1):

            x = canvas.width;
            y = Math.random() * (canvas.height - enemySize.height);
            moveX = -1;
            moveY = 0
            outOfBound = 1;
            break;

        //spawn at bottom
        case (2) :

            x = Math.random()*(canvas.width - enemySize.width);
            y = canvas.height + enemySize.height;
            moveX = 0;
            moveY = -1;
            outOfBound = 2;
            break;

        //spawn at left        
        case (3) :

            x = -enemySize.width;
            y = Math.random() * (canvas.height - enemySize.height);
            moveX = 1;
            moveY = 0
            outOfBound = 3;
            enemySpeed += enemySpeedUpRate;
            break;

    
    }

    levelCount++;

    Enemys.push(new Enemy(x, y, moveX, moveY, outOfBound));

}//enemySpawn

function collisionCheck(e){

    if (rectX < e.enemyX + enemySize.width 
        && rectX + playerSize.width > e.enemyX 
        && rectY < e.enemyY + enemySize.height 
        && rectY + playerSize.height > e.enemyY){
        gameEnd();
    }
  
}//collisionCheck


function moveEnemy(){

    Enemys.forEach(function(e) {
        e.move();
        cvs.drawImage(enemy, e.enemyX, e.enemyY, enemySize.width, enemySize.height);
        collisionCheck(e);
         
    });
    
}//moveEnemy

function setTimer(){
    curTime++;
    timer.innerHTML = "Time : " + curTime;

}//setTimer

function gameEnd(){

    clearInterval(levelUpInterval);
    clearInterval(moveObjectInterval);
    clearInterval(timerInterval);

    if (curTime >= clearTime){
        alert("Clear!");
        window.location.href = clearSrc;
    }

    else{
        alert("Caught!");
        window.location.href = failSrc;
    }

}

function gameStart(){
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    levelUpInterval = setInterval(enemySpawn, levelUpInterval); //enemySpawn interval
    moveObjectInterval = setInterval(moveObject, interval); //moveObject interval
    timerInterval = setInterval(setTimer, 1000); //timer interval
}

document.getElementById('overlay').addEventListener('click', function () {

    this.style.display = 'none';
    gameStart();

  });


 

