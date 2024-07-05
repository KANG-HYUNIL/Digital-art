

const canvas = document.getElementById('canvas');
const cvs = canvas.getContext('2d');
const timer = document.querySelector('.timer');

const clearSrc = "../third-introduction/thirdintro.html";
const failSrc = "../endings/ending2.html";


//example canvas width, height
canvas.width = 1200;
canvas.height = 800;

//get image
const player = new Image();
const dog = new Image();
const bird = new Image();
const background = new Image();

player.src = "../images/turtle for game2.png";
dog.src = "../images/dog for game2.png";
bird.src = "../images/bird for game2.webp";
background.src = "../images/background for game2.jpg"

var isRun = true;

var curTime = 0;
const clearTime = 60;
 
 

var enemys = [];
var enemySpeed = 3;

var playerWidth = 100;
var dogWidth = 200;
var birdWidth = 200;

var playerSize;
const playerSpawnY = 600;
const jumpSpeed = 4;
const jumpY = 300;
 
let up = false;
let down = false;

var playerX = 0;
var playerY = 600;




var dogSize;
var dogSpawnX = 1500;
var dogSpawnY = 400;
var dogSpawnY = 400;

var birdSize;
var birdSpawnX = 1500;
var birdSpawnY = 200;
const enemySpeedUp = 0.5;
const spawnInterval = 400;
const speedUpInterval = 600;

 


var backGroundSize;

//change imgs size
function changeSize(img, setWidth){

    const raito = img.height / img.width;
    const newWidth = setWidth;
    const newHeight = setWidth * raito;

    return {width:newWidth, height:newHeight};

}//changeSize


player.onload = function() {

    playerSize = changeSize(player, playerWidth);

}//player.onload

dog.onload = function () {

    dogSize = changeSize(dog, dogWidth);

}

bird.onload = function() {

    birdSize = changeSize(bird, birdWidth);

}

background.onload = function(){
    backGroundSize = changeSize(background, canvas.width)
}


function drawPlayer(){

    cvs.drawImage(player, playerX, playerY, playerSize.width, playerSize.height);

}//drawPlayer

class Enemy{

    constructor(image, enemyX, enemyY, enemySize){

        this.enemyImage = image;
        this.x = enemyX;
        this.y = enemyY;
        this.width = enemySize.width;
        this.height = enemySize.height;
    }//constructor



    move(){

        //requestAnimationFrame(function name);
        this.x -= enemySpeed;
    }//move


    spawn(){

        cvs.drawImage(this.enemyImage, this.x, this.y, this.width, this.height);

    }//spawn


    collisionCheck(){

        
        if(playerX < this.x + this.width * 0.8
            && playerX + playerSize.width * 0.8 > this.x
            && playerY < this.y + this.height * 0.8
            && playerY + playerSize.height * 0.8 > this.y
        ){
            gameEnd();
        }

    }


}//class Enemy


function moveObject(){

    cvs.clearRect(0, 0, canvas.width, canvas.height);
    cvs.drawImage(background, 0, -backGroundSize.height + canvas.height, backGroundSize.width, backGroundSize.height);

    //여기 부분 수정
    if(up){
        playerY -= jumpSpeed;
    }

    else if (down){
        playerY += jumpSpeed;
    }
    
    
    if (playerY < jumpY){
        playerY = jumpY;
    }

    else if (playerY > canvas.height - playerSize.height){
        playerY = canvas.height - playerSize.height;
    }


    drawPlayer();
    enemys.forEach(function (e, i, o) {

        if(e.enemyX < -e.width){
            o.splice(i, 1);
        }
 

        e.move();
        e.spawn();
        e.collisionCheck();

    });


}//moveObject


 

function keyDownHandler(e){

    if(e.key == "ArrowUp") {
        up = true;
    }
    else if(e.key == "ArrowDown") {
        down = true;
    }
    
  

}//keyDownHandler


function keyUpHandler(e){

    if( e.key == "ArrowUp") {
        up = false;
    }
    else if(e.key == "ArrowDown") {
        down = false;
    }

}

function gameEnd(){

    isRun = false;

    if (curTime / 60 >= clearTime){
        alert("Clear!");
        window.location.href = clearSrc;
    }

    else{
        alert("Caught!");
        window.location.href = failSrc;
    }

}//gameEnd

function setTimer(){
    timer.innerHTML = "Score : " + parseInt(curTime / speedUpInterval);

}//setTimer




//60 Frame per sec
function frameActive(){

    if (!isRun) return;

    requestAnimationFrame(frameActive);
    curTime++;

    moveObject();

    if (curTime % spawnInterval === 0){

        random = Math.random() * 2;

        if (random <= 1){
            
            while(random < 400){
                random = Math.random() * 600;
            }

            enemys.push(new Enemy(dog, dogSpawnX, random, dogSize));
        }

        else{
            random = Math.random() * 600;

            enemys.push(new Enemy(bird, birdSpawnX, random, birdSize));
        }       
    }

    if (curTime % speedUpInterval === 0){
        enemySpeed += enemySpeedUp;
    }

    setTimer();
    
}//frameActive 

cvs.clearRect(0, 0, canvas.width, canvas.height);

document.getElementById('overlay').addEventListener('click', function () {

    this.style.display = 'none';
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler, false);
    frameActive();

  });



 



