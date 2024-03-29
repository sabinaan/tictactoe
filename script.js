

//gameboard 

const gameBoard = (() => {
    
    gameBoardArray = ["","","","","","","","",""];
    
    const rendering = function(){
        let queryArray = document.querySelectorAll(".boardCell")
        for (i = 0; i < 9; i++){
            queryArray[i].textContent = gameBoardArray[i]
        }
    }
    
    const resetGameBoard = function(){
        for (i = 0; i < 9; i++){
            gameBoardArray[i] = "";
        }
    }
    
    const newGameClick = () => {
        resetGameBoard()
        rendering()
        gameControll.resetProperties();
    }

    const resetButtonClick = () => {
        resetGameBoard()
        rendering()
        gameControll.resetProperties();
        gameControll.resetPlayerScore();
        
    }

    const newGameButton = document.querySelector("#newGameButton");
    newGameButton.addEventListener("click", newGameClick);

    const resetGameButton = document.querySelector("#resetButton");
    resetGameButton.addEventListener("click", resetButtonClick);


    return {rendering, gameBoardArray}
})();


gameBoard.rendering();

//players

function player(name, id, number, playerSymbol, score) {
    return { name, id, number, playerSymbol, score};
}



// game

const gameControll = (() => {

    const player1 = player("Player 1","player1", 1,  "o", 0)
    const player2 = player("Player 2", "player2", 2, "x", 0)
    const playerArray = [player1, player2]
    let currentPlayer = playerArray[0];
    let gameOver = false;

    const resetProperties = function(){
        gameOver = false;
        currentPlayer = playerArray[0];
        changeCurrentPlayerBorder()
        changeWinningMessage("reset");
    }
    const resetPlayerScore = function(){
        for (i = 0; i <= 1; i ++){
            playerArray[i].score = 0;
            let scoreCell = document.querySelector(`#score${playerArray[i].number}`);
            scoreCell.textContent = 0;
        }
    }

    const changeCurrentPlayer = function(){
        if (currentPlayer == playerArray[0] ){
            currentPlayer = playerArray[1]
        } else {
            currentPlayer = playerArray[0]
        }
        changeCurrentPlayerBorder()
    }

    const changeCurrentPlayerBorder = function(){
        let currentPlayerDivArr = document.querySelectorAll(".player")
        for( i = 0; i < 2; i++){
            let player = currentPlayerDivArr[i]
            if (player.id == currentPlayer.id){
                player.classList.add("currentPlayer")
            }else{
                player.classList.remove("currentPlayer")
            }
            
        }
    }

    const checkForWin = () => {
        winningConditions = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]

        if (!gameBoard.gameBoardArray.includes("")){
            changeWinningMessage("draw");
        }

        let symbol = currentPlayer.playerSymbol
        for (let i = 0; i < 8; i++){
            let testCondition = winningConditions[i];
            let a = gameBoard.gameBoardArray[testCondition[0]];
            let b = gameBoard.gameBoardArray[testCondition[1]];
            let c = gameBoard.gameBoardArray[testCondition[2]];
            
            
            if (a == symbol && b ==  symbol &&  c == symbol){
                console.log("player win: "+ symbol);
                gameOver = true;
                break;
            }

        }
        if (gameOver == true){
            changeWinningMessage("win");
            changeScore();
        }
    }
    
    const changeScore = function(){
        let newScore = currentPlayer.score + 1
        currentPlayer.score = newScore;
        let scoreCell = document.querySelector(`#score${currentPlayer.number}`);
        scoreCell.textContent = newScore;
        console.log(currentPlayer.score)
    }

    const addMarker = function(e){
        let index = parseInt(e.target.getAttribute("data-index"))
        if (!gameBoard.gameBoardArray[index] && !gameOver){
            gameBoard.gameBoardArray[index] = currentPlayer.playerSymbol
            gameBoard.rendering()
            checkForWin()
            changeCurrentPlayer()
        }
        
    }

    const boardGameCells = document.querySelectorAll(".boardCell")
    boardGameCells.forEach(element => {
        element.addEventListener("click", addMarker)
    })

    function changeWinningMessage(gameOutcome){
        let messageContainer = document.querySelector("#message");
        if (gameOutcome === "win"){
            messageContainer.textContent = currentPlayer.name + " won!";
        } else if(gameOutcome === "draw"){
            messageContainer.textContent = "It's a draw! Try agin!"
        } else if(gameOutcome === "reset"){
            messageContainer.textContent = "";
        }
    }

    return{currentPlayer, resetProperties, resetPlayerScore}
})();



console.log("Game Start")