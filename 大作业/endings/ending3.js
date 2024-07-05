

const mainPageBtn = document.querySelector(".mainPage");
const indexSrc = "../index.html"

const retryBtn = document.querySelector(".retry");
const retrySrc = "../third-game/thirdgame.html"

mainPageBtn.addEventListener("click", function(){
   window.location.href = indexSrc; 
});

retryBtn.addEventListener("click", function(){
   window.location.href = retrySrc;
});

window.localStorage.setItem("ending3", "true");
