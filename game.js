var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
//initially buttons are disabled
$(".btn").prop("disabled", true);


$(".rules-heading").click(function(){
  $(".rules p").slideToggle(100);
});

$(document).keydown(function() {
  // execute this only for the first keydown event
  if (!started) {
    setTimeout(function() {
      $(".btn").prop("disabled", false);
      nextSequence();
      started = true;
    }, 200);

  }
});

$(".btn").click(function() {

  var userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  //empty the array for each next level
  userClickedPattern = [];
  // Increment level each time this function is called
  level++;
  // Change heading displaying the current level
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(40).fadeIn(40);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    $("#level-title").text("Uhh Ohh! Click here to restart");
    $("#level-title").click(function() {
      location.reload();
    });
    //Incase wrong button is selected, this sound is played
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 150);
    //Disable buttons after player loses
    $(".btn").prop("disabled", true);
    $("button").addClass("disable-btn");
  }
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 40);
}
