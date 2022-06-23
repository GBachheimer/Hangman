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
            checkLetter(document.getElementById('word').value.toLowerCase(), word, gameArray, lifes);
        }; //change start event
    let newButton = document.createElement("button"); //create reset button
    newButton.innerHTML = "Reset";
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

function checkLetter(letter, word, gameArray, lifes) {
    document.getElementById('word').value = "";
    let foundIndex = word.indexOf(letter);
    if (foundIndex == -1) {
        document.getElementById("foundOrNot").innerHTML = "Wrong letter!";
        decreaseLifes();
    } else {
        while (foundIndex > -1) {
            gameArray[foundIndex] = letter;
            foundIndex = word.indexOf(letter, foundIndex + 1);
        }
        document.getElementById("gameBoard").innerHTML = gameArray.join(" | ");
        document.getElementById("foundOrNot").innerHTML = "Well done!";
    }
}

let lifes = 14;

function decreaseLifes () {
    document.getElementById("lifes").innerHTML = "You have " + lifes-- + " more attempts!";
}

