
const deleteBtn = document.getElementById("delete");

const ending1Btn = document.getElementById("ending1");
const ending2Btn = document.getElementById("ending2");
const ending3Btn = document.getElementById("ending3");
const ending4_1Btn = document.getElementById("ending4-1");
const ending4_2Btn = document.getElementById("ending4-2");
const ending5Btn = document.getElementById("ending5");
const trueEndBtn = document.getElementById("trueEnd");

const ending1Image = "url('../images/ending_background.jpg')";
const ending2Image = "url('../images/ending_background.jpg')";
const ending3Image = "url('../images/ending_background.jpg')";
const ending4_1Image = "url('../images/ending_background.jpg')";
const ending4_2Image = "url('../images/ending_background.jpg')";
const ending5Image = "url('../images/ending5_background.jpg')";
const trueEndImage = "url('')";


const btnAry = [ending1Btn, ending2Btn, ending3Btn, ending4_1Btn, ending4_2Btn, ending5Btn, trueEndBtn];
const imageAry = [ending1Image, ending2Image, ending3Image, ending4_1Image, ending4_2Image, ending5Image, trueEndImage]
const keyAry = ["ending1", "ending2", "ending3", "ending4-1", "ending4-2", "ending5", "trueEnd"];
const endingsSrc = [
    "../endings/ending1.html",
    "../endings/ending2.html",
    "../endings/ending3.html",
    "../endings/ending4-1.html",
    "../endings/ending4-2.html",
    "../endings/ending5.html",
    "../trueEnd/trueEnd.html"];

function deleteLocalStorage(){

    if(confirm("Delete?")){

        for (i = 0; i < keyAry.length; i++){
            window.localStorage.removeItem(keyAry[i]);
        }

        alert("Deleted");
        location.reload();
    }

    else{
        
    }

  
}

const indexBtn = document.getElementById("indexBtn");
const indexSrc = "../index.html"
indexBtn.addEventListener("click", function(){
   window.location.href = indexSrc; 
});

deleteBtn.addEventListener("click", deleteLocalStorage);

for (let i = 0; i < btnAry.length; i++){

    if (localStorage.getItem(keyAry[i])){
        btnAry[i].style.backgroundImage = imageAry[i];

        endSrc = endingsSrc[i];
        btnAry[i].innerHTML = "";
        btnAry[i].addEventListener('click', function(){
            window.location.href = endSrc;
        });
    }

    else{
        // btnAry[i].style.backgroundImage = notFoundImage;
    }

};

