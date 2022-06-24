let lifes = 15;
let countWin = 0;

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
