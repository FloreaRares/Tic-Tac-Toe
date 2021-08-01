const cells = document.getElementsByClassName("gameCell");
const winningCombinations = [																		// Array with all the possible winning combinations of indexes.
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];
var firstPlayer = {
	name: "Player 1",
	symbol: "X",
	score: 0
};
var secondPlayer = {
	name: "Player 2",
	symbol: "O",
	score: 0
};
var currentPlayer, markedCells;

window.onload = startGame();

function startGame() {
	markedCells = 0;
	currentPlayer = firstPlayer;
	document.getElementById("player1Score").innerHTML = firstPlayer.score;
	document.getElementById("player2Score").innerHTML = secondPlayer.score;
	document.getElementById("player").innerHTML = currentPlayer.name;
	for(let i = 0; i < cells.length; ++i) {
		cells[i].addEventListener("click", markCell);
	}
}

function resetGame() {
	for(let i = 0; i < cells.length; ++i) {
		cells[i].innerText = "";
	}
	startGame();
}

function markCell() {
	var currentCell = document.getElementById(this.id);
	if((currentCell.innerText !== "X") && (currentCell.innerText !== "O")) {                    		// Check if cell is available.
		currentCell.innerHTML += `<span class = "symbol">` + currentPlayer.symbol + `</span>`;   
		currentCell.setAttribute("style", "cursor: not-allowed;");
		++markedCells;
		if(checkWin() == true) {
			gameEnd();
		} else {
			if(markedCells == 9) {																		// Check if all cells are marked but not in a winning sequence. In this case the game ends with a draw.
				document.getElementById("gameState").innerHTML = "It's a draw!";
			} else {
				if(currentPlayer.name === firstPlayer.name) {
					currentPlayer = secondPlayer;
					document.getElementById("player").innerHTML = currentPlayer.name;
				} else {
					currentPlayer = firstPlayer;
					document.getElementById("player").innerHTML = currentPlayer.name;
				}
			}
		}
	} 
}

function checkWin() {
	var currentSymbol;
	currentPlayer === firstPlayer ? currentSymbol = "X" : currentSymbol = "O";
	for(let i = 0; i <= 7; ++i) {																		// Using the coordinates from the winningCombinations array, we check if we have a winner sequence.
		if(cells[winningCombinations[i][0]].innerText == currentSymbol &&
			cells[winningCombinations[i][1]].innerText == currentSymbol &&
			cells[winningCombinations[i][2]].innerText == currentSymbol) {
				return true;
		}
	}
	return false;
}

function gameEnd() {
	document.getElementById("gameState").innerHTML = currentPlayer.name + " has won!";
	if(currentPlayer === firstPlayer) {
		firstPlayer.score += 1;
		document.getElementById("player1Score").innerHTML = firstPlayer.score;
	} else {
		secondPlayer.score +=1;
		document.getElementById("player2Score").innerHTML = secondPlayer.score;
	}
	for(let i = 0; i < cells.length; ++i) {
		cells[i].removeEventListener("click", markCell);
	}
}