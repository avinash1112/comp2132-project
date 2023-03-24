/*  =================================================================================================================================================== */
/*                                                              VARIABLES & CONSTANTS                                                                   */
/*  =================================================================================================================================================== */

// Page level parameters
let elmToHide           = [];
let elmToShow           = [];
const MIN_SCREEN_WIDTH  = 420;


// Array constants
const ARRAY_STARTING_POINT      = 0;
const EMPTY_ARRAY_LENGTH        = 0
const INCREMENT_VALUE           = 1;
const DECREMENT_VALUE           = 1;

// ASCII characters code
const ASCII_CODE_LETTER_A       = 65;
const ASCII_CODE_LETTER_Z       = 90;
const ASCII_CODE_HYPHEN         = 45;
const ASCII_CODE_SPACE          = 32;

// DOM elements
const MAIN_SECTION              = document.getElementById('hangman-page');
const SCREEN_TOO_SMALL          = document.getElementById('screen-width-too-small');
const POP_DISMISS_BTN           = document.getElementById('pop-up-close-button');
const POP_UP_WINDOW             = document.getElementById('pop-up');
const WRAPPER                   = document.getElementById('wrapper');
const GAME_WINDOW               = document.getElementById('game-window');
const CATEGORY_SELECTION        = document.getElementById('category-selection');
const GAME_IN_PROGESS           = document.getElementById('game-in-progress');
const GAME_OVER                 = document.getElementById('game-over');
const GAME_SUMMARY              = document.getElementById('game-summary');
const WINNER_IMAGE              = document.getElementById('winner-image');
const LOSER_IMAGE               = document.getElementById('loser-image');
const GUESS_COUNT_CONTAINER     = document.getElementById('guess-count-container');
const WRONG_GUESSES_CONTAINER   = document.getElementById('wrong-guesses-container');
const WRONG_LETTERS             = document.getElementById('wrong-guesses');
const WRONG_GUESSES             = document.getElementById('wrong-answer-count');
const TOTAL_GUESSES             = document.getElementById('wrong-answer-total');
const FINAL_GUESS_CONTAINER     = document.getElementById('final-guess-container');
const HANGMAN_IMAGES            = document.getElementById('hangman-picture');
const EXTRA_HINT_BTN            = document.getElementById('extra-hint-btn');
const ADDTIONAL_HINT_CONTAINER  = document.getElementById('additional-hint-container');
const ADDTIONAL_HINT            = document.getElementById('additional-hint');
const WORD_SPACES               = document.getElementById('word-spaces');
const WORD_CATEGORY_SPAN        = document.getElementById('word-category');
const WORD_HINT                 = document.getElementById('word-hint');
const KEYBOARD                  = document.getElementById('keyboard');
const HINT_POP_UP_WINDOW        = document.getElementById('hint-pop-up');
const HINT_POP_UP_CLOSE_BTN     = document.getElementById('hint-pop-up-close-button');
const HINT_LAST_CHANCE_WINDOW   = document.getElementById('hint-last-chance-pop-up');
const HINT_LAST_CHANCE_CLOSE    = document.getElementById('hint-last-chance-pop-up-close-button');
const NEW_GAME_BTN              = document.querySelectorAll('.new-game-button');
const USER_HINT_CHOICE          = document.querySelectorAll('.hint-choice');


// File paths
const JSON_FILE_PATH            = '../uploads/wordsList.json';
const IMAGE_PATH                = '../graphics/images/hangman/';
const WINNER_IMG_PATH           = '../graphics/images/winner/';
const LOSER_IMG_PATH            = '../graphics/images/loser/';

// Sound effects
const GAME_START_AUDIO          = document.getElementById("audio-game-start");
const CORRECT_GUESS_AUDIO       = document.getElementById("audio-correct-guess");
const INCORRECT_GUESS_AUDIO     = document.getElementById("audio-incorrect-guess");
const HINT_USED_AUDIO           = document.getElementById("audio-hint-used");
const GUESSES_WARNING_AUDIO     = document.getElementById("audio-guesses-warning");
const GAME_WON_AUDIO            = document.getElementById("audio-game-won");
const GAME_LOST_AUDIO           = document.getElementById("audio-game-lost");
const ALL_SOUND_EFFECTS         = [
                                    GAME_START_AUDIO,
                                    CORRECT_GUESS_AUDIO,
                                    INCORRECT_GUESS_AUDIO,
                                    HINT_USED_AUDIO,
                                    GUESSES_WARNING_AUDIO,
                                    GAME_WON_AUDIO,
                                    GAME_LOST_AUDIO
                                ];

// Winner animation
const WINNER_IMG_NAME           = 'winner-';
const WINNER_IMG_EXT            = '.png';
const WINNER_FIRST_IMG_NUM      = 1;
const WINNER_LAST_IMG_NUM       = 7;
const WINNER_ROTATION_INTERVAL  = 100; // in milliseconds
const WINNER_IMG_ELM            = document.getElementById('winner-image');
let winnerCounter               = WINNER_FIRST_IMG_NUM + INCREMENT_VALUE;
let winnerTimerHandler;
let winnerFrameHandler;

// Loser animation
const LOSER_IMG_NAME           = 'loser-';
const LOSER_IMG_EXT            = '.png';
const LOSER_FIRST_IMG_NUM      = 1;
const LOSER_LAST_IMG_NUM       = 7;
const LOSER_ROTATION_INTERVAL  = 500; // in milliseconds
const LOSER_IMG_ELM            = document.getElementById('loser-image');
let loserCounter               = LOSER_FIRST_IMG_NUM + INCREMENT_VALUE;
let loserTimerHandler;
let loserFrameHandler;


// Regex
const WORD_OBJ_REGEX_PATTERN = /^[0-9a-z\#\+\. \,\'\-\(\)]*$/i;

// Game parameters
const IMAGE_COMMON_NAME     = 'hangman-0';
const IMAGE_EXTENTION       = '.jpg';

let wordsArray              = [];
let PROMISES                = [];
const STARTING_WRONG_GUESS  = 0;
const MAX_GUESSES           = 7;
let selectedCategory        = '';
let dashSpan                = '';
let answer                  = ''; 
let allGuesses              = [];
let wrongLetters            = [];
let correctLettersCount     = 0;
let wrongGuesses            = STARTING_WRONG_GUESS;
let extraHintUsed           = false;
let decision;


/*  =================================================================================================================================================== */
/*                                                              EVENT LISTENERS SECTION                                                                 */
/*  =================================================================================================================================================== */

/*
    Event listener for pop-up dismiss btn if clicked then dismiss pop up.
*/
POP_DISMISS_BTN.addEventListener('click', function () {
    WRAPPER.classList.remove('blur');
    fadeOutElements([POP_UP_WINDOW]);
    showElements([GAME_WINDOW]);
    fadeInElements([GAME_WINDOW]);
    setTimeout(hideElements([POP_UP_WINDOW]), 1000);
}, false);



/*
    Event listener for hint dismiss btn if clicked then dismiss pop up.
*/
HINT_POP_UP_CLOSE_BTN.addEventListener('click', function () {
    WRAPPER.classList.remove('blur');
    fadeOutElements([HINT_POP_UP_WINDOW]);
    setTimeout(hideElements([HINT_POP_UP_WINDOW]), 1000);
}, false);



/*
    Event listener for hint last chance dismiss btn if clicked then dismiss pop up.
*/
HINT_LAST_CHANCE_CLOSE.addEventListener('click', function () {
    WRAPPER.classList.remove('blur');
    fadeOutElements([HINT_LAST_CHANCE_WINDOW]);
    setTimeout(hideElements([HINT_LAST_CHANCE_WINDOW]), 1000);
}, false);



/*
    Event listener for new game buttons
*/
NEW_GAME_BTN.forEach(element => {
    element.addEventListener('click', () => {

        if(element.getAttribute('name') == 'same-category') {
            let currentCategory = selectedCategory;
            resetHangmanGame();
            newHangmanGame(currentCategory);
            return;
        }

        if(element.getAttribute('name') == 'new-category' || element.getAttribute('name') == 'new-game'){
            resetHangmanGame();
            hideElements([GAME_IN_PROGESS, GAME_OVER]);
            showElements([CATEGORY_SELECTION]);
            setTimeout(selectCategory, 50);
            return;
        }
    });
});



/*
    Event listener for addtional hint accept or decline
*/
USER_HINT_CHOICE.forEach(btnChoice => {
    
    btnChoice.addEventListener('click', () => {
        
        // if user clicks yes
        if(btnChoice.getAttribute('name') == 'accept') {
            decision = true;
        }

        // if user clicks yes
        if(btnChoice.getAttribute('name') == 'decline') {
            decision = false;
        }

        if(decision) {
            additionalHintRequest();
        }

        WRAPPER.classList.remove('blur');
        fadeOutElements([HINT_POP_UP_WINDOW]);
        setTimeout(hideElements([HINT_POP_UP_WINDOW]), 1000);

    });

})



/*
    Event listener for addtional hint request
*/
EXTRA_HINT_BTN.addEventListener('click', () => {
    
    // Check if user has more than 2 guesses left
    if(wrongGuesses < MAX_GUESSES - DECREMENT_VALUE) {

        // display warning message about price for extra hint
        WRAPPER.classList.add('blur');
        showElements([HINT_POP_UP_WINDOW]);
        fadeInElements([HINT_POP_UP_WINDOW]);
    }
});



/*
    When DOM is ready
*/
document.addEventListener("DOMContentLoaded", () => {
    
    /* 
        Screen size check
    */
    elmToHide.push(MAIN_SECTION, POP_UP_WINDOW);
    elmToShow.push(SCREEN_TOO_SMALL);

    // Call the function to hide and show elements
    screenWidthCheck(elmToHide, elmToShow);


    /*
        Event listener on window resize to call the function to hide and show elements
    */
    window.addEventListener('resize', () => {
        screenWidthCheck(elmToHide, elmToShow);
    })

        
    /*
        Read a local JSON file containing a list of words
    */
    const FETCH_JSON_DATA = fetch(JSON_FILE_PATH)
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            let wordObj = new Word(element.name, element.category, element.hint1, element.hint2);
            wordsArray.push(wordObj);
        });
    })
    .catch(error => console.error(`Could not load JSON file:\n${error}`));

    // Push promise variable to an array that hold all promises (easier to execute Promise.all)
    PROMISES.push(FETCH_JSON_DATA);



    /*
        Wait for all promises to finish before executing any other code
    */
    Promise.all(PROMISES)
    .then(() => {
        
        // reset game variables (for cases the user plays another game without refreshing the browser)
        resetHangmanGame();
        
        // blur the background, show pop-up and hide other elements
        WRAPPER.classList.add('blur');
        fadeInElements([POP_UP_WINDOW]);
        hideElements([HINT_POP_UP_WINDOW, HINT_LAST_CHANCE_WINDOW, GAME_WINDOW]);

        // prompt user to select a category
        selectCategory();
    })

    .catch((value) => console.error(`Failed promises: \n${value}`));
    
});   
