

const canvas = document.getElementById('canvas');
const cvs = canvas.getContext('2d');

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
bird.src = "";
background.src = "../images/background for game2.jpg"


var timer = 0;
const clearTime = 30;

var enemys = [];
var enemySpeed = 3;

var playerWidth = 100;
var dogWidth = 200;
var birdWidth = 200;

var playerSize;
var playerX = 0;
var playerY = 600;

var dogSize;
var dogSpawnX = 1500;
var dogSpawnY = 600;

var birdSize;
var birdSpawnX;
var birdSpawnY;

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

        if(playerX < this.x + this.width
            && playerX + playerSize.width > this.x
            && playerY < this.y + this.height
            && playerY + playerSize.height > this.y
        ){
            gameEnd();
        }

    }


}//class Enemy


function moveObject(){

    cvs.clearRect(0, 0, canvas.width, canvas.height);
    cvs.drawImage(background, 0, -backGroundSize.height + canvas.height, backGroundSize.width, backGroundSize.height);

    drawPlayer();
    enemys.forEach(function (e) {

        e.move();
        e.spawn();
        e.collisionCheck();

    });


}//moveObject


document.addEventListener("keydown", keyDownHandler);

function keyDownHandler(e){


}//keyDownHandler


function gameEnd(){

    if (timer / 60 >= clearTime){
        console.log("Win");
    }

    else{
        console.log("Dead");
    }

}//gameEnd


//60 Frame per sec
function frameActive(){

    requestAnimationFrame(frameActive);
    timer++;



    moveObject();

    if (timer % 240 === 0){

        random = Math.random() * 2;

        if (random <= 1){
            enemys.push(new Enemy(dog, dogSpawnX, dogSpawnY, dogSize));
        }

        else{
            enemys.push(new Enemy(bird, birdSpawnX, birdSpawnY, birdSize));
        }       
    }

    if (timer % 600 === 0){
        enemySpeed += 0.5;
    }

}//frameActive 

cvs.clearRect(0, 0, canvas.width, canvas.height);

frameActive();



