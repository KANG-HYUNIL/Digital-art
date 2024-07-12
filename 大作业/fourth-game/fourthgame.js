
const container = document.getElementById('table-container');
const clearSrc = "../fifth-introduction/fifthintro.html";
const pollutionSrc = "../endings/ending4-1.html";
const fishingNetSrc = "../endings/ending4-2.html";

var nowX;
var nowY;


var pollutionChk = false;
var fishingNetChk = false;

var map=[
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,4,0,0,0,0,1,1,0,2],
    [1,0,1,1,1,1,1,1,1,1,0,5,0,0,1],
    [1,5,1,0,0,4,0,0,0,1,1,0,1,0,1],
    [1,0,1,0,1,1,0,1,0,1,0,0,1,0,1],
    [1,0,1,0,1,1,0,5,0,1,0,1,1,0,1],
    [1,0,1,0,1,0,0,1,0,1,0,0,1,0,1],
    [1,0,1,0,1,0,1,0,1,0,1,0,5,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,1,0,1],
    [1,1,0,1,1,0,1,0,1,1,0,1,1,0,1],
    [1,0,0,0,1,0,1,0,1,1,0,0,1,0,1],
    [1,0,1,0,1,4,1,0,0,1,1,0,0,0,1],
    [1,0,1,0,1,0,1,1,0,1,1,4,1,0,1],
    [1,3,0,0,0,0,0,0,0,1,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];


function Board(){

    let table = "<table>";

            for (var i = 0; i < map.length; i++) {
                table += "<tr>";

                for (var j = 0; j < map[0].length; j++) {
                    table += "<td id='x" + i + "y" + j + "'></td>";
                }

                table += "</tr>";
            }

            table += "</table>";
    container.innerHTML = table;
}

 

function ChangeColor(x,y,color){
    document.getElementById("x"+x+"y"+y+"").bgColor=color;
}

function drawmaze(){
    for(var i=0; i<15; i++){
        for(var j=0; j<15; j++){
            if(map[i][j]==1){
                ChangeColor(i,j,"#980000"); //Wall
            }
            else if(map[i][j]==2){
                ChangeColor(i,j,"#0080FF"); //Exit
            }
            
            else if(map[i][j]==0){
                ChangeColor(i,j,"white");
                document.getElementById("x"+i+"y"+j).innerHTML="<img src=''>"
            }

            else if(map[i][j] == 4){
                ChangeColor(i, j, "Black");
                document.getElementById("x"+i+"y"+j).innerHTML="<img src='../images/fishing net for game4.jpg' width='40' height='40'>" //Light, yello
            }

            else if (map[i][j] == 5){
                ChangeColor(i, j, "808080"); //Pollution, gray
            }


            if(map[i][j]==3){                    
                //ChangeColor(i,j,"#90E4FF");
                document.getElementById("x"+i+"y"+j).innerHTML="<img src='../images/turtle for game4.jpg' width='40' height='40'>"
            }

        }
    }
}

function erase(){
    for(var i=0; i<15; i++){
        for(var j=0; j<15; j++){
            ChangeColor(i,j,"white");
        }
    }
}

function pollutionCheck(map){
    return map[nowX][nowY] == 5;
}

function fishingNetCheck(map){
    return map[nowX][nowY] == 64;
}

function inputFunction(input){      
        
    

    switch(input){
        case 56://up
            map[nowX][nowY]=0;
            nowX--;            
            if(map[nowX][nowY]==1){
                nowX++;
            }

            

            map[nowX][nowY]=3;


            break;

        case 54://right
            map[nowX][nowY]=0
            nowY++;
            if(map[nowX][nowY]==1){
                nowY--;
            }


            else if(map[nowX][nowY]==2){
                alert("Exit");
                window.location.href = clearSrc;
            }
            map[nowX][nowY]=3;


        break;

        case 52://left
            map[nowX][nowY]=0;
            nowY--;
            if(map[nowX][nowY]==1){
                nowY++;
            }


            map[nowX][nowY]=3;


        break;

        case 50://down
            map[nowX][nowY]=0;
            nowX++;
            if(map[nowX][nowY]==1){
                nowX--;
            }


            map[nowX][nowY]=3;


        break;

    }

    
    //이 아래의 2개 함수는 매 이동에 따라 미로를 지우고 다시 그리는 함수.
    erase();
    drawmaze();
    


    if (pollutionCheck()){
        pollutionChk = true;
    }

    else if (fishingNetCheck()){
        fishingNetChk = true;
    }

}



document.getElementById('overlay').addEventListener('click', function () {

    this.style.display = 'none';
    Board();
    drawmaze();    

    nowX=13;
    nowY=1;

    document.addEventListener('keydown', function(event) {

        let input;
        switch(event.key){

            case 'w':
            case 'ArrowUp':
                input = 56; // up
                break;

            case 'd':
            case 'ArrowRight':
                input = 54; // right
                break;
            case 'a':
            case 'ArrowLeft':
                input = 52; // left
                break;
            case 's':
            case 'ArrowDown':
                input = 50; // down
                break;
            default:
                return; // Exit if it's not a valid key

        }

        inputFunction(input);

      

        if (pollutionChk){
            alert("pollution");
            window.location.href = pollutionSrc;
        }

        else if (fishingNetChk){
            alert("fishingNet");
            window.location.href = fishingNetSrc;

        }

    });

  });

 

