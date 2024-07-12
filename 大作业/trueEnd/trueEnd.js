const mainPageBtn = document.querySelector(".mainPage");
const indexSrc = "../index.html"

mainPageBtn.addEventListener("click", function(){
   window.location.href = indexSrc; 
});

window.localStorage.setItem("trueEnd", "true");