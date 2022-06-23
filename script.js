let lifes = 15;
let countWin = 0;

function generateGame(word) {
    const gameArray = [];
    let wordLength = word.length;
    for (let i = 1; i <= wordLength; ++i) {
        gameArray.push(" ");
    }
    document.getElementById('word').value = ""; //empty input
    document.getElementById("gameBoard").innerHTML = gameArray.join(" | "); //display bars
    document.getElementById("button").innerHTML = "Check this letter"; //change start button
    document.getElementById("button").onclick = function () {
        checkLetterPattern(document.getElementById('word').value.toLowerCase(), word, gameArray);
        }; //change start event
    let newButton = document.createElement("button"); //create reset button
    newButton.innerHTML = "Reset the game";
    newButton.className = "btn-sm btn-primary";
    newButton.onclick = function () { reset(); };
    document.getElementById("form").appendChild(newButton);
    let message = document.createElement("p"); //create word length message
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
        document.getElementById("foundOrNot").innerHTML = "Wrong letter!";
        decreaseLifes();
    } else {
        while (foundIndex > -1) {
            gameArray[foundIndex] = letter;
            foundIndex = word.indexOf(letter, foundIndex + 1);
            ++countWin;
        }
        document.getElementById("gameBoard").innerHTML = gameArray.join(" | ");
        document.getElementById("foundOrNot").innerHTML = "Well done! " + (wordLength - countWin) + " more letters to guess.";
    }
    winOrLose(wordLength, word);
}

function decreaseLifes () {
    lifes--;
    document.getElementById("lifes").innerHTML = "You have " + lifes + " more attempts!";
}

function winOrLose(wordLength, word) {
    let message = document.createElement("p");
    if (countWin === wordLength) {
        message.innerHTML = "YOU WON!";
        display(message);
    } else if (lifes === 0) {
        message.innerHTML = "YOU LOSE! The word was: " + word.toUpperCase() + ".";
        display(message);
    }
}

function display(message) {
    document.getElementById("foundOrNot").innerHTML = "";
    document.getElementById("inputArea").appendChild(message);
    document.getElementById("word").disabled = true;
    document.getElementById("button").disabled = true;
}

function checkWordPattern(word) {
    const wordPattern = /^.[a-z]+$/;
    if (wordPattern.test(word)) {
        document.getElementById("lifes").innerHTML = "Enter a single letter:";
        generateGame(word);
    } else {
        document.getElementById("lifes").innerHTML = "Please enter a word!";
    }
}

function checkLetterPattern(letter, word, gameArray) {
    const letterPattern = /^[a-z]?$/;
    if (letterPattern.test(letter) && letter != "") {
        checkLetter(letter, word, gameArray);
    } else {
        document.getElementById("lifes").innerHTML = "Please enter a single letter!";
    }
}
