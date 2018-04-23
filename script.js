let numPlayers = 4;
let course;
let allcourses;

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       allcourses = JSON.parse(this.responseText);
       for(let i = 0; i < allcourses.courses.length; i++){
            let courseid = allcourses.courses[i].id;
            $('.courseDropdown').append('<option value="'+ courseid +'">'+ allcourses.courses[i].name +'</option>');
       }
      }
    };
    xhttp.open("GET", "https://uxcobra.com/golfapi/courses.txt", true);
    xhttp.send();
  }


function createCard(){
    console.log(course);
    for(let i = 0; i < course.data.holes.length; i++){
        $('.right').append('<div id="col' + i + '" class="column"><div class="cheader"><span class="holeName">' + course.data.holes[i].hole +'</span><span class="yards">' + course.data.holes[i].teeBoxes[0].yards + ' YRD</span></div></div>');
    }
    fillCard();
}
function fillCard(){
    for (let p = 0; p < numPlayers; p++){
        for(let h = 0; h < course.data.holes.length; h++){
            $('#col' + h).append('<input id="p'+ p +' h'+ h +'" class="holeInput" type="text"></input>');
        }
    }
}

function loadPlayers(){
    for(let i = 0; i < numPlayers; i++){
        $('.playerContainer').append('<div class="playerLabel ' + (i + 1) + '">PlayerLabel' + (i + 1) + '</div>');
    }
}
function getCourse(courseid){
    console.log(courseid);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       course = JSON.parse(this.responseText);
       $('.right').empty();
       $('.playerContainer').empty();
       loadPlayers();
       createCard();
      }
    };
    xhttp.open("GET", 'https://uxcobra.com/golfapi/course'+ courseid +'.txt', true);
    xhttp.send();
}
loadDoc();