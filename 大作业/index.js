
//get start btn
const startBtn = document.querySelector('#start');

const firstInfoPage = ""

//add page change event for click 
startBtn.addEventListener('click', moveFirstInfoPage);

function moveFirstInfoPage(){
    window.location.href = firstInfoPage;
}


