
let typeWrite = document.querySelector(".TypeWrite");
let nextPage = document.querySelector("#nextPage");

const nextpageURL = "../third-game/thirdgame.html";
let textAry = ["你成功回到了海里！","你在爬行过程中记住了这片孕育你的沙滩","终有一日你会回到这里"];

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






