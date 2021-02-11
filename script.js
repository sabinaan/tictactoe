

//gameboard 

const gameBoard = (() => {
    
    gameBoardArray = ["","","","","","","","",""];
    
    const rendering = function(){
        let queryArray = document.querySelectorAll(".boardCell")
        for (i = 0; i < 9; i++){
            queryArray[i].textContent = gameBoardArray[i]
        }
    }
    


    return {rendering, gameBoardArray}
})();


gameBoard.rendering();

//players

function player(name, playerSymbol) {
    return { name, playerSymbol };
}



// game

const gameControll = (() => {

    const player1 = player("Player 1", "x")
    const player2 = player("Player 2", "o")
    const playerArray = [player1, player2]
    let currentPlayer = 0;
    let gameOver = false;

    const changeCurrentPlayer = function(){
        if (currentPlayer == 0 ){
            currentPlayer = 1
        } else if (currentPlayer == 1) {
            currentPlayer = 0
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

        let symbol = playerArray[currentPlayer].playerSymbol
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
        }
    }
    

    const addMarker = function(e){
        let index = parseInt(e.target.getAttribute("data-index"))
        if (!gameBoard.gameBoardArray[index] && !gameOver){
            gameBoard.gameBoardArray[index] = playerArray[currentPlayer].playerSymbol
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
            messageContainer.textContent = playerArray[currentPlayer].name + " won!";
        } else{
            messageContainer.textContent = "It's a draw! Try agin!"
        }
        
        
    }
    

    return{currentPlayer}
})();



console.log("Game Start")