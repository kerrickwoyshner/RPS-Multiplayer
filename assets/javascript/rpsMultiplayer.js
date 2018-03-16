var config = {
    apiKey: "AIzaSyDwNjRZxA5mxXFvf4OaZ2xcsZk3cumBWYU",
    authDomain: "rps-multiplayer-3a562.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-3a562.firebaseio.com",
    projectId: "rps-multiplayer-3a562",
    storageBucket: "",
    messagingSenderId: "1035037079181"
  };

firebase.initializeApp(config);

// Declaring constants
var userScore = 0;
var computerScore = 0;
var database = firebase.database();
var rockCounter = 0;
var paperCounter = 0;
var scissorsCounter = 0;
var Player1 = 0;
var Player2 = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreboard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");

// On Click of rock
//$(".r").on("click", function() {
    //rockCounter++;
    //database.ref().set({
      //Rock: rockCounter
    //});
  //});

  // On Click of paper
  // $(".p").on("click", function() {
    // paperCounter++;
    // database.ref().set({
      //Paper: paperCounter
    //});
  //});

  // On Click of scissors
  //$(".s").on("click", function() {
    //scissorsCounter++;
    //database.ref().set({
      //Scissors: scissorsCounter
    //});
  //});

  //database.ref().on("value", function(snapshot) {
    //console.log(snapshot.val());
    //$(".r").text(snapshot.val().Rock);
    //$(".p").text(snapshot.val().Paper);
    //$(".s").text(snapshot.val().Scissors);
    //rockCounter = snapshot.val().Rock;
    //paperCounter = snapshot.val().Paper;
    //scissorsCounter = snapshot.val().Scissors;
  //}, function(errorObject) {
    //console.log("The read failed: " + errorObject.code);
  //});

function changePlayer1Name() {
    $("#add-name").on("click", function(event) {
        event.preventDefault();
        var a = $("#add-name").val().trim();
        $(".player1-name").push(a);
      });
}

$("<button>").on("click",changePlayer1Name());


//$("#name-input").on("value", function() {
    //$(".player1-name").text("value".val());
//})

function getComputerChoice() {
    const choices = ['r', 'p', 's'];
    //random number generated from 0 -> 3
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

function convertToWord(letter) {
    if (letter ==="r") return "Rock";
    if (letter ==="p") return "Paper";
    return "Scissors";
};

function win(userChoice, computerChoice) {
    userScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = convertToWord(userChoice) + " beats " + convertToWord(computerChoice) + ". YOU WIN!!!";
}

function lose(userChoice, computerChoice) {
    computerScore++;
    computerScore_span.innerHTML = computerScore;
    userScore_span.innerHTML = userScore;
    result_p.innerHTML = convertToWord(userChoice) + " loses to " + convertToWord(computerChoice) + ". You lost...";
}

function draw(userChoice, computerChoice) {
    result_p.innerHTML = convertToWord(userChoice) + " matches " + convertToWord(computerChoice) + ". It's a draw!";
}

function game(userChoice) {
    const computerChoice = getComputerChoice();
    switch (userChoice + computerChoice) {
        case "rs":
        case "pr":
        case "sp":
            win(userChoice, computerChoice);
            break;
        case "rp":
        case "ps":
        case "sr":
            lose(userChoice, computerChoice);
            break;
        case "rr":
        case "pp":
        case "ss":
            draw(userChoice, computerChoice);
            break;
    }
}

function main() {
rock_div.addEventListener('click', () => game("r"));
paper_div.addEventListener('click', () => game("p"));
scissors_div.addEventListener('click', () => game("s"));
}

main();
