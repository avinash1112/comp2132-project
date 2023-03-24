/*  =================================================================================================================================================== */
/*                                                          PAGE DEFAULTS SECTION                                                                       */
/*  =================================================================================================================================================== */


/*
    Functions to hide everything on screen smaller than 378px and show a warning.
    Parameters: 2 arrays of HTML elements:
                                        sectionsToHide: the ones to hide
                                        sectionsToShow: the ones to show
*/
function screenWidthCheck(sectionsToHide, sectionsToShow) {
    
    if(screen.width < MIN_SCREEN_WIDTH ) {
        sectionsToHide.forEach(section => {
            section.style.visibility = 'hidden';
        });
        
        sectionsToShow.forEach(section => {
            section.style.visibility = 'visible';
        });
        
    } else {
        sectionsToHide.forEach(section => {
            section.style.visibility = 'visible';
        });
        sectionsToShow.forEach(section => {
            section.style.visibility = 'hidden';
        });
    }
}


/*
    Self executing function for navbar menu button to expand ul (visible) on screen size less than 768px
*/
(function(d){
    const $btn = d.querySelector('.navbar-menu-button');
    const $nav = d.querySelector('.navbar');
    
    $btn.addEventListener('click', () => {
        $nav.classList.toggle('nav-menu-reveal');
    });
})(document);


/*
    Self executing function to set the current year in the copyright section in the footer
*/
(function(d){
    const yearContainer = d.querySelector('.current-year');
    yearContainer.textContent= new Date().getFullYear();
})(document);



/*  =================================================================================================================================================== */
/*                                                          SOUND EFFECTS SECTION                                                                       */
/*  =================================================================================================================================================== */

/*
    Function to play a sound effect
    Paramater: html audio tag
*/
function playSoundEffect(audioElm) {
    audioElm.currentTime = 0
    audioElm.play();
}


/*
    Function to stop all audio files if any are playing
*/
function stopAllSounds() {
    ALL_SOUND_EFFECTS.forEach(soundTag => {
        soundTag.pause();
        soundTag.currentTime = 0;
    });
}



/*  =================================================================================================================================================== */
/*                                                              NEW GAME SECTION                                                                        */
/*  =================================================================================================================================================== */

/*
    Function to hide DOM elements
    Parameter: array of html tags
*/
function hideElements(array) {
    array.forEach(elm => {
        if(!elm.classList.contains('hide')) {
            elm.classList.add('hide');
        }
    });
}


/*
    Function to show DOM elements
    Parameter: array of html tags
*/
function showElements(array) {
    array.forEach(elm => {
        if(elm.classList.contains('hide')) {
            elm.classList.remove('hide');
        }
    });
}


/*
    Function to fade in DOM elements
    Parameter: array of html tags
*/
function fadeInElements(array) {
    array.forEach(elm => {
        elm.classList.remove('fade-out');
        elm.classList.add('fade-in');
    });
}


/*
    Function to fade out elements
    Parameter: array of html tags
*/
function fadeOutElements(array) {
    array.forEach(elm => {
        elm.classList.remove('fade-in');
        elm.classList.add('fade-out');
    });
}


/*
    Function to animate winner images
*/
function winnerAnimation() {

    // Call animation frame
    winnerTimerHandler = setTimeout(() => {
        if(winnerCounter != WINNER_LAST_IMG_NUM){
            WINNER_IMG_ELM.src =`${WINNER_IMG_PATH}${WINNER_IMG_NAME}${winnerCounter}${WINNER_IMG_EXT}`;
            winnerFrameHandler = requestAnimationFrame(winnerAnimation);
            winnerCounter++;

        } else {
            winnerCounter = WINNER_FIRST_IMG_NUM;
            WINNER_IMG_ELM.src =`${WINNER_IMG_PATH}${WINNER_IMG_NAME}${winnerCounter}${WINNER_IMG_EXT}`;
            winnerFrameHandler = requestAnimationFrame(winnerAnimation);
            winnerCounter++;
        }
    }, WINNER_ROTATION_INTERVAL);
}


/*
    Function to animate lost images
*/
function loserAnimation() {

    // Call animation frame
    loserTimerHandler = setTimeout(() => {
        if(loserCounter != LOSER_LAST_IMG_NUM + INCREMENT_VALUE){
            LOSER_IMG_ELM.src =`${LOSER_IMG_PATH}${LOSER_IMG_NAME}${loserCounter}${LOSER_IMG_EXT}`;
            loserFrameHandler = requestAnimationFrame(loserAnimation);
            loserCounter++;

        } else {
            loserCounter = LOSER_FIRST_IMG_NUM;
            LOSER_IMG_ELM.src =`${LOSER_IMG_PATH}${LOSER_IMG_NAME}${loserCounter}${LOSER_IMG_EXT}`;
            loserFrameHandler = requestAnimationFrame(loserAnimation);
            loserCounter++;
        }
    }, LOSER_ROTATION_INTERVAL);
}


/*
    Function to animate tied images
*/
function tiedAnimation() {

    // Call animation frame
    tiedTimerHandler = setTimeout(() => {
        if(tiedCounter != TIED_LAST_IMG_NUM + INCREMENT_VALUE){
            TIED_IMG_ELM.src =`${TIED_IMG_PATH}${TIED_IMG_NAME}${tiedCounter}${TIED_IMG_EXT}`;
            tiedFrameHandler = requestAnimationFrame(tiedAnimation);
            tiedCounter++;

        } else {
            tiedCounter = TIED_FIRST_IMG_NUM;
            TIED_IMG_ELM.src =`${TIED_IMG_PATH}${TIED_IMG_NAME}${tiedCounter}${TIED_IMG_EXT}`;
            tiedFrameHandler = requestAnimationFrame(tiedAnimation);
            tiedCounter++;
        }
    }, TIED_ROTATION_INTERVAL);
}



/*  =================================================================================================================================================== */
/*  =================================================================================================================================================== */
/*                                                              DICE GAME FUNCTIONS                                                                     */
/*  =================================================================================================================================================== */
/*  =================================================================================================================================================== */


/*
    Function to reset game parameters before starting a new game
*/
function resetDiceGame() {

    // remove them styling
    GAME_WINDOW[0].classList.remove(`box-shadow-${playerColor}`);
    GAME_WINDOW[0].classList.remove(`box-shadow-${computerColor}`);
    GAME_WINDOW[1].classList.remove(`box-shadow-${playerColor}`);
    GAME_WINDOW[1].classList.remove(`box-shadow-${computerColor}`);

    // reset colors
    chosenColor             = '';
    playerColor             = '';
    computerColor           = '';
    playerFrameBgColor      = '';
    computerFrameBgColor    = '';
    playerDice              = null;
    computerDice            = null;

    // remove dice images
    PLAYER_DICE_DIV.innerHTML   = '';
    COMPUTER_DICE_DIV.innerHTML = '';

    // remove all scores
    SCORE_UL.innerHTML = '';

    // Reset roundNumber
    roundNumber = 1;

    // Enable roll dice button
    ROLL_DICE_BTN.removeAttribute('disabled');
    ROLL_DICE_BTN.classList.remove('btn-disabled');
    ROLL_DICE_BTN.classList.add('btn-purple');

    // Remove game summary
    fadeInElements([GAME_CONTROLLERS]);
    fadeOutElements([GAME_SUMMARY]);

}


/*
    Function to set the color theme for the player and computer based on the player's choice
*/
function changePlayersColorTheme(chosenColor) {

    // Hide elements
    hideElements([GAME_SUMMARY]);
    
    // Set player's & computer's colors variables
    if(chosenColor == 'blue') {
        playerColor             = 'blue';
        computerColor           = 'red';
        playerFrameBgColor      = '#dceeff';
        computerFrameBgColor    = '#fbe2e0';

    } else if(chosenColor == 'red') {
        playerColor             = 'red';
        computerColor           = 'blue';
        playerFrameBgColor      = '#fbe2e0';
        computerFrameBgColor    = '#dceeff';
    } 
   
    
    // Create the dices
    let playerDiceFaces = [];
    for(let i = DICE_MIN_FACE; i <= DICE_MAX_FACE; i++) {
        playerDiceFaces.push(new DiceFace(DICES_IMG_PATH, 'red', i));
    }

    let computerDiceFaces = [];
    for(let i = DICE_MIN_FACE; i <= DICE_MAX_FACE; i++) {
        computerDiceFaces.push(new DiceFace(DICES_IMG_PATH, 'red', i));
    }

    playerDice      = new Dice(playerColor, playerDiceFaces[0], playerDiceFaces[1], playerDiceFaces[2], playerDiceFaces[3], playerDiceFaces[4], playerDiceFaces[5]);
    computerDice    = new Dice(computerColor, computerDiceFaces[0], computerDiceFaces[1], computerDiceFaces[2], computerDiceFaces[3], computerDiceFaces[4], computerDiceFaces[5]);

    // Set game frame border color
    GAME_WINDOW[0].classList.add(`box-shadow-${playerColor}`);
    GAME_WINDOW[0].style.backgroundColor = playerFrameBgColor;

    GAME_WINDOW[1].classList.add(`box-shadow-${computerColor}`);
    GAME_WINDOW[1].style.backgroundColor = computerFrameBgColor;
    
    
    // Load pre-game images
    PLAYER_DICE_DIV.innerHTML   = `<img class="block my-auto mx-auto" src="${DICES_IMG_PATH}default-${playerColor}.svg" alt="${playerColor} hand throwing two ${playerColor} dices">`;
    COMPUTER_DICE_DIV.innerHTML = `<img class="block my-auto mx-auto" src="${DICES_IMG_PATH}default-${computerColor}.svg" alt="${computerColor} hand throwing two ${computerColor} dices">`;
    
    // Set the scores color as per player's color choice
    document.querySelectorAll('.value-display').forEach(span => {

        // Check for id with string 'player'
        if(span.getAttribute('id').indexOf('player') >= 0) {
            span.classList.add(`color-${playerColor}`);

        // Check for id with string 'computer
        } else if(span.getAttribute('id').indexOf('computer') >= 0) {
            span.classList.add(`color-${computerColor}`);
        }
    });

    // Play game start sound
    playSoundEffect(GAME_START_AUDIO);
}


/*
    Function to show color choice window
*/
function newDiceGame() {

    // Reset the game
    resetDiceGame()

    // Show pop-up window for color choices
    WRAPPER.classList.add('blur');
    fadeInElements([POP_UP_WINDOW]);

    // Event listener for color choice
    let btnChoices = document.getElementsByName('btn-color-choice');
    btnChoices.forEach(choice => {
        choice.addEventListener('click', () => {

            if(choice.getAttribute('id') == 'color-choice-red'){
                chosenColor = 'red';
            } else if(choice.getAttribute('id') == 'color-choice-blue'){
                chosenColor = 'blue';
            }

            // Call the function to apply the color theme
            changePlayersColorTheme(chosenColor);

            fadeOutElements([POP_UP_WINDOW]);
            WRAPPER.classList.remove('blur');
        });
    });  

}


/*
    Function to animate dice images when rolling
*/
function rollingDiceAnimation() {

    if(rotation) {
        // Call animation frame
        diceTimerHandler = setTimeout(() => {
    
            if(diceCounter1 != MAX_DICE_NUMBER){
                PLAYER_DICE_DIV.innerHTML = '';
                PLAYER_DICE_DIV.insertAdjacentHTML('afterbegin', `<img class="block my-auto mx-auto" src="../graphics/images/dice/dice-${playerColor}-${diceCounter1}.svg" alt="${playerColor} dice number ${diceCounter1}">`);
                diceCounter1++;
            } else {
                diceCounter1 = MIN_DICE_NUMBER;
                PLAYER_DICE_DIV.innerHTML = '';
                PLAYER_DICE_DIV.insertAdjacentHTML('beforeend', `<img class="block my-auto mx-auto" src="../graphics/images/dice/dice-${playerColor}-${diceCounter1}.svg" alt="${playerColor} dice number ${diceCounter1}">`);
                diceCounter1++;
            }

            if(diceCounter2 != MAX_DICE_NUMBER) {
                PLAYER_DICE_DIV.insertAdjacentHTML('afterbegin', `<img class="block my-auto mx-auto" src="../graphics/images/dice/dice-${playerColor}-${diceCounter2}.svg" alt="${playerColor} dice number ${diceCounter2}">`);
                diceCounter2++;
            } else {
                diceCounter2 = MIN_DICE_NUMBER;
                PLAYER_DICE_DIV.insertAdjacentHTML('beforeend', `<img class="block my-auto mx-auto" src="../graphics/images/dice/dice-${playerColor}-${diceCounter2}.svg" alt="${playerColor} dice number ${diceCounter2}">`);
                diceCounter2++;
            }
                
            if(diceCounter3 != MAX_DICE_NUMBER) {
                COMPUTER_DICE_DIV.innerHTML = '';
                COMPUTER_DICE_DIV.insertAdjacentHTML('afterbegin', `<img class="block my-auto mx-auto" src="../graphics/images/dice/dice-${computerColor}-${diceCounter3}.svg" alt="${computerColor} dice number ${diceCounter3}">`);
                diceCounter3++;
            } else {
                diceCounter3 = MIN_DICE_NUMBER;
                COMPUTER_DICE_DIV.innerHTML = '';
                COMPUTER_DICE_DIV.insertAdjacentHTML('beforeend', `<img class="block my-auto mx-auto" src="../graphics/images/dice/dice-${computerColor}-${diceCounter3}.svg" alt="${computerColor} dice number ${diceCounter3}">`);
                diceCounter3++;
            }
                
            if(diceCounter4 != MAX_DICE_NUMBER) {
                COMPUTER_DICE_DIV.insertAdjacentHTML('afterbegin', `<img class="block my-auto mx-auto" src="../graphics/images/dice/dice-${computerColor}-${diceCounter4}.svg" alt="${computerColor} dice number ${diceCounter4}">`);
                diceCounter4++;
            } else {
                diceCounter4 = MIN_DICE_NUMBER;
                COMPUTER_DICE_DIV.insertAdjacentHTML('beforeend', `<img class="block my-auto mx-auto" src="../graphics/images/dice/dice-${computerColor}-${diceCounter4}.svg" alt="${computerColor} dice number ${diceCounter4}">`);
                diceCounter4++;
            }
                
            diceFrameHandler = requestAnimationFrame(rollingDiceAnimation);

        }, DICE_ROTATION_INTERVAL);


    }
}


/*
    Function to roll the dices for 1 round
*/
function rollDice() {

    // Play rolling dice sound
    playSoundEffect(ROLLING_DICE_AUDIO);
    
    /* Math.random() return a float between 0 and 1
       Math.random() * MAX_DICE_NUMBER return a number between 0 and the MAX_DICE_NUMBER
       Math.floor() will round down the float and return the largest integer
       Since result will always be between 0 and MAX_DICE_NUMBER, add 1 to the result so it will be between 1 and MAX_DICE_NUMBER inclusive
    */
    playerDiceOneRoll   = Math.floor(Math.random() * MAX_DICE_NUMBER) + 1;
    playerDiceTwoRoll   = Math.floor(Math.random() * MAX_DICE_NUMBER) + 1;

    computerDiceOneRoll = Math.floor(Math.random() * MAX_DICE_NUMBER) + 1;
    computerDiceTwoRoll = Math.floor(Math.random() * MAX_DICE_NUMBER) + 1;

    // run dice animation effect
    rotation = true;
    rollingDiceAnimation();

    // stop rolling dice animation effect after 2 seconds
    setTimeout(() => {
        rotation = false;
    }, 2000);

    // after an additional 0.1 second (to prevent overlapping) update actual rolled dice image and score
    setTimeout(() => {
        // Remove the current img in the player's div and append with the 2 dice img
        PLAYER_DICE_DIV.innerHTML   = '';
        PLAYER_DICE_DIV.innerHTML   += `<img class="block my-auto mx-auto" src="${playerDice.getFace(playerDiceOneRoll).getFaceFullImgName(playerDiceOneRoll)}" alt="${playerColor} dice number ${playerDiceOneRoll}">`;
        PLAYER_DICE_DIV.innerHTML   += `<img class="block my-auto mx-auto" src="${playerDice.getFace(playerDiceTwoRoll).getFaceFullImgName(playerDiceTwoRoll)}" alt="${playerColor} dice number ${playerDiceTwoRoll}">`;

        // Remove the current img in the computer's div and append with the 2 dice img
        COMPUTER_DICE_DIV.innerHTML     = '';
        COMPUTER_DICE_DIV.innerHTML   += `<img class="block my-auto mx-auto" src="${computerDice.getFace(computerDiceOneRoll).getFaceFullImgName(computerDiceOneRoll)}" alt="${computerColor} dice number ${computerDiceOneRoll}">`;
        COMPUTER_DICE_DIV.innerHTML   += `<img class="block my-auto mx-auto" src="${computerDice.getFace(computerDiceTwoRoll).getFaceFullImgName(computerDiceTwoRoll)}" alt="${computerColor} dice number ${computerDiceTwoRoll}">`;

        // Reset the player's scores for this round before updating
        playerScoreThisRound      = 0;
        computerScoreThisRound    = 0;

        // If player rollled any 1, score will be 0
        if(playerDiceOneRoll == 1 || playerDiceTwoRoll == 1) {
            playerScoreThisRound = 0

            // Play round lost sound effect
            playSoundEffect(ROUND_LOST_AUDIO);


        // If player rolls a double
        } else if(playerDiceOneRoll == playerDiceTwoRoll) {
            playerScoreThisRound = (playerDiceOneRoll + playerDiceTwoRoll) * 2;

            // Play round lost sound effect
            playSoundEffect(BONUS_SCORE_AUDIO);


        // If player rolls anything else
        } else {
            playerScoreThisRound = (playerDiceOneRoll + playerDiceTwoRoll)
        }

        // Add the current round score to the total
        playerTotalScore += playerScoreThisRound;


        // Update DOM for player's score
        SCORES_CONTAINER[0].innerHTML = `
                                    <li>You rolled a <span class="bold color-${playerColor}">${playerDiceOneRoll}</span> and a <span class="bold color-${playerColor}">${playerDiceTwoRoll}</span</li>
                                    <li>Your score for this round is: <span class="bold color-${playerColor}">${playerScoreThisRound}</span></li>
                                    <li>Total Score: <span class="bold color-${playerColor}">${playerTotalScore}</span></li>
                                `;


        // If computer rollled any 1, score will be 0
        if(computerDiceOneRoll == 1 || computerDiceTwoRoll == 1) {
            computerScoreThisRound = 0


        // If computer rolls a double
        } else if(computerDiceOneRoll == computerDiceTwoRoll) {
            computerScoreThisRound = (computerDiceOneRoll + computerDiceTwoRoll) * 2;


        // If computer rolls anything else
        } else {
            computerScoreThisRound = (computerDiceOneRoll + computerDiceTwoRoll)
        }

        // Add the current round score to the total
        computerTotalScore += computerScoreThisRound;


        // Update DOM for computer's score
        SCORES_CONTAINER[1].innerHTML = `
                                    <li>You rolled a <span class="bold color-${computerColor}">${computerDiceOneRoll}</span> and a <span class="bold color-${computerColor}">${computerDiceTwoRoll}</span</li>
                                    <li>Your score for this round is: <span class="bold color-${computerColor}">${computerScoreThisRound}</span></li>
                                    <li>Total Score: <span class="bold color-${computerColor}">${computerTotalScore}</span></li>
                                `;
        

        // if player did not score a one nor a bonus and also beat computer
        if((playerDiceOneRoll != 1 && playerDiceTwoRoll !=1) && (playerDiceOneRoll != playerDiceTwoRoll) && (playerScoreThisRound > computerScoreThisRound)) {
            
            // Play round won sound effect
            playSoundEffect(ROUND_WON_AUDIO);


        // if player did not score a one nor a bonus and did not beat computer
        } else if((playerDiceOneRoll != 1 && playerDiceTwoRoll !=1) && (playerDiceOneRoll != playerDiceTwoRoll) && (playerScoreThisRound < computerScoreThisRound)) {

            // Play round won sound effect
            playSoundEffect(ROUND_LOST_AUDIO);


        // if player did not score a one nor a bonus and tied with computer  
        } else if((playerDiceOneRoll != 1 && playerDiceTwoRoll !=1) && (playerDiceOneRoll != playerDiceTwoRoll) && (playerScoreThisRound == computerScoreThisRound)) {

            // Play round won sound effect
            playSoundEffect(ROUND_TIED_AUDIO);
        }

        // Updare results string
        results += `<tr><td>${roundNumber - 1}</td><td><span class="bold color-${playerColor}">${playerScoreThisRound}</span> <span class="dice-values italic">(first dice: <span class="bold">${playerDiceOneRoll}</span>, second dice: <span class="bold">${playerDiceTwoRoll}</span>)</span></td><td><span class="bold color-${computerColor}">${computerScoreThisRound}</span> <span class="dice-values italic">(first dice: <span class="bold">${computerDiceOneRoll}</span>, second dice: <span class="bold">${computerDiceTwoRoll}</span>)</span></td></tr>`;

    }, 2100)
    
}


/*
    Function to show final score after MAX_ROUND rounds have been played
*/
function diceGameOver(playerTotalScore, computerTotalScore) {

    // Remove game controllers and show summary
    fadeOutElements([GAME_CONTROLLERS]);
    fadeInElements([GAME_SUMMARY]);
    showElements([GAME_SUMMARY]);

    // Player won
    if(playerTotalScore > computerTotalScore) {
        setTimeout(() => {
            imgScr = WINNER_IMG_PATH + WINNER_IMG_NAME + WINNER_FIRST_IMG_NUM + WINNER_IMG_EXT;
            imgAlt = 'animated winner images';
            playSoundEffect(GAME_WON_AUDIO);
            winnerAnimation();
        }), 1500;


    // Game Tied
    } else if(playerTotalScore == computerTotalScore) {
        setTimeout(() => {
            imgScr = TIED_IMG_PATH + TIED_IMG_NAME + TIED_FIRST_IMG_NUM + TIED_IMG_EXT;
            imgAlt = 'animated game lost images';
            playSoundEffect(GAME_TIED_AUDIO);
            tiedAnimation();
        }), 1500;


    // Player lost
    } else {
        setTimeout(() => {
            imgScr = LOSER_IMG_PATH + LOSER_IMG_NAME + LOSER_FIRST_IMG_NUM + LOSER_IMG_EXT;
            imgAlt = 'animated game tied images';
            playSoundEffect(GAME_LOST_AUDIO);
            loserAnimation();
        }), 1700;
    }

    
    // Append game summary with results
    results += `<tr>
                    <td class="bold">Total</td>
                    <td class="bold"><span class="table-total-value bold color-${playerColor}">${playerTotalScore}</span></td>
                    <td class="bold"><span class="table-total-value bold color-${computerColor}">${computerTotalScore}</span></td>
                </tr>
                </tbody>
                </table>
                `;
    
    GAME_SUMMARY.insertAdjacentHTML('beforeend', results);
}




/*  =================================================================================================================================================== */
/*  =================================================================================================================================================== */
/*                                                              HANGMAN GAME FUNCTIONS                                                                  */
/*  =================================================================================================================================================== */
/*  =================================================================================================================================================== */


/*
    Function to reset the DOM for a new game to start
*/
function resetHangmanGame() {

    // stop all sounds (if any are playing)
    stopAllSounds()

    // reset variables and update DOM elements
    WRONG_GUESSES.innerHTML         = STARTING_WRONG_GUESS;
    TOTAL_GUESSES.innerHTML         = MAX_GUESSES;
    ADDTIONAL_HINT.innerHTML        = '';
    WORD_SPACES.innerHTML           = '';
    KEYBOARD.innerHTML              = '';
    dashSpan                        = '';
    answer                          = ''; 
    allGuesses                      = [];
    wrongLetters                    = [];
    correctLettersCount             = 0;
    wrongGuesses                    = STARTING_WRONG_GUESS;
    extraHintUsed                   = false;


    // Enable extra hint button
    EXTRA_HINT_BTN.removeAttribute('disabled');
    EXTRA_HINT_BTN.classList.remove('btn-disabled');
    EXTRA_HINT_BTN.classList.add('btn-outline-danger');

}


/*  Select a category:
    - hide all game in progress windows
    - show the select category windows
    - reset the hangman graphic to the game start image
*/
function selectCategory() {

    hideElements([GAME_IN_PROGESS, GAME_OVER]);
    fadeInElements([CATEGORY_SELECTION]);
    showElements([CATEGORY_SELECTION]);

    HANGMAN_IMAGES.src = `${IMAGE_PATH}${IMAGE_COMMON_NAME}${STARTING_WRONG_GUESS}${IMAGE_EXTENTION}`;
    HANGMAN_IMAGES.alt += `${STARTING_WRONG_GUESS}`;
}


/*
    Function to generate a random word based on selected category
    - iterate over the main array of words and push objects with matching categpry to the user selection to a temp array
    - use the Math.random function to generate a random word from the tempArr
    - Math.random() returns a float value between 0 and 1
    - multiply it by the length of the tempArr
    - use Math.Floor to convert to int.
    - the value will always be between 0 and array.length inclusive (the perfect index)
    - pass this value as the array index to return the word obj selected at random
    - uppercase all letters since the keys for the user to use will be all in uppercase
    - assign the answer and its hints to variables.
*/
function randomWord(category) {

    // create an empty array to store only words that matches category selected by user
    let tempArr = [];

    // iterate over the main wordsArr and push only the ones with same category
    wordsArray.forEach(obj => {
        if(obj.getCategory() == category){
            tempArr.push(obj);
        }
    });

    // pick a random word obj from tempArr
    worObj      = tempArr[Math.floor(Math.random() * tempArr.length)];

    // get the answer and its hints
    answer      = worObj.getName().toUpperCase();
    hint        = worObj.getHintOne();
    extraHint   = worObj.getHintTwo();

    // for reference only
    console.log(answer);
}


/*
    Function to generate controllers:
    - generated dashes for each of the letter in the word
    - add them to the DOM by creating a span for each
    - generate a button for each alphabet A-Z (uppercase using ASCII code)
    - genrate another two buttons (one for hyphen and one for space)
*/
function generateControllers() {

    // Replace every letter with span containing dash
    for (let i = ARRAY_STARTING_POINT; i < answer.length; i++) {
        dashSpan += `<span id="dash-index-${i}" class="dashes">?</span>`;
    }

    // Display each element as span
    WORD_SPACES.innerHTML += dashSpan;

    // Display category selected and a word hint
    WORD_CATEGORY_SPAN.innerHTML    = worObj.stringToTitleCase(selectedCategory);
    WORD_HINT.innerHTML             = hint;

    // Generate a button for each letter A-Z using SCII code
    for (let i = ASCII_CODE_LETTER_A; i <= ASCII_CODE_LETTER_Z; i++) {
        let letter = String.fromCharCode(i);
        let buttonTab = `<button id="letter-ascii-${i}" name="${i}" class="keyboard-letter btn-small btn-outline-primary">${letter}</button>`;
        KEYBOARD.innerHTML += buttonTab;
    }

    // Generate a hyphen and spacebar button
    let dashBtn = `<button id="letter-ascii-${ASCII_CODE_HYPHEN}" name="${ASCII_CODE_HYPHEN}" class="keyboard-letter btn-small btn-outline-primary">${String.fromCharCode(ASCII_CODE_HYPHEN)}</button>`;
    KEYBOARD.innerHTML += dashBtn;

    let spaceBtn = `<button id="letter-ascii-${ASCII_CODE_SPACE}" name="${ASCII_CODE_SPACE}" class="keyboard-letter space-bar-key btn-small btn-outline-primary">space</button>`;
    KEYBOARD.innerHTML += spaceBtn;

    // Event listener for each keyboard letter
    document.querySelectorAll('.keyboard-letter').forEach(key => {
        key.addEventListener('click', () => {
            guess(key.getAttribute('name'));
        });
    })
}

 
/*
    Function to handle the letter the user clicks.
    - Updates guesses array and disable that button
    - Increase correctLettersCount
    - Check if all letters have been guessed, if yes call gameWon()
    - If game not yet won, check if letter present in word and reveal the letters by replaing the dash with the letter guessed
    - Check if not present in word, increment wrongGuesses.
    - Check if only 2 guesses left and extra hint not used, then show a last chance window for extra hint.
    - Check if only 1 guess left, then play warning sound.
    - Check if MAX_GUESSES reach, game is over
*/
function guess(asciiCharCode) {

    // Add letter in the guesses array
    allGuesses.push(asciiCharCode);

    // Disable the button for that letter so the user cannot click it again
    document.getElementById(`letter-ascii-${asciiCharCode}`).setAttribute('disabled', true);
    document.getElementById(`letter-ascii-${asciiCharCode}`).classList.remove('btn-outline-primary');
    document.getElementById(`letter-ascii-${asciiCharCode}`).classList.add('btn-disabled');

   
    // If letter is present in word, check for multiple occurrences by looping on the word length. Add each index to an array
    let indices = [];

    for(let i = ARRAY_STARTING_POINT; i < answer.length; i++) {
        if(answer.charAt(i).charCodeAt(0) == asciiCharCode){
            
            // Increment count (to keep track of answer length if equal to count)
            correctLettersCount++;

            // Add answer idex of guessed letter to indices array
            indices.push(i);
        }
    }
      

    // Game won
    if(correctLettersCount == answer.length) {

        // Hide loser's image tag
        LOSER_IMG_ELM.style.display = 'none';

        // Show the winner's image tag
        WINNER_IMG_ELM.style.display = 'block';

        // Stop all sounds if any are playing
        stopAllSounds();

        // Play game won sound
        playSoundEffect(GAME_WON_AUDIO);

        // Hide game in progress div
        hideElements([GAME_IN_PROGESS]);

        // Show game over div
        showElements([GAME_OVER, GAME_SUMMARY, WINNER_IMAGE]);

        // Update game summary
        GAME_SUMMARY.innerHTML = `You guessed the word: <span id="word-reveal" class="color-success">${answer}</span>`;

        // Winner images animation
        clearTimeout(winnerTimerHandler);
        winnerAnimation();   

        return;
    }


    // If letter is present in word, replace its/theirs dash/dashes with the letter itself and add some styling classes
    if(indices.length > EMPTY_ARRAY_LENGTH) {
   
        // Replace all dashes which are placeholders for letters with the correct letters
        indices.forEach(index => {
            let dashesElm = document.getElementById(`dash-index-${index}`);
            dashesElm.classList.remove('dashes');
            dashesElm.classList.add('correct-letter');
            dashesElm.innerHTML = String.fromCharCode(asciiCharCode);
        })

        // Play a 'correct' sound
        stopAllSounds();
        playSoundEffect(CORRECT_GUESS_AUDIO);

        return;
    }


    // If letter not present in word
    // Increment wrong guess count
    wrongGuesses ++;
    
    // Update picture
    HANGMAN_IMAGES.src = `${IMAGE_PATH}${IMAGE_COMMON_NAME}${wrongGuesses}${IMAGE_EXTENTION}`;

    // Update wrong guess count in the DOM
    WRONG_GUESSES.innerHTML = wrongGuesses

    // Add guessed letter to wrongLettersArray 
    wrongLetters.push(String.fromCharCode(asciiCharCode));

    // Update the wrong letters on the DOM in the WRONG_LETTERS
    let guessesList = '';

    wrongLetters.forEach(character => {

        if(character == 'hyphen') {
            guessesList += `<span class="wrong-letter-guess">&apos;-&apos;</span>,`;

        } else if(character == ' ') {
            guessesList += `<span class="wrong-letter-guess">&lsqb;space&rsqb;</span>,`;

        } else if(character == 'hint') {
            guessesList += `<span class="wrong-letter-guess">&lsqb;hint used&rsqb;</span>,`;

        } else {
            guessesList += `<span class="wrong-letter-guess">${character}</span>,`;
        
        }      
    });
    
    // Remove trailing comma (last character of string which is length minus 1 (DECREMENT_VALUE)
    guessesList = guessesList.substring(ARRAY_STARTING_POINT, guessesList.length - DECREMENT_VALUE);
    WRONG_LETTERS.innerHTML = guessesList;
        
    // Show the wrong letters guessed container
    showElements([WRONG_GUESSES_CONTAINER]);
    
    // If user has only 2 more guesses left, show the final chance for an extra hint pop-up (if not used already)
    if((wrongGuesses == MAX_GUESSES - DECREMENT_VALUE - DECREMENT_VALUE) && !extraHintUsed) {
        
        // Show final chance for hint message
        WRAPPER.classList.add('blur');
        showElements([HINT_LAST_CHANCE_WINDOW]);
        fadeInElements([HINT_LAST_CHANCE_WINDOW]);

        // Play warning sound
        stopAllSounds();
        playSoundEffect(GUESSES_WARNING_AUDIO);
        
        return;
    }


    // If user has only 1 more guess left, play a warning sound
    if(wrongGuesses == MAX_GUESSES - DECREMENT_VALUE) {
        
        // Show final guess message
        showElements([FINAL_GUESS_CONTAINER]);

        // diable extra hint button
        EXTRA_HINT_BTN.setAttribute('disabled', true);
        EXTRA_HINT_BTN.classList.remove('btn-outline-danger');
        EXTRA_HINT_BTN.classList.add('btn-disabled');
    
        // Play warning sound
        stopAllSounds();
        playSoundEffect(GUESSES_WARNING_AUDIO);

        return;
    }


    // If max tries reach, game is over
    if(wrongGuesses >= MAX_GUESSES) {

        // Hide winner's image tag
        hideElements([GAME_IN_PROGESS, WINNER_IMAGE]);

        // show game summary and game lost images
        showElements([GAME_OVER, GAME_SUMMARY, LOSER_IMAGE]);

        // Game over
        // Stop all sounds if any are playing
        stopAllSounds();
        
        // Play game lost sound
        playSoundEffect(GAME_LOST_AUDIO);

        // Update game summary
        GAME_SUMMARY.innerHTML = `The word to be guessed was: <span id="word-reveal" class="color-danger">${answer}</span>`;

        // Loser images animation
        clearTimeout(loserTimerHandler);
        loserAnimation(); 

        return;
    }
    
    // Play a 'incorrect' sound
    stopAllSounds();
    playSoundEffect(INCORRECT_GUESS_AUDIO);
    
}


/*
    Function to handle an additional hint request
*/
function additionalHintRequest() {

    // Stop all sounds if any are playing
    stopAllSounds();

    // Play hint used sound
    playSoundEffect(HINT_USED_AUDIO);

    // disable the extra hint button
    EXTRA_HINT_BTN.setAttribute('disabled', true);
    EXTRA_HINT_BTN.classList.remove('btn-outline-danger');
    EXTRA_HINT_BTN.classList.add('btn-disabled');

    // display extra hint
    ADDTIONAL_HINT.innerHTML = extraHint;
    
    // Increment wrong guess count
    wrongGuesses ++;

    // Update picture
    HANGMAN_IMAGES.src = `${IMAGE_PATH}${IMAGE_COMMON_NAME}${wrongGuesses}${IMAGE_EXTENTION}`;

    // Update the boolen extraHintUsed to true
    extraHintUsed = true;

    // Update wrong guess count in the DOM
    WRONG_GUESSES.innerHTML = wrongGuesses

    // Add guessed letter to wrongLettersArray 
    wrongLetters.push('hint');

    // Display the wrong letters on the DOM in the guessLettersElm
    let guessesList = '';

    wrongLetters.forEach(character => {

        if(character == 'hyphen') {
            guessesList += `<span class="wrong-letter-guess">&apos;-&apos;</span>,`;

        } else if(character == ' ') {
            guessesList += `<span class="wrong-letter-guess">&lsqb;space&rsqb;</span>,`;

        } else if(character == 'hint') {
            guessesList += `<span class="wrong-letter-guess">&lsqb;hint used&rsqb;</span>,`;

        } else {
            guessesList += `<span class="wrong-letter-guess">${character}</span>,`;
        
        }      
    });
    
    // Remove trailing comma (last character of string which is length minus 1 (DECREMENT_VALUE)
    guessesList = guessesList.substring(ARRAY_STARTING_POINT, guessesList.length - DECREMENT_VALUE);
    WRONG_LETTERS.innerHTML = guessesList;
        

    // Show the wrong letters guessed container
    showElements([ADDTIONAL_HINT_CONTAINER, WRONG_GUESSES_CONTAINER]);
}


/*
    Function to start a new hangman game
    Paramater: string that match words with Word.category
*/
function newHangmanGame(category){

    // play 'game start' sound effect
    playSoundEffect(GAME_START_AUDIO);

    // assign the selected category to the global vaiable selectedCategory
    selectedCategory = category;

    // show and hide DOM elements
    hideElements([CATEGORY_SELECTION, WRONG_GUESSES_CONTAINER, FINAL_GUESS_CONTAINER, ADDTIONAL_HINT_CONTAINER]);
    CATEGORY_SELECTION.classList.remove('fade-in');
    showElements([GAME_IN_PROGESS, GUESS_COUNT_CONTAINER]);
    
    // generate a randow word
    randomWord(category);

    // generate game keyboard and button
    generateControllers();
}



/*  =================================================================================================================================================== */
/*  =================================================================================================================================================== */
/*                                                              DICE FUNCTIONS                                                                          */
/*  =================================================================================================================================================== */
/*  =================================================================================================================================================== */



/*  =================================================================================================================================================== */
/*                                                          SOUND EFFECTS SECTION                                                                       */
/*  =================================================================================================================================================== */

