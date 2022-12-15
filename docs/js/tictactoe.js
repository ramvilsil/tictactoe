//Sets the active player
let activePlayer = "X";

//Array stores player's moves
let selectedSquares = [];

//"placeXOrO" function fills in a player's move
function placeXOrO(squareNumber) {
    //Checks if the square is not already in use
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        
        //Gets the selected square
        let select = document.getElementById(squareNumber);
        
        //X and O images are assigned to the players
        if (activePlayer === "X") {
            select.style.backgroundImage = 'url("images/x.png")';
    
        } else {
            select.style.backgroundImage = 'url("images/o.png")';
        }
        selectedSquares.push(squareNumber + activePlayer);

        //Calls "checkWinConditions" function, which checks if a player has won
        checkWinConditions();

        //Once the current player has completed their move
        //the active player switches
        if (activePlayer === "X") {
            activePlayer = "O";
        } else {
            activePlayer = "X";
        }

        //Calls to play a sound as a player makes their move
        audio("./media/place.mp3");

        //If it is the computer's turn, the user's clicks are rendered ineffective
        if (activePlayer === "O") {
            disableClick();

            //Waits 1 second before the computer places
            setTimeout(function () { computersTurn(); }, 1000);
        }
        return true;
    }


    //The computer selects a random square
    function computersTurn() {
        let success = false;

        let pickASquare;
        //Loops until a square that is not already in use is selected
        while (!success) {
            pickASquare = String(Math.floor(Math.random() * 9));
            //If the "pickASquare" variable is assigned true
            // then the square isn't already occupied
            if (placeXOrO(pickASquare)) {
                
                //Calls the "(placeXOrO)" function to place the computer's "O"
                placeXOrO(pickASquare);

                //Loop ends
                success = true;
            };
        }
    }
}

//Parses through the selectedSquares array to find win conditions
//A line is drawn on the screen if the condition is met, in other words, a player wins
function checkWinConditions() {
    
    //"X" marker conditions
    if (arrayIncludes("0X", "1X", "2X")) { drawWinLine(50, 100, 558, 100) }
    
    else if (arrayIncludes("3X", "4X", "5X")) { drawWinLine(50, 304, 558, 304) }

    else if (arrayIncludes("6X", "7X", "8X")) { drawWinLine(50, 508, 558, 508) }

    else if (arrayIncludes("0X", "3X", "6X")) { drawWinLine(100, 50, 100, 558) }

    else if (arrayIncludes("1X", "4X", "7X")) { drawWinLine(304, 50, 304, 558) }

    else if (arrayIncludes("1X", "4X", "7X")) { drawWinLine(304, 50, 304, 558) }

    else if (arrayIncludes("2X", "5X", "8X")) { drawWinLine(508, 50, 508, 558) }

    else if (arrayIncludes("6X", "4X", "2X")) { drawWinLine(100, 508, 510, 90) }

    else if (arrayIncludes("6X", "4X", "2X")) { drawWinLine(100, 508, 510, 90) }

    else if (arrayIncludes("0X", "4X", "8X")) { drawWinLine(100, 100, 520, 520) }

    //"O" marker conditions
    else if (arrayIncludes("0O", "1O", "2O")) { drawWinLine(50, 100, 558, 100) }

    else if (arrayIncludes("3O", "4O", "5O")) { drawWinLine(50, 304, 558, 304) }

    else if (arrayIncludes("6O", "7O", "8O")) { drawWinLine(50, 508, 558, 508) }

    else if (arrayIncludes("0O", "3O", "6O")) { drawWinLine(100, 50, 100, 558) }

    else if (arrayIncludes("1O", "4O", "7O")) { drawWinLine(304, 50, 304, 558) }

    else if (arrayIncludes("2O", "5O", "8O")) { drawWinLine(508, 50, 508, 558) }

    else if (arrayIncludes("6O", "4O", "2O")) { drawWinLine(100, 508, 510, 90) }

    else if (arrayIncludes("0O", "4O", "8O")) { drawWinLine(100, 100, 520, 520) }

    //If none of the above conditions are met, nobody wins
    //Procceeds with a tie scenario 
    else if (selectedSquares.length >= 9) {
        //Tie sound is played
        audio("media/tie.mp3");
        //Sets a 0.3 second timer before the "resetGame" function is called
        setTimeout(function () { resetGame(); }, 500);
    }

    //Checks if an array includes 3 strings
    function arrayIncludes(squareA, squareB, squareC) {
        //Variables check the 3 squares in a row
        const a = selectedSquares.includes(squareA);
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);

        //If the 3 squares are present then boolean "true" is returned 
        if (a === true && b === true && c === true) { return true; }


    }
}

//Disables the body element's response to clicks
function disableClick() {
    body.style.pointerEvents = "none";

    //After 1 second the body element's becomes clickable again
    setTimeout(function () { body.style.pointerEvents = "auto"; }, 1000);
}


//Takes the audio URL as a parameter and creates 
//An audio object 
function audio(audioURL) {
    let audio = new Audio(audioURL);

    //Play method plays the audio
    audio.play();
}

//Uses HTML canvas to draw the win condition lines
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    //Accesses the HTML canvas element
    const canvas = document.getElementById("win-lines");

    //Accesses the methods and properties to use on the canvas
    const c = canvas.getContext("2d");

    //Declares the start of the line at its axis (x, y) 
    let x1 = coordX1,
    y1 = coordY1,

    //Declares the end of the line at its axis (x, y) 
    x2 = coordX2,
    y2 = coordY2,

    //Stores temporary axis data which is updated in the animation loop
    x = x1,
    y = y1;

    //Interacts with the canvas
    function animateLineDrawing() {
        //Variable creates loop
        const animationLoop = requestAnimationFrame(animateLineDrawing);
    
        //Clears content from the previous loop iteration
        c.clearRect(0, 0, 608, 608);
        
        //Method begins a new path
        c.beginPath();
        //Moves to the starting point in the line
        c.moveTo(x1, y1);

        //Indicates the end point in the line
        c.lineTo(x, y);

        //Sets the width of the line
        c.lineWidth = 10;

        //Sets the line's color
        c.strokeStyle = "rgba(70, 255, 33, 0.8)";
        
        //Method performs the drawing
        c.stroke();

        //Checks if the line's endpoints are reached
        if (x1 <= x2 && y1 <= y2) {
            
            //Condition adds 10 to the previous end x endpoint
            if (x < x2) { x += 10; }
            
            //Condition adds 10 to the previous end y endpoint
            if (y < y2) { y += 10; }
    
            //Similar to the one above, 
            //Condition necessary for the 6, 4, 2 square win condition
            if (x >= x2 && y >= y2) { cancelAnimationFrame(animationLoop); }
            }
    
        //Similar to the one above, 
        //Condition necessary for the 6, 4, 2 square win condition
        if (x1 <= x2 && y1 >= y2) {
            if (x < x2) { x += 10; }
            
            if (y > y2) { y -= 10; }
    
            if (x >= x2 && y >= y2) { cancelAnimationFrame(animationLoop); }
    
            }
    
    }

    //Canvas is cleared after the win line is drawn
    function clear() {
        //Starts the animation loop
        const animationLoop = requestAnimationFrame(clear);
        //Clears canvas
        c.clearRect(0, 0, 608, 608);
        //Stops the animation loop
        cancelAnimationFrame(animationLoop);
    }

    //Disables clicking while the win sound is playing
    disableClick();
    //Plays the win sound
    audio("./media/winGame.mp3");
    //Calls animation loop
    animateLineDrawing();
    //Ends the animation loop
    setTimeout(function () { clear(); resetGame(); }, 1000);
}

//Resets the game, is calledd when there is a tie or win
function resetGame() {
    //Iterates through each HTML square element
    for (let i = 0; i < 9; i++) {
        //"square" variable fetches an HTML element
        let square = document.getElementById(String(i));
        //The elements' backgroundImage is removed
        square.style.backgroundImage = "";
    }
    
    //Array is reset for a new game
    selectedSquares = [];
}

