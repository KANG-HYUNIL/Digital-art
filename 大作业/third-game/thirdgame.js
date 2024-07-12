const canvas = document.getElementById('canvas');
const cvs = canvas.getContext('2d');

const yesBtn = document.getElementById('yes');
const noBtn = document.getElementById("no");

//set canvas width, heigth
canvas.width = 900;
canvas.height = 600;

 

const image1Answer = yesBtn;
const image2Answer = noBtn;
const image3Answer = noBtn;
const image4Answer = yesBtn;
const image5Answer = noBtn;
const clearSrc = "../fourth-introduction/fourthintro.html";
const failSrc = "../endings/ending2.html";

var eventListener = [];

var lvl = 1;
var lvlUp = 4;

//get image
const image1 = new Image();
const image2 = new Image();
const image3 = new Image();
const image4 = new Image();
const image5 = new Image();

image1.src = "../images/image1-for-game3.jpg";
image2.src = "../images/image2-for-game3.jpg";
image3.src = "../images/image3-for-game3.jpg";
image4.src = "../images/image4-for-game3.jpg";
image5.src = "../images/image5 for game3.jpg";


var image1On = false;
var image2On = false;
var image3On = false;
var image4On = false;
var image5On = false;

image1.onload = function(){
    image1On = true;
};

image2.onload = function(){
    image2On = true;
};
image3.onload = function(){
    image3On = true;
};
image4.onload = function(){
    image4On = true;
};
image5.onload = function(){
    image5On = true;
};


//set image blur function
function setBlur(lvl){
    canvas.style.filter = `blur(${lvl}px)`;
}

//change imgs size
function changeSize(img, setWidth){

    const raito = img.height / img.width;
    const newWidth = setWidth;
    const newHeight = setWidth * raito;

    return {width:newWidth, height:newHeight};

}//changeSize

function rightAnswer(nextImage){

    //Need to write codes that show answer is right or wrong
    //After show results and User clicks, active codes below

    setBlur(0);
    alert("Good!");

    imageSize = changeSize(nextImage, canvas.width);
    
    cvs.drawImage(nextImage, 0, 0, imageSize.width, imageSize.height);
    setBlur(lvl);
    lvl += lvlUp;
}

function wrongAnswer(endingSrc){

    //Need to write codes that show answer is right or wrong
    //After show results and User clicks, active codes below
    setBlur(0);
    alert("Oops!");
    window.location.href = endingSrc;
}

//remove all btn events
function removeBtnEvent(){

    eventListener.forEach(({element, event, handler}) => {
        element.removeEventListener(event, handler);
    });
    eventListener = []

}

function addTrackedEvent(element, event, handler){
    element.addEventListener(event, handler);
    eventListener.push({element, event, handler});
}

 
//add rightAnswer function in btn
function addRightAnswer(Btn, nextImage){
    const rightAnswerEvent = rightAnswer.bind(null, nextImage);
    addTrackedEvent(Btn, 'click', rightAnswerEvent);
    addTrackedEvent(Btn, 'click', function(){
        console.log("Right");
    });

}

//add wrongAnswer function in btn
function addWrongAnswer(Btn, endingSrc){
    const wrongAnswerEvent = wrongAnswer.bind(null, endingSrc);
    addTrackedEvent(Btn, 'click', wrongAnswerEvent);
    addTrackedEvent(Btn, 'click', function(){
        console.log("Wrong");
    });
     
}

function addAllEvent(curImageAnswer, nextImage, endingSrc, btnLevel){

 

    //remove all btn event
     
    removeBtnEvent();


    //add new btn events
    if (curImageAnswer == yesBtn){
        addRightAnswer(yesBtn, nextImage);
        addWrongAnswer(noBtn, endingSrc);
         
    }

    else if (curImageAnswer == noBtn){
        addWrongAnswer(yesBtn, endingSrc);
        addRightAnswer(noBtn, nextImage);
 
    }

    btnLevel++;
    console.log(btnLevel);
    switch (btnLevel){

        //image1 btn
        case 1:
            addTrackedEvent(curImageAnswer, 'click', addAllEvent.bind(null, image2Answer, image3, failSrc, btnLevel));
            //curImageAnswer.addEventListener('click', addAllEvent.bind(null, image2Answer, image3, clearSrc, btnLevel));
        break;
            
        //image2 btn
        case 2:
            addTrackedEvent(curImageAnswer, 'click', addAllEvent.bind(null, image3Answer, image4, failSrc, btnLevel));
            //curImageAnswer.addEventListener('click', addAllEvent.bind(null, image3Answer, image4, clearSrc, btnLevel));
        break;

        //image3 btn
        case 3:
            addTrackedEvent(curImageAnswer, 'click', addAllEvent.bind(null, image4Answer, image5, failSrc, btnLevel));
            //curImageAnswer.addEventListener('click', addAllEvent.bind(null, image4Answer, image5, clearSrc, btnLevel));
        break;

        //image4 btn
        //last level?
        case 4:

            addTrackedEvent(curImageAnswer, 'click', addAllEvent.bind(null, image5Answer, image5, failSrc, btnLevel));
        
            
        
        break;

        //image5 btn
        case 5:
            removeBtnEvent();

            if (image5Answer == yesBtn){
                yesBtn.addEventListener('click', moveNextPage);
                noBtn.addEventListener('click', wrongAnswer);
            }

            else{
                yesBtn.addEventListener('click', wrongAnswer);
                noBtn.addEventListener('click', moveNextPage);
            }


        break;

    }

}

function moveNextPage(){
    window.location.href = clearSrc;
}

function gameStart(){
    var imageSize = changeSize(image1, canvas.width);
    cvs.drawImage(image1, 0, 0, imageSize.width, imageSize.height);


   
    
    addAllEvent(image1Answer, image2, failSrc, 0);
    
}

document.getElementById('overlay').addEventListener('click', function () {

    this.style.display = 'none';
    gameStart();

  });


