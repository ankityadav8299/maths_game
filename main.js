var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

// if we click on the start/stop

document.getElementById("startgame").onclick = function(){
    //IF WE ARE PLAYING
    if(playing==true)
    {
       location.reload(); //to reload the page
       
    
    }
    else{
        // if we are not playing
          // set score = 0;
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
          //show countdown box
          document.getElementById("timeremain").style.display ="block";
          timeremaining = 5;
          // hide game over box
          hide("gameover")
          document.getElementById("timeremainingvalue").innerHTML = timeremaining;
          // change button to reset
          document.getElementById("startgame").innerHTML = "Reset Game";
          // change playing mode to true
          playing = true;

          // start countdown
          startcountdown();
          // generate questions
          generate();
    }
}
 // start counter
function startcountdown(){
  action = setInterval(function(){
    timeremaining--;
    document.getElementById("timeremainingvalue").innerHTML = timeremaining;
    if(timeremaining == 0){ //gameover
       stopcountdown();
    }
  },1000)

}
// stop counter
function stopcountdown(){
  clearInterval(action);
  show("gameover")
  document.getElementById("scorefinal").innerHTML=score;
  /* i can do it like this  
  document.getElementById("scorefinal").innerHTML="your score is +score+";*/
  // time box diappear
  
  hide("timeremain");
  hide("correct");
  hide("tryagain");
  playing= false;
  document.getElementById("startgame").innerHTML="reset game";
}

// hide elements 
function hide(id){
  document.getElementById(id).style.display = "none";
}
// show elements
function show(id){
  document.getElementById(id).style.display = "block";
}
// change elements
function change(id,val){
  document.getElementById(id).innerHTML = val;
}

// generate question
function generate(){
  var x = 1+Math.round(9* Math.random());
  var y = 1+Math.round(9* Math.random());
  correctAnswer = x*y;
  change("question",x + "X" +y);
  var correctPosition = 1+Math.round(3* Math.random());
  change(("box"+correctPosition),correctAnswer) // filling the options with correct answer

  // generating wrong answers for other options
   var answer = [correctAnswer]; 
  for(i=1;i<5;i++)
  {
    if(i !== correctPosition)
    {
      var wrong = (1+Math.round(9*Math.random()))*(1+Math.round(9*Math.random()));
      while(answer.indexOf(wrong) > -1){
        var wrong = (1+Math.round(9*Math.random()))*(1+Math.round(9*Math.random()));}
       
      change(("box"+i),wrong);
      answer.push(wrong);
      
    }
  }
  
}

for(i = 1;i<5;i++)
{
// clicking on the right answer
document.getElementById("box"+i).onclick = function(){
  // checking if we are playing
  if(playing == true)
  {
    // checking answer is correct or not
    if(this.innerHTML == correctAnswer)
    {
      score++; 
      hide("tryagain");
      show("correct");
      change("scorevalue",score);
      setTimeout(function(){
        hide("correct");
      },1000);
      // generate new questions
      generate();
      timeremaining = 5;
      // startcountdown();
    }
    else
    {
      // wrong
      hide("correct");
      hide("tryagain");
      setTimeout(function(){
        hide("tryagain");
      },1000);
    }
  }
}
}