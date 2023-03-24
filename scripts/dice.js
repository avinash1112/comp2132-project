/*  =================================================================================================================================================== */
/*                                                              VARIABLES & CONSTANTS                                                                   */
/*  =================================================================================================================================================== */

// Page level parameters
let elmToHide           = [];
let elmToShow           = [];
const MIN_SCREEN_WIDTH  = 420;


// Array constants
const ARRAY_STARTING_POINT  = 0;
const EMPTY_ARRAY_LENGTH    = 0
const INCREMENT_VALUE       = 1;
const DECREMENT_VALUE       = 1;


// Variables for game parameters
let results             = `<table><thead><tr><th>Round #</th><th>Player Scores</th><th>Computer Scores</th></tr></thead><tbody>`;
const DICE_MIN_FACE     = 1
const DICE_MAX_FACE     = 6
let playerDice          = null;
let computerDice        = null;
let chosenColor;
let playerColor;
let computerColor;


// Game parameter
let roundNumber         = 1;
const MAX_ROUND         = 3;
const MIN_DICE_NUMBER   = 1;
const MAX_DICE_NUMBER   = 6;
let playerTotalScore    = 0;
let computerTotalScore  = 0;


// Images path
const DICES_IMG_PATH    = '../graphics/images/dice/';
const WINNER_IMG_PATH   = '../graphics/images/winner/';
const LOSER_IMG_PATH    = '../graphics/images/loser/';
const TIED_IMG_PATH     = '../graphics/images/tied/';


// Target elements
const MAIN_SECTION      = document.getElementById('dice-page');
const SCREEN_TOO_SMALL  = document.getElementById('screen-width-too-small');
const WRAPPER           = document.getElementById('wrapper');
const POP_UP_WINDOW     = document.getElementById('pop-up');
const GAME_WINDOW       = document.querySelectorAll('.game-window');
const GAME_CONTROLLERS  = document.getElementById('game-controllers');
const GAME_SUMMARY      = document.getElementById('game-summary');
const SCORE_UL          = document.getElementById('score-ul');
const PLAYER_DICE_DIV   = document.getElementById('player-dices-container');
const COMPUTER_DICE_DIV = document.getElementById('computer-dices-container');
const ROLL_DICE_BTN     = document.getElementById('roll-dice');
const NEW_GAME_BTN      = document.querySelectorAll('.new-game-btn ');
const SCORES_CONTAINER  = document.querySelectorAll('.score');
const WINNER_IMG_ELM    = document.getElementById('animated-images');
const LOSER_IMG_ELM     = document.getElementById('animated-images');
const TIED_IMG_ELM      = document.getElementById('animated-images');


// Rolling dice animation
const DICE_ROTATION_INTERVAL    = 200; // in milliseconds
let diceCounter1                = Math.floor(Math.random() * MAX_DICE_NUMBER) + 1;
let diceCounter2                = Math.floor(Math.random() * MAX_DICE_NUMBER) + 1;
let diceCounter3                = Math.floor(Math.random() * MAX_DICE_NUMBER) + 1;
let diceCounter4                = Math.floor(Math.random() * MAX_DICE_NUMBER) + 1;
let rotation;
let timerHandler;
let frameHandler;


// Winner animation
const WINNER_IMG_NAME           = 'winner-';
const WINNER_IMG_EXT            = '.png';
const WINNER_FIRST_IMG_NUM      = 1;
const WINNER_LAST_IMG_NUM       = 7;
const WINNER_ROTATION_INTERVAL  = 100; // in milliseconds
let winnerCounter               = 1;

// Loser animation
const LOSER_IMG_NAME            = 'loser-';
const LOSER_IMG_EXT             = '.png';
const LOSER_FIRST_IMG_NUM       = 1;
const LOSER_LAST_IMG_NUM        = 7;
const LOSER_ROTATION_INTERVAL   = 500; // in milliseconds
let loserCounter                = 1;


// Tied animation
const TIED_IMG_NAME             = 'tied-';
const TIED_IMG_EXT              = '.png';
const TIED_FIRST_IMG_NUM        = 1;
const TIED_LAST_IMG_NUM         = 14;
const TIED_ROTATION_INTERVAL    = 300; // in milliseconds
let tiedCounter                 = 1;


// Sound effects
const GAME_START_AUDIO      = document.getElementById("game-start");
const ROLLING_DICE_AUDIO    = document.getElementById('rolling-dice');
const BONUS_SCORE_AUDIO     = document.getElementById('bonus-score');
const ROUND_WON_AUDIO       = document.getElementById('round-won');
const ROUND_LOST_AUDIO      = document.getElementById('round-lost');
const ROUND_TIED_AUDIO      = document.getElementById('round-tied');
const LAST_ROUND_AUDIO      = document.getElementById("last-round")
const GAME_WON_AUDIO        = document.getElementById("game-won");
const GAME_LOST_AUDIO       = document.getElementById("game-lost");
const GAME_TIED_AUDIO       = document.getElementById("game-tied");

// Regex
const DICE_FACE_OBJ_REGEX_PATTERN = /^[0-9a-z /\-.]*$/i;


/*  =================================================================================================================================================== */
/*                                                              EVENT LISTENERS SECTION                                                                 */
/*  =================================================================================================================================================== */

/*
    Event listener for roll dice button
*/
ROLL_DICE_BTN.addEventListener('click', () => {

    // Check if round is within max allowed round for one game
    if(roundNumber <= MAX_ROUND) {
        
        // Disbale roll dice button temporalily so user cannot keep clicking in between rounds
        ROLL_DICE_BTN.setAttribute('disabled', true);
        ROLL_DICE_BTN.classList.remove('btn-purple');
        ROLL_DICE_BTN.classList.add('btn-disabled');
        
        // Roll the dices
        rollDice();

        // Increment round number
        roundNumber++;

        /* Check if this was the final round (increment MAX_ROUND by 1)
           Disable the roll dice button so the user cannot click again for another round
           Set a timeout so the user can see the final round results before calling diceGameOver()
        */
        if(roundNumber == MAX_ROUND + INCREMENT_VALUE) {

            // Diable roll dice button
            ROLL_DICE_BTN.setAttribute('disabled', true);
            ROLL_DICE_BTN.classList.remove('btn-purple');
            ROLL_DICE_BTN.classList.add('btn-disabled');

            setTimeout(() => {
                diceGameOver(playerTotalScore, computerTotalScore);
            }, 2500);
        }

        // Enable roll dice button after 2.5 seconds (so all data have time to update before user can start a second round)
        setTimeout(() => {
            ROLL_DICE_BTN.removeAttribute('disabled');
            ROLL_DICE_BTN.classList.remove('btn-disabled');
            ROLL_DICE_BTN.classList.add('btn-purple');
        }, 2500);
    }
})




/*
    Event listener for new game buttons
*/
NEW_GAME_BTN.forEach(element => {
    element.addEventListener('click', () => {
        newDiceGame();
    });
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


    // Show the color choice window
    newDiceGame();

});   
