let lives = 10;
let countWin = 0;
const canvas = document.getElementById("drawing");
const ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.moveTo(150, 275);
ctx.lineTo(25, 275);
ctx.moveTo(75, 275);
ctx.lineTo(75, 25);
ctx.lineTo(150, 25);
ctx.lineTo(150, 75);
ctx.lineWidth = 5;
ctx.strokeStyle = "white";
ctx.stroke();

function generateGame(word) {
    const gameArray = [];
    let wordLength = word.length;
    for (let i = 1; i <= wordLength; ++i) {
        gameArray.push(" • ");
    }
    document.getElementById('word').value = ""; //empty input
    document.getElementById("gameBoard").innerHTML = gameArray.join(" | "); //display bars
    document.getElementById("button").innerHTML = "Check this letter"; //change start button
    document.getElementById("button").onclick = function () {
        checkLetterPattern(document.getElementById('word').value.toLowerCase(), word, gameArray);
        }; //change start event
    let newButton = document.createElement("button"); //create reset button
    newButton.innerHTML = "Reset the game";
    newButton.className = "btn-sm btn-info my-2";
    newButton.onclick = function () { reset(); };
    document.getElementById("form").appendChild(newButton);
    let message = document.createElement("p"); //create word length message
    message.id = "info";
    message.innerHTML = "The word has " + wordLength + " letters";
    document.getElementById("form").appendChild(message);
}

function reset() {
    location.reload();
}

function checkLetter(letter, word, gameArray) {
    let wordLength = word.length;
    let foundIndex = word.indexOf(letter);
    if (foundIndex == -1) {
        decreaseLives();
    } else {
        while (foundIndex > -1) {
            gameArray[foundIndex] = letter.toUpperCase();
            foundIndex = word.indexOf(letter, foundIndex + 1);
            ++countWin;
        }
        document.getElementById("gameBoard").innerHTML = gameArray.join(" | ");
        let correction = "letters";
        if (wordLength - countWin <= 1) {
            correction = "letter";
        }
        document.getElementById("lives").innerHTML = "Well done! " + (wordLength - countWin) + " more " + correction + " to guess.";
    }
    winOrLose(wordLength, word);
}

function decreaseLives() {
    --lives;
    document.getElementById("lives").innerHTML = "Wrong letter! You have " + lives + " more attempts!";
    switch (lives) {
        case 9:
            ctx.beginPath();
            ctx.arc(150, 100, 25, 0, 2 * Math.PI);
            ctx.lineWidth = 2;
            ctx.stroke();
            break;
        case 8:
            ctx.beginPath();
            ctx.moveTo(150, 125);
            ctx.lineTo(150, 175);
            ctx.stroke();
            break;
        case 7:
            ctx.beginPath();
            ctx.moveTo(150, 175);
            ctx.lineTo(175, 225);
            ctx.stroke();
            break;
        case 6:
            ctx.beginPath();
            ctx.moveTo(150, 175);
            ctx.lineTo(125, 225);
            ctx.stroke();
            break;
        case 5:
            ctx.beginPath();
            ctx.moveTo(150, 125);
            ctx.lineTo(175, 175);
            ctx.stroke();
            break;
        case 4:
            ctx.beginPath();
            ctx.moveTo(150, 125);
            ctx.lineTo(125, 175);
            ctx.stroke();
            break;
        case 3:
            ctx.beginPath();
            ctx.moveTo(137, 95);
            ctx.lineTo(142, 95);
            ctx.stroke();
            break;
        case 2:
            ctx.beginPath();
            ctx.moveTo(158, 95);
            ctx.lineTo(163, 95);
            ctx.stroke();
            break;
        case 1:
            ctx.beginPath();
            ctx.moveTo(150, 100);
            ctx.lineTo(150, 105);
            ctx.stroke();
            break;
        case 0:
            ctx.beginPath();
            ctx.arc(150, 120, 8, 0, Math.PI, true);
            ctx.stroke();
    }
}

function winOrLose(wordLength, word) {
    let message = document.createElement("h1");
    message.classList = "text-warning";
    if (countWin === wordLength) {
        message.innerHTML = "YOU WON!";
        display(message);
    } else if (lives === 0) {
        message.innerHTML = "YOU LOSE! The word was: " + word.toUpperCase() + ".";
        display(message);
    }
}

function display(message) {
    document.getElementById("centralDiv").appendChild(message);
    document.getElementById("word").style.display = "none";
    document.getElementById("button").style.display = "none";
    document.getElementById("lives").style.display = "none";
    document.getElementById("info").style.display = "none";
}

function checkWordPattern(word) {
    const wordPattern = /^.[a-z]+$/;
    if (wordPattern.test(word)) {
        document.getElementById("lives").innerHTML = "Player 2 guess the word letter by letter. Good luck!";
        generateGame(word);
        document.getElementById("word").type = "text";
    } else {
        document.getElementById("lives").innerHTML = "Please enter a word!";
    }
}

function checkLetterPattern(letter, word, gameArray) {
    const letterPattern = /^[a-z]?$/;
    if (letterPattern.test(letter) && letter != "" && !gameArray.includes(letter.toUpperCase())) {
        checkLetter(letter, word, gameArray);
    } else {
        document.getElementById("lives").innerHTML = "Please enter a single letter, different from the ones guessed so far!";
    }
}
