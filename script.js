function generateGame(word) {
    document.getElementById("word").disabled = true;
    document.getElementById('word').value = "";
    document.getElementById("gameBoard").innerHTML = word;
    document.getElementById("button").innerHTML = "Reset";
    document.getElementById("button").onclick = "reset()";
    document.getElementById("inputArea").classList.remove("top-50");
    document.getElementById("inputArea").className += " top-0 translate-middle-x";
}
