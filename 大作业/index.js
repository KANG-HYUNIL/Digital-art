
//get start btn
const startBtn = document.querySelector('#start');
const firstInfoPage = "first-introduction/firstIntro.html";

const endingsBtn = document.getElementById("endings");
const endingSrc = "ach/ach.html";

const moreBtn = document.getElementById("more");
const moreSrc = "";

//add page change event for click 
startBtn.addEventListener('click', moveFirstInfoPage);


function moveFirstInfoPage(){
    window.location.href = firstInfoPage;
}


