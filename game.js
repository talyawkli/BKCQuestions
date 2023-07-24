// Function to read phrases from a text file and cache them
function readPhrasesFromFile(fileName, callback) {
    if (readPhrasesFromFile.cache[fileName]) {
        callback(readPhrasesFromFile.cache[fileName]);
    } else {
        const fileInput = new XMLHttpRequest();
        fileInput.open("GET", fileName, true);
        fileInput.onreadystatechange = function () {
            if (fileInput.readyState === 4 && fileInput.status === 200) {
                const phrases = fileInput.responseText.split("\n").filter(phrase => phrase.trim() !== '');
                readPhrasesFromFile.cache[fileName] = phrases;
                callback(phrases);
            }
        };
        fileInput.send();
    }
}

// Cache object to store phrases for each file
readPhrasesFromFile.cache = {};

// Global variables to store the phrases for each reel
let whoData = [];
let whatData = [];
let howData = [];

// Function to get a random phrase from the given reel's phrases
function getRandomPhrase(reelPhrases) {
    return reelPhrases[Math.floor(Math.random() * reelPhrases.length)];
}

// Function to initialize the game and load phrases from text files
function initializeGame() {
    readPhrasesFromFile("who.txt", function (phrases) {
        reel1Phrases = phrases;
    });

    readPhrasesFromFile("how.txt", function (phrases) {
        reel2Phrases = phrases;
    });

    readPhrasesFromFile("what.txt", function (phrases) {
        reel3Phrases = phrases;
    });

    document.getElementById('message').innerText = 'Press "Spin" to play!';
}

// Function to clear the result after 30 seconds
function clearResult() {
    document.getElementById('who').innerText = '---';
    document.getElementById('how').innerText = '---';
    document.getElementById('what').innerText = '---';
}

// Modified spinReels() function to use cached phrases from different files for each reel
function spinReels() {
    if (!reel1Phrases.length || !reel2Phrases.length || !reel3Phrases.length) {
        // Read phrases from the files if not loaded already
        initializeGame();
        return;
    }

    const who = getRandomPhrase(whoData);
    const how = getRandomPhrase(whatData);
    const what = getRandomPhrase(howData);

    document.getElementById('who').innerText = reel1;
    document.getElementById('how').innerText = reel2;
    document.getElementById('what').innerText = reel3;

    // Clear the previous result after 30 seconds
    setTimeout(clearResult, 30000);
}
