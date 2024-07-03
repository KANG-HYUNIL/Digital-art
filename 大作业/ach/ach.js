
const deleteBtn = document.getElementById("delete");

const ending1Btn = document.getElementById("ending1");
const ending2Btn = document.getElementById("ending2");
const ending3Btn = document.getElementById("ending3");
const ending4Btn = document.getElementById("ending4");
const ending5Btn = document.getElementById("ending5");
const trueEndBtn = document.getElementById("trueEnd");

const ending1Image = "url('')";
const ending2Image = "url('')";
const ending3Image = "url('')";
const ending4Image = "url('')";
const ending5Image = "url('')";
const trueEndImage = "url('')";
const notFoundImage = "url('')";

const btnAry = [ending1Btn, ending2Btn, ending3Btn, ending4Btn, ending5Btn, trueEndBtn];
const imageAry = [ending1Image, ending2Image, ending3Image, ending4Image, ending5Image, trueEndImage]
const keyAry = ["ending1", "ending2", "ending3", "ending4", "ending5", "trueEnd"];

function deleteLocalStorage(){

    if(confirm("Delete?")){

        for (i = 0; i < keyAry.length; i++){
            window.localStorage.removeItem(keyAry[i]);
        }
        alert("Deleted");
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

for (i = 0; i < btnAry.length; i++){

    if (localStorage.getItem(keyAry[i])){
        btnAry[i].style.backgroundImage = imageAry[i];
    }

    else{
        btnAry[i].style.backgroundImage = notFoundImage;
    }

};

