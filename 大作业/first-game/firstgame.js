
//get canvas
const canvas = document.getElementById('canvas');
const cvs = canvas.getContext('2d');


//set images sprite
const player = new Image();
const enemy = new Image();
player.src = "../images/turtle egg for game1.jpg";
enemy.src = "../images/hands for game1.jpg";

//variables for movement
let right = false;
let left = false;
let up = false;
let down = false;
const movementspeed = 3;

//players rect variables
let rectX = 350;
let rectY = 350;

const interval = 10;
const setWidth = 50;

//change imgs size
function changeSize(img, setWidth){

    const raito = img.height / img.width;
    const newWidth = setWidth;
    const newHeight = setWidth * raito;

    return {width:newWidth, height:newHeight};

}


//draw canvas
function drawPlayer(){

    cvs.clearRect(0,0, canvas.width, canvas.height);    
    var size = changeSize(player, setWidth);
    cvs.drawImage(player, rectX, rectY, size.width, size.height);
    
}

//draw canvas when player image successfully loaded
player.onload = function () {

    drawPlayer();
}
 

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

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
}

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
}

function movePlayer(){

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

    drawPlayer();

}


setInterval(movePlayer, interval);
