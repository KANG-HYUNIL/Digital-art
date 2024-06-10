
//get start btn
const startBtn = document.querySelector('#start');

const firstInfoPage = "first-introduction/firstIntro.html";

//add page change event for click 
startBtn.addEventListener('click', moveFirstInfoPage);

function moveFirstInfoPage(){
    window.location.href = firstInfoPage;
}


