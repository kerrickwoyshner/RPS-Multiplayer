  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDwNjRZxA5mxXFvf4OaZ2xcsZk3cumBWYU",
    authDomain: "rps-multiplayer-3a562.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-3a562.firebaseio.com",
    projectId: "rps-multiplayer-3a562",
    storageBucket: "rps-multiplayer-3a562.appspot.com",
    messagingSenderId: "1035037079181"
  };
  firebase.initializeApp(config);

// Declaring constants
var userScore = 0;
var computerScore = 0;
var database = firebase.database();
var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");
var rockCounter = 0;
var paperCounter = 0;
var scissorsCounter = 0;
var player1 = "";
var player2 = "";
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreboard_div = document.querySelector(".score-board");

connectedRef.on("value", function(snap) {
  if (snap.val()) {
    var con = connectionsRef.push(true);
    con.onDisconnect().remove();
  }
});

//Assign Names
function addPlayerName() {
    $("#add-name").on("click", function(event) {
        if ($('.player1-name').text() === 'Waiting for Player 1') {
            event.preventDefault();
            var player1Name = $('#name-input').val().trim();
            database.ref().push({
                player:1, name: player1Name, wins:0, losses:0
            });
            $(".player1-name").text(player1Name);
            $(".user-badge").text(player1Name);
            var rpsSelectionsPlayer1 = $("<div>");
            rpsSelectionsPlayer1.addClass("player1-choices").appendTo(".player1");
            
                rockDiv = $("<div>");
                rockDiv.addClass("choice").appendTo(rpsSelectionsPlayer1);
                rockDiv.attr('id',"r");
                rockImage = $("<img src='player1images/rock.png'/>");
                rockImage.appendTo(rockDiv);
                
                paperDiv = $("<div>");
                paperDiv.addClass("choice").appendTo(rpsSelectionsPlayer1);
                paperDiv.attr('id',"p");
                paperImage = $("<img src='player1images/paper.png'/>");
                paperImage.appendTo(paperDiv);
                
                scissorsDiv = $("<div>");
                scissorsDiv.addClass("choice").appendTo(rpsSelectionsPlayer1);
                scissorsDiv.attr('id',"s");
                scissorsImage = $("<img src='player1images/scissors.jpeg'/>");
                scissorsImage.appendTo(scissorsDiv);
        }
        else {
            event.preventDefault();
            var player2Name = $("#name-input").val().trim();
            console.log(player2Name);
            database.ref().push({
                name: player2Name,
            });
            $(".player2-name").text(player2Name);
            $(".computer-badge").text(player2Name);
            var rpsSelectionsPlayer2 = $("<div>");
            rpsSelectionsPlayer2.addClass("player2-choices").appendTo(".player2");
            
                rockDiv = $("<div>");
                rockDiv.addClass("choice").appendTo(rpsSelectionsPlayer2);
                rockDiv.attr('id',"r");
                rockImage = $("<img src='player2images/rock.png'/>");
                rockImage.appendTo(rockDiv);
                
                paperDiv = $("<div>");
                paperDiv.addClass("choice").appendTo(rpsSelectionsPlayer2);
                paperDiv.attr('id',"p");
                paperImage = $("<img src='player2images/paper.png'/>");
                paperImage.appendTo(paperDiv);
                
                scissorsDiv = $("<div>");
                scissorsDiv.addClass("choice").appendTo(rpsSelectionsPlayer2);
                scissorsDiv.attr('id',"s");
                scissorsImage = $("<img src='player2images/scissors.jpeg'/>");
                scissorsImage.appendTo(scissorsDiv);
        }
    });
}

$("<button>").on("click",addPlayerName());

  database.ref().on("value", function(snapshot) {
    $("#r").text(snapshot.val().Rock);
    $("#p").text(snapshot.val().Paper);
    $("#s").text(snapshot.val().Scissors);
    rockCounter = snapshot.val().Rock;
    paperCounter = snapshot.val().Paper;
    scissorsCounter = snapshot.val().Scissors;
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });




































// RPS Logic
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");

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
// rock_div.addEventListener('click', () => game("r"));
//paper_div.addEventListener('click', () => game("p"));
// scissors_div.addEventListener('click', () => game("s"));
}

main();
