
let typeWrite = document.querySelector(".TypeWrite");
let nextPage = document.querySelector("#nextPage");

const nextpageURL = "../first-game/firstgame.html";
let textAry = ["Text TypeWrite Test", "Test 2"];

const typeDelay = 100;
const startDelay = 1000;

let textIdx = 0;
let charIdx = 0;


function type(){

    if (textIdx < textAry.length){

        if(charIdx < textAry[textIdx].length){

            typeWrite.innerHTML += textAry[textIdx][charIdx];
            charIdx++;
            setTimeout(type, typeDelay);
        }
    
        else{
            
            textIdx++;
            charIdx = 0;
            typeWrite.innerHTML += '<br/>';
            setTimeout(type, typeDelay);
    
        }

    }


    else{

        setTimeout(appearText, startDelay);
    }

     

}




function appearText(){

    nextPage.style.display = "block";

    document.addEventListener("click", function(){
        window.location.href = nextpageURL;
    });

    
     
}

document.addEventListener("DOMContentLoaded",function() {

    setTimeout(type, startDelay);

});






