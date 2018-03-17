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
var player1 = "";
var player2 = "";
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreboard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");

//Assign Names
function addPlayerName() {
    $("#add-name").on("click", function(event) {
        if ($("#name-input") === 'Waiting for Player 1') {
            event.preventDefault();
            var player1Name = $("#name-input").val().trim();
            var rpsSelections = $("<div>").attr("#player1-choices");
            var rockDiv = ("<div>").attr("#r");
            var paperDiv = ("<div>").attr("#p");
            var scissorsDiv = ("<div>").attr("#s");
            rpsSelections.appendTo(".player1")
            rockDiv.appendTo("#player1-choices")
            paperDiv.appendTo("#player1-choices")
            scissorsDiv.appendTo("#player1-choices")
            $("#r").html("<img src='assets/images/rock.png' />");
            $("#p").html("<img src='assets/images/paper.png' />");
            $("#s").html("<img src='assets/images/scissors.png' />");
            database.ref().push({
                name: player1Name,
            });
            $(".player1-name").text(player1Name);
            $(".user-badge").text(player1Name);
        }
        else {
            event.preventDefault();
            var player2Name = $("#name-input").val().trim();
            database.ref().push({
                name: player2Name,
            });
            $(".player2-name").text(player2Name);
            $(".computer-badge").text(player2Name);
        }
    });
}

$("<button>").on("click",addPlayerName());

//On Click of rock
$(".r").on("click", function() {
    rockCounter++;
    database.ref().set({
      Rock: rockCounter
    });
  });

//On Click of paper
$(".p").on("click", function() {
    paperCounter++;
    database.ref().set({
      Paper: paperCounter
    });
  });

//On Click of scissors
$(".s").on("click", function() {
    scissorsCounter++;
    database.ref().set({
      Scissors: scissorsCounter
    });
  });

  database.ref().on("value", function(snapshot) {
    $(".r").text(snapshot.val().Rock);
    $(".p").text(snapshot.val().Paper);
    $(".s").text(snapshot.val().Scissors);
    rockCounter = snapshot.val().Rock;
    paperCounter = snapshot.val().Paper;
    scissorsCounter = snapshot.val().Scissors;
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });




































  // RPS Logic
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
