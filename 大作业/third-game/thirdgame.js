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
const endingsSrc = "";

var lvl = 0;
var lvlUp = 3;

//get image
const image1 = new Image();
const image2 = new Image();
const image3 = new Image();
const image4 = new Image();
const image5 = new Image();

image1.src = "";
image2.src = "";
image3.src = "";
image4.src = "";
image5.src = "";


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

    imageSize = changeSize(nextImage, canvas.width);
    
    cvs.drawImage(nextImage, 0, 0, imageSize.width, imageSize.height);
    setBlur(lvl);
    lvl += lvlUp;
}

function wrongAnswer(endingSrc){

    //Need to write codes that show answer is right or wrong
    //After show results and User clicks, active codes below

    window.location.href = endingSrc;
}

//remove all btn events
function removeBtnEvent(Btn){

    Btn.removeEventListener('click', rightAnswer);
    Btn.removeEventListener('click', wrongAnswer);
    Btn.removeEventListener('click', addAllEvent);
}

 
//add rightAnswer function in btn
function addRightAnswer(Btn, nextImage){
    Btn.addEventListener('click', rightAnswer.bind(null, nextImage));
    Btn.addEventListener('click', function (){
        console.log("Right");
    });
     

}

//add wrongAnswer function in btn
function addWrongAnswer(Btn, endingSrc){
    Btn.addEventListener('click', wrongAnswer.bind(null, endingSrc));
    Btn.addEventListener('click', function (){
        console.log("Wrong");
    });
     
}

function addAllEvent(curImageAnswer, nextImage, endingSrc, btnLevel){

 

    //remove all btn event
    removeBtnEvent(yesBtn);
    removeBtnEvent(noBtn);

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

    switch (btnLevel){

        case 2:
           
            curImageAnswer.addEventListener('click', addAllEvent.bind(null, image2Answer, image3, endingsSrc, btnLevel));
        break;
            
        case 3:
           
            curImageAnswer.addEventListener('click', addAllEvent.bind(null, image3Answer, image4, endingsSrc, btnLevel));
        break;

        case 4:
           
            curImageAnswer.addEventListener('click', addAllEvent.bind(null, image4Answer, image5, endingsSrc, btnLevel));
        break;

        //last level?
        case 5:
            
            
        
        break;

    }

}

// if (image1On && image2On && image3On && image4On && image5On){
rightAnswer(image1) //set first image
addAllEvent(image1Answer, image2, endingsSrc, 1);
//}
 