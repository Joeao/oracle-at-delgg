let games = [];

const defaultBody = document.getElementById('defaultBody');
const tryAgain = document.getElementById('tryAgain');
const submittedBody = document.getElementById('submittedBody');
const gameSelector = document.getElementById('gameSelector');
const resetAll = document.getElementById('resetAll');
const masterResetButton = document.getElementById('masterResetButton');
const noGames = document.getElementById('noGames');
const prophesise = document.getElementById('prophesise');

let lastNumber = 0;
let highlightedAnswer = false;
let gameAnimation = () => {
    let z = 1;
    let iterations = Math.ceil(Math.random() * 30);
    if (iterations < 5) {
        iterations = iterations + 5;
    };
    let loopThroughGames = () => {
        if (z === iterations) {
            clearInterval(functionLoop);
            resetAll.style.display = 'block';
            let y = 0
            let loopThroughHighlight = () => {
                if (y === 4) {
                    clearInterval(highlightLoopFunction);
                }
                if (highlightedAnswer === false) {
                    highlightedAnswer = true;
                    gameSelector.style.color = '#010165';
                    gameSelector.style.backgroundColor = '#00ffff';
                    y++;
                } else {
                    highlightedAnswer = false;
                    gameSelector.style.color = '#fff';
                    gameSelector.style.backgroundColor = '#010165';
                    y++;
                };
            };
            let highlightLoopFunction = setInterval(loopThroughHighlight, 400);
        }
        let randomNumber = Math.floor(Math.random() * games.length);
        if (randomNumber === lastNumber && randomNumber < (games.length - 1)) {
            randomNumber++;
        } else if (randomNumber === lastNumber && randomNumber > 0){
            randomNumber--;
        };
        gameSelector.innerHTML = '<p>' + games[randomNumber] + '</p>';
        z++;
        lastNumber = randomNumber;
    }
    let functionLoop = setInterval(loopThroughGames, 200);
}

const addGames = () => {
    const inputText = document.getElementById('gamesInput').value;
    const splitText = inputText.split(',');
    for (i = 0; i < splitText.length; i++) {
        games.push(splitText[i]);
    };
    prophesise.style.display = 'none';
    defaultBody.style.display = 'none';
    if (games.length === 1) {
        noGames.style.display = 'block';
    } else if (games.length > 9) {
        games = [];
        tryAgain.style.display = 'block';
    } else {
        submittedBody.style.display = 'block';
        gameAnimation();
    }
};

/*const tryAgainReset = () => {
    defaultBody.style.display = 'block';
    tryAgain.style.display = 'none';
    noGames.style.display = 'none';
    prophesise.style.display
    games = [];
};*/

const note = document.getElementById('musicNote');
let isPlaying = false;
function zeldaPlay() {
    if (isPlaying === false) {
        isPlaying = true;
        document.getElementById('musicCredit').style.display = 'block';
        return document.getElementById('fairyFountain').play();
    } else {
        isPlaying = false;
        document.getElementById('musicCredit').style.display = 'none';
        return document.getElementById('fairyFountain').pause();
    }
};

const totalRevert = () => {
    resetAll.style.display = 'none';
    submittedBody.style.display = 'none';
    noGames.style.display = 'none';
    defaultBody.style.display = 'block';
    prophesise.style.display = 'block';
    gameSelector.innerHTML = "";
    lastNumber = 0;
    games = [];
    highlightedAnswer = false;
    gameSelector.style.backgroundColor = '#010165';
    gameSelector.style.color = '#fff';
}

note.addEventListener('click', zeldaPlay);
document.getElementById('reset1').addEventListener('click', totalRevert);
document.getElementById('reset2').addEventListener('click', totalRevert);
prophesise.addEventListener('click', addGames);
masterResetButton.addEventListener('click', totalRevert);