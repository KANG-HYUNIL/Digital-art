

const mainPageBtn = document.querySelector(".mainPage");
const indexSrc = "../index.html"

const retryBtn = document.querySelector(".retry");
const retrySrc = "../fourth-game/fourthgame.html";

mainPageBtn.addEventListener("click", function(){
   window.location.href = indexSrc; 
});

retryBtn.addEventListener("click", function(){
   window.location.href = retrySrc;
});

window.localStorage.setItem("ending4-3", "true");

