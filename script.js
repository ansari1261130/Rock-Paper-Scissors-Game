let userScore = 0;
let compScore = 0;
const maxScore = 10;

const newGameBtn = document.querySelector("#newGame");
const resetBtn = document.querySelector("#reset");

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

// Reset the game state
const resetGame = () => {
    userScore = 0;
    compScore = 0;
    userScorePara.innerText = userScore;
    compScorePara.innerText = compScore;
    msg.innerText = "";
    msg.style.backgroundColor = "";
    choices.forEach(choice => {
        choice.removeAttribute("disabled");
    });
};

// Generate a random choice for the computer
const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

// Display draw message
const drawGame = () => {
    msg.innerText = "Game was Draw. Play again.";
    msg.style.backgroundColor = "#081b31";
};

// Disable all choice buttons
const disableChoices = () => {
    choices.forEach(choice => {
        choice.setAttribute("disabled", "true");
    });
};

// Check and announce the final winner
const finalWinner = () => {
    if (userScore === maxScore) {
        msg.innerText = "Hurray! You win the final round";
        disableChoices();
        setTimeout(resetGame, 500); 
    } else if (compScore === maxScore) {
        msg.innerText = "You Lose! Computer wins the final round";
        disableChoices();
        setTimeout(resetGame, 500); 
    }
};


// Show round winner and update scores
const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
    if (userScore === maxScore || compScore === maxScore) {
        finalWinner();
    }
};

// Play a round of the game
const playGame = (userChoice) => {
    const compChoice = genCompChoice();
    if (userChoice === compChoice) {
        drawGame();
    } else {
        let userWin;
        if (userChoice === "rock") {
            userWin = (compChoice === "scissors");
        } else if (userChoice === "paper") {
            userWin = (compChoice === "rock");
        } else if (userChoice === "scissors") {
            userWin = (compChoice === "paper");
        }
        showWinner(userWin, userChoice, compChoice);
    }
};

// Add event listeners to choices
choices.forEach(choice => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

// Add event listeners to reset and new game buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
