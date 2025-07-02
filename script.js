var buttonColors = ["red", "green", "yellow", "blue"];

var userClickedPattern = [];
var gamePattern = [];

var started = false;
var level = 0;

function nextSequence(){
    userClickedPattern = [];
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level++;
}


$(".btn").on("click", function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});
function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
    }, 100);
};

$(document).on("keydown",function(){
    if(!started){
        
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success")
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }else if(started === true && gamePattern[currentLevel] !== userClickedPattern[currentLevel]){
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
    var wrong = new Audio("./sounds/wrong.mp3");
    wrong.play();
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200)
  }
}

function startOver(){
    gamePattern = [];
    started = false;
    level = 0;
}
