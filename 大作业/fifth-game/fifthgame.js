const canvas = document.getElementById('canvas');
const cvs = canvas.getContext('2d');

//set canvas width, heigth
canvas.width = 900;
canvas.height = 600;

const clearSrc = "../trueEnd/trueEnd.html";
const failSrc = "../endings/ending5.html";



const up = "up";
const right = "right";
const left = "left";
const down = "down";



var image1= new Image();
var image2= new Image();
var image3= new Image();
var image4= new Image();
var image5= new Image();
var image6= new Image();
var image7= new Image();
var image8= new Image();
var image9= new Image();
var image10= new Image();

image1.src = "../images/Level 1.jpg"
image2.src = "../images/Level 2.jpg"
image3.src = "../images/Level 3.jpg"
image4.src = "../images/Level 4.jpg"
image5.src = "../images/Level 5.jpg"
image6.src = "../images/Level 6.jpg"
image7.src = "../images/Level 7.jpg"
image8.src = "../images/Level 8.jpg"
image9.src = "../images/Level 9.jpg"
image10.src = "../images/Level 10.jpg"



var image1Answer = up;
var image2Answer = right;
var image3Answer = down;
var image4Answer = up;
var image5Answer = left;
var image6Answer = up;
var image7Answer = right;
var image8Answer = left;
var image9Answer = left;
var image10Answer = down;


var imageLvl = 1;
var blurLvl = 1;
var blurLvlUp = 0;

var imageAnswer;
var userAnswer;

//set image blur function
function setBlur(blurLvl){
    canvas.style.filter = `blur(${blurLvl}px)`;
}

//change imgs size
function changeSize(img, setWidth){

    const raito = img.height / img.width;
    const newWidth = setWidth;
    const newHeight = setWidth * raito;

    return {width:newWidth, height:newHeight};

}//changeSize

 

//check answer is correct or wrong
function checkAnswer(){

    if (userAnswer != null){

        if (userAnswer == imageAnswer){
             
            imageLvlUp();
        }

        else{

            alert("Wrong way");
            window.location.href = failSrc;
             
        }

    }

    else{
        
    }

}

function imageLvlUp(){

    setBlur(0);
     

    imageLvl++;
    var img;

    switch(imageLvl){

        case 2:
            alert("Correct");
            img = image2;
            imageAnswer = image2Answer;
        break;


        case 3:
            alert("Correct");
            img = image3;
            imageAnswer = image3Answer;
        break;


        case 4:
            alert("Correct");
            img = image4;
            imageAnswer = image4Answer;
        break;

        case 5:
            alert("Correct");
            img = image5;
            imageAnswer = image5Answer;
        break;


        case 6:
            alert("Correct");
            img = image6;
            imageAnswer = image6Answer;

        break;

        case 7:
            alert("Correct");
            img = image7;
            imageAnswer = image7Answer;
        break;

        case 8 :
            alert("Correct");
            img = image8;
            imageAnswer = image8Answer;
        break;

        case 9:
            alert("Correct");
            img = image9;
            imageAnswer = image9Answer;
        break;

        case 10:
            alert("Correct");
            img = image10;
            imageAnswer = image10Answer;
        break;

        case 11:
            alert("Arrived");
            window.location.href = clearSrc;
        break;

    }

    blurLvl += blurLvlUp;
    imageSize = changeSize(img, canvas.width);
    cvs.drawImage(img, 0, 0, imageSize.width, imageSize.height);
    setBlur(blurLvl);
}


function gameStart() {

    document.addEventListener("keydown", function(e){

        if(e.key == "ArrowRight") {
            userAnswer = right;
        }
        else if( e.key == "ArrowLeft") {
            userAnswer = left;
        }
        else if( e.key == "ArrowUp") {
            userAnswer = up;
        }
        else if(e.key == "ArrowDown") {
            userAnswer = down;
        }
    
        else{
            userAnswer = null;
        }

        checkAnswer();

    });

  }


document.getElementById('overlay').addEventListener('click', function () {

    this.style.display = 'none';

    imageSize = changeSize(image1, canvas.width);
    cvs.drawImage(image1, 0, 0, imageSize.width, imageSize.height);
    imageAnswer = image1Answer;
    setBlur(blurLvl);

    gameStart();

  });
  

