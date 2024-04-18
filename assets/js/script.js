$(document).ready(function () {
    
    $('#menu-button').on('click', function () {
        $('.menu').toggle();
    });

    $('.menu-items').hover(function () {
        $(this).toggleClass('purple');
    });

    $('#sans-serif').on('click', function () {
        $(document.body).removeClass('serif mono').addClass('sans-serif');
        $('.menu').hide();
        $('#font-type').text('Sans Serif');
    });

    $('#serif').on('click', function () {
        $(document.body).removeClass('sans-serif mono').addClass('serif');
        $('.menu').hide();
        $('#font-type').text('Serif');

    });

    $('#mono').on('click', function () {
        $(document.body).removeClass('sans-serif serif').addClass('mono');
        $('.menu').hide();
        $('#font-type').text('Monospace');
    });

    $('#play-icon').hover(function () {
        $(this).attr("src", "assets/images/icon-play-hover.png");
    }, function () {
        $(this).attr("src", "assets/images/icon-play.svg");
    });

    $('#toggle-theme').on('click', function () {
        $(document.body).toggleClass('dark');
        if ($('#theme-icon').attr('src') == 'assets/images/icon-moon.svg') {
            $('#theme-icon').attr('src', 'assets/images/icon-moon-dark.svg');
        } else {
            $('#theme-icon').attr('src', 'assets/images/icon-moon.svg');
        }
    });

    $('.semantic-words').on('click', function(event) {
        event.preventDefault();
        fetchData(this.text);
        clearFocus();
    });

    document.getElementsByClassName('userInput')[0].addEventListener('keydown',
    function (event) {
        if (event.key === 'Enter') {
            lookup();
        }
    });

});


function displayData(data) {
    let newHTML = ``;
    let audioFile = '';
    let phonetics = '';

    let WORD = data[0];

    for (let i = WORD.phonetics.length - 1; i > 0; i--) {
        if ('audio' in WORD.phonetics[i]) {
            if (audioFile.length === 0) {
                audioFile = WORD.phonetics[i].audio;
                phonetics = WORD.phonetics[i].text;
            } else if ('text' in WORD.phonetics[i]) {
                if (phonetics.length === 0) {
                    phonetics = WORD.phonetics[i].text;
                }
            }
        }

    }

    // Add Main Word and Phonetics
    newHTML +=
        `<div class="first-section d-flex justify-content-between align-items-center">
            <div class="top-section">
                <h1 class="main-word">${WORD.word}</h1><br>
                <span class="phonetic">${phonetics}</span>
            </div>`;

    // Add Audio button, if present
    if (audioFile.length === 0) {
        newHTML += `</div>`;
    } else {
        newHTML += `
            <img src="assets/images/icon-play.svg" alt="Play Icon" height="55" id="play-icon"></div>`;
    }

    // Add Meanings
    for (let i = 0; i < WORD.meanings.length; i++) {

        newHTML +=
            `<div class="second-section d-flex justify-content-between align-items-center">
            <span class="p-o-s">${WORD.meanings[i].partOfSpeech}</span>
            <div class="horizontal-line">
                <hr>
            </div>
        </div>
        <span class="meaning">Meaning</span><ul>`;

        // Add Definitions
        let synWords = [];
        let antWords = [];
        for (let q = 0; q < WORD.meanings[i].definitions.length; q++) {
            newHTML += `<li>${WORD.meanings[i].definitions[q].definition}</li>`;
            if ('example' in WORD.meanings[i].definitions[q]) {
                newHTML += `<li class="examples">"${WORD.meanings[i].definitions[q].example}"</li>`;
            }
        }
        for (let w = 0; w < WORD.meanings[i].antonyms.length; w++) {
            antWords.push(WORD.meanings[i].antonyms[w]);
        }
        for (let e = 0; e < WORD.meanings[i].synonyms.length; e++) {
            synWords.push(WORD.meanings[i].synonyms[e]);
        }
        newHTML += `</ul>`;

        // Add Synonyms
        if (synWords.length > 0) {
            newHTML += 
                `<div class="s-and-a d-flex justify-content-start align-items-center">
                    <span class="semantics">Synonyms</span><span>`;
            for (let i = 0; i < synWords.length && i < 3; i++) {
                newHTML += `<a href="#" class="semantic-words">${synWords[i]}</a>&nbsp;&nbsp;`;
            }
            newHTML += `</span></div>`;
        }

        // Add Antonyms
        if (antWords.length > 0) {
            newHTML += 
                `<div class="s-and-a d-flex justify-content-start align-items-center">
                    <span class="semantics">Antonyms</span><span>`;
            for (let i = 0; i < antWords.length && i < 3; i++) {
                newHTML += `<a href="#" class="semantic-words">${antWords[i]}</a>&nbsp;&nbsp;`;
            }
            newHTML += `</span></div>`;
        }

    }


    // Add Source
    newHTML +=
        `<hr><div class="source-section">
        <span id="source-title">Source</span><br>
        <span id="source">${WORD.sourceUrls}</span>&nbsp;<a href="${WORD.sourceUrls}" target="_blank"><img
        src="assets/images/icon-new-window.svg" alt="New Window" height="15" id="follow-link"></a>
      </div>`;

 

    // Finally Add HTML
    $('section').html(newHTML);

    $('#play-icon').hover(function () {
        $(this).attr("src", "../assets/images/icon-play-hover.png");
    }, function () {
        $(this).attr("src", "../assets/images/icon-play.svg");
    });

    $('#play-icon').on('click', function() {
        let a = new Audio(audioFile);
        a.play();
    });

    $('.semantic-words').on('click', function(event) {
        event.preventDefault();
        fetchData(this.text);
        clearFocus();
    });
}


function displayError() {
    let errorMessage = `
    <div class="no-word">
        <img src="assets/images/frowny-face.png" alt="Frowny Face" height="60">
        <br><br>
        <h5 class="fw-bold">No Definitions Found</h5><br>
        <p>Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at
            later time or head to the web instead.</p>
    </div>`;
    $('section').html(errorMessage);
}


function clearFocus() {
    document.getElementsByClassName('userInput')[0].value = "";
    document.getElementsByClassName('userInput')[0].focus();
}


function fetchData(data) {
    let API_KEY = data;
    let API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
    fetch(API_URL + API_KEY)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                displayError();
            }
        })
        .then(data => {
            displayData(data);
        })
        .catch(function () {
            displayError();
        });
}


function lookup() {
    if (!document.getElementsByClassName('userInput')[0].value.match(/[A-Za-z0-9]/g)) {
        $('.userInput').css('outline', '1px solid red');
        $('.empty-box').show();
        $('.userInput').on('keydown', function (event) {
            if (event.key !== 'Enter') {
                $('.userInput').css('outline', '1px solid #A445ED');
                $('.empty-box').hide();
            }
        });
    } else {
        let userInput = document.getElementsByClassName('userInput')[0].value;
        fetchData(userInput);
    }

    clearFocus();
    return;
}
