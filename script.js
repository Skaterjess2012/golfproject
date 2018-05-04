let numPlayers = 4;
let course;
//let allcourses;
let totalArray = [];

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

class ScoreCard{
    constructor(){
        this.course;
        this.allcourses;
        this.numPlayers;
        this.loadDoc();
    }
    loadDoc(){
        $.get('https://uxcobra.com/golfapi/courses.txt', function(data, status){
            this.allcourses = JSON.parse(data);
        });
    }
    getCourse(){
        console.log(this.allcourses);
        console.log(stuff);
    }
}
//let stuff = new ScoreCard();


function createCard(){
    console.log(course);
    for(let i = 0; i < course.data.holes.length; i++){
        $('.right').append('<div id="col' + i + '" class="column"><div class="cheader"><span class="holeName">' + course.data.holes[i].hole +'</span><span class="yards">' + course.data.holes[i].teeBoxes[0].yards + ' YRD</span></div></div>');
    }
    $('.right').append('<div class="In"><span class="tHeader">In</span></div>');
    $('.right').append('<div class="Out"><span class="tHeader">Out</span></div>');
    fillCard();
}
$(document).on('keyup', '.holeInput', function(e){
    let item = $(this);
    let cord = {x:item.attr('x'), y:item.attr('y')};
    let curItemArrayObj = totalArray[cord.y][cord.x];
    let rowTotalIn = 0;
    let rowTotalOut = 0;
    
    if(item.val() % 1 !== 0) {
        item.val('');
        item.css('background: red');
    } else {
        item.css('background: transparent');
        if(item.val() !== "") {
            curItemArrayObj.val = Number(item.val());
            for(let i = 0; i < totalArray[cord.y].length; i++){
                if (i < 9) {
                    rowTotalIn = rowTotalIn + totalArray[cord.y][i].val;
                    rowTotalOut = rowTotalIn;
                }else {
                    rowTotalOut = rowTotalOut + totalArray[cord.y][i].val;
                }
            }
            console.log('in:' + rowTotalIn);
            console.log('out:' + rowTotalOut);
            console.log($('.in').find('#total' + cord.y));
            $('.in').find('#total' + cord.y).html(rowTotalIn);
            $('.out').find('#total' + cord.y).html(rowTotalOut);
        }
    }
});


function fillCard(){
    for (let p = 0; p < numPlayers; p++){//how many rows
        let curRow = [];
        for(let h = 0; h < course.data.holes.length; h++){//how many columns
            let curCol = {};
            $('#col' + h).append('<input x="'+ h +'" y="'+ p +'" id="p'+ p +' h' + h + '" class="holeInput" type="text"></input>');
            curCol.val = 0;
            curRow.push(curCol);
        }
        $('.In').append('<div id="total'+ p +'" class="totalBox">0</div>');
        $('.Out').append('<div id="total'+ p +'" class="totalBox">0</div>');
        totalArray.push(curRow);
        
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