function generateGame(word) {
    let wordLength = Number(word.length);
    for (let i = 1; i < wordLength; ++i) {
        let dash = document.createElement("svg");
        dash.xmlns = "http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor";
        dash.classList = "bi bi-dash-lg";
        dash. viewBox = "0 0 16 16";
        let path = document.createElement("path");
        path.fill-rule = "evenodd";
        path.d = "M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z";
        dash.appendChild(path);
        documnet.getElementById("gameBoard").appendChild(dash);
    }
}
