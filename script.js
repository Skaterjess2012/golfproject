let golfholes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
let numPlayers = 4;
let course;

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       course = JSON.parse(this.responseText);
       console.log(course);
       createCard();
      }
    };
    xhttp.open("GET", "holes.txt", true);
    xhttp.send();
  }


function createCard(){
    for(let i = 0; i < course.holes.length; i++){
        $('.right').append('<div id="col' + i + '" class="column"><div class="cheader"><span class="holeName">' + course.holes[i].name +'</span><span class="yards">' +  + '</span></div></div>');
        console.log(course.holes[i].name);
        console.log(course.holes[i]);
    }
    fillCard();
}
function fillCard(){
    for (let p = 0; p < numPlayers; p++){
        for(let h = 0; h < course.holes.length; h++){
            $('#col' + h).append('<input id="p'+ p +' h'+ h +'" class="holeInput" type="text"></input>');
        }
    }
}

function loadPlayers(){
    for(let i = 0; i < numPlayers; i++){
        $('.left').append('<div class="playerLabel ' + (i + 1) + '">PlayerLabel' + (i + 1) + '</div>');
    }
}
loadDoc();
loadPlayers();