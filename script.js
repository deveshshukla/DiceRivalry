'use strict';


//Variables
let txtPlayer1 = document.getElementById('name--0');
let txtPlayer2 = document.getElementById('name--1');

let player1Name = txtPlayer1.textContent;
let player2Name = txtPlayer2.textContent;

const elPlayer1 = document.querySelector('.player--0');
const elPlayer2 = document.querySelector('.player--1');

const player1Score = document.getElementById('score--0');
const player2Score = document.getElementById('score--1');

const diceImg = document.querySelector('.dice');

const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Array to store player's Final Score
let playersFinalScore = [0, 0];
//Player's Current Score
let playerCurrentScore = 0;

//Defualt active player -> 0
let activePlayer = 0;

//Imp: Player switch function
function switchPlayer() {

    //Reset variable of CurrentScore & CurrentScore text
    playerCurrentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    activePlayer = (activePlayer === 0 ? 1 : 0);

    //Switch player bg
    elPlayer1.classList.toggle('player--active');
    elPlayer2.classList.toggle('player--active');
}

//stateVariable -> for 'New Game Btn'
let isNewBtnClicked = false;

//Btn 'New Game' -> Click Event
btnNewGame.addEventListener('click', function () {

    //Case-1: Set player name by user
    player1Name = prompt("Enter player-1 name: ");
    player2Name = prompt("Enter player-2 name: ");

    if (!player1Name || !player2Name) {
        alert('Not a valid entry! Pls try again.');
    } else {

        isNewBtnClicked = true;

        txtPlayer1.textContent = player1Name;
        txtPlayer2.textContent = player2Name;

        //Case-2: Dice Img-> visible
        diceImg.classList.remove('hidden');

        //Case-3: below Btn's-> activate
        btnRollDice.style.opacity = "1";
        btnRollDice.style.cursor = "pointer";

        btnHold.style.opacity = "1";
        btnHold.style.cursor = "pointer";

        //After win -> Call rest func
        resetGame();
    }
});


//Btn 'Roll Dice' -> Click Event
btnRollDice.addEventListener('click', function () {

    if (isNewBtnClicked) {
        //Generate Random no. for dice selection
        const diceNum = Math.trunc(Math.random() * 6) + 1;
        //Display dice img according to Random no.
        diceImg.src = `./images/dice-${diceNum}.png`;


        //Assign dice no. to current score
        if (diceNum !== 1) {

            //Case: Add diceNum to Current Score
            playerCurrentScore += diceNum;
            document.getElementById(`current--${activePlayer}`).textContent = playerCurrentScore;

        } else {

            //Call-> Player switch function
            switchPlayer();
        }
    }
});


//Btn 'Hold' -> Click Event
btnHold.addEventListener('click', function () {

    if (isNewBtnClicked) {

        //Add 'Current Score' -> Array (playersFinalScore)
        playersFinalScore[activePlayer] += playerCurrentScore;
        //& upadte text finalScore
        document.getElementById(`score--${activePlayer}`).textContent = playersFinalScore[activePlayer];

        //Note: Change to 100
        if (playersFinalScore[activePlayer] >= 100) {

            //Case-1: Add '.player--winner' class to active player side

            //remove 'player--active' bg
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

            //add 'player--winner' bg
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');

            //Case-2: Add 'Won 🎉' text after player name

            activePlayer === 0 ? (txtPlayer1.textContent += " Won 🎉") : (txtPlayer2.textContent += " Won 🎉");

            //Case-3: Change 'isNewBtnClicked = false'
            isNewBtnClicked = false;

            //Dice Img-> not-visible
            diceImg.classList.add('hidden');

            //below Btn's-> deactivate
            btnRollDice.style.opacity = ".5";
            btnRollDice.style.cursor = "not-allowed";

            btnHold.style.opacity = ".5";
            btnHold.style.cursor = "not-allowed";

        } else {

            //Continue Playing -> Call switch fuction
            switchPlayer();
        }
    }
});

//Reset Game Funtion
function resetGame() {

    //add 'player--active' bg to 'Player-1'
    document.querySelector(`.player--0`).classList.add('player--active');

    //remove 'player--winner' bg from 'active player'
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');

    //Reset Score Variables
    playersFinalScore = [0, 0];
    playerCurrentScore = 0;

    //Reset CurrentScore text
    document.getElementById('current--0').textContent = 0;
    document.getElementById('current--1').textContent = 0;

    //Reset FinalScore text
    document.getElementById('score--0').textContent = 0;
    document.getElementById('score--1').textContent = 0;
}
