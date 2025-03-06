import { Gameboard } from "../game/objects.js";

export function renderRealBoard(p1) {
  console.log("Updating real board...");
  const boardDiv = document.querySelector(".real-board");

  boardDiv.textContent = "";
  const board = p1.getBoard();
  console.log(board);
  board.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      const cellButton = document.createElement("div");
      cellButton.classList.add("cell");
      cellButton.dataset.row = rowIndex;
      cellButton.dataset.col = cellIndex;
      if (cell.ship !== null) {
        cellButton.style.backgroundColor = "red";
      }
      if (cell.hit == true && cell.ship == null) {
        cellButton.textContent = "O";
      } else if (cell.hit == true && cell.ship !== null) {
        cellButton.textContent = "X";
      } else {
        cellButton.textContent = "";
      }
      boardDiv.appendChild(cellButton);
    });
  });
}

export function renderCPUBoard(p2) {
  console.log("Updating CPU board...");
  const boardDiv = document.querySelector(".cpu-board");

  boardDiv.textContent = "";
  const board = p2.getBoard();
  console.log(board);
  board.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      const cellButton = document.createElement("button");
      cellButton.classList.add("cell");
      cellButton.dataset.row = rowIndex;
      cellButton.dataset.col = cellIndex;
      if (cell.ship !== null) {
        cellButton.style.backgroundColor = "blue";
      }
      if (cell.hit == true && cell.ship == null) {
        cellButton.textContent = "O";
      } else if (cell.hit == true && cell.ship !== null) {
        cellButton.textContent = "X";
      } else {
        cellButton.textContent = "";
      }
      if (cellButton.textContent !== "") {
        cellButton.disabled = true;
      }
      boardDiv.appendChild(cellButton);
    });
  });
}

export function addHitButtonListeners(game) {
  const boardDiv = document.querySelector(".cpu-board");
  boardDiv.removeEventListener("click", handleBoardClick); // Remove existing listener
  boardDiv.addEventListener("click", (e) => handleBoardClick(e, game));
}

function handleBoardClick(e, game) {
  const selectedColumn = e.target.dataset.col;
  const selectedRow = e.target.dataset.row;
  if (!selectedColumn || !selectedRow) return;
  game.playRound(parseInt(selectedRow), parseInt(selectedColumn));
  renderRealBoard(game.p1);
  renderCPUBoard(game.p2);

  // if (game.gameOver) {
  //   alert(game.currentPlayer === game.p1 ? "CPU Player Wins!" : "You Win!");
  // }
}

export class GameController {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.currentPlayer = p1;
    this.gameOver = false;
  }

  playRound(row, col) {
    if (this.gameOver) return true;
    if (this.currentPlayer === this.p1) {
      this.p2.gameboard.receiveAttack(row, col);
      if (this.p2.gameboard.checkGameOver()) {
        this.gameOver = true;
        console.log("Real player wins!");
        return;
      }
      this.currentPlayer = this.p2;
    }

    if (this.currentPlayer === this.p2) {
      const [cpuRow, cpuCol] = this.getRandomCoordinates();
      this.p1.gameboard.receiveAttack(cpuRow, cpuCol);
      if (this.p1.gameboard.checkGameOver()) {
        this.gameOver = true;
        console.log("CPU Player Wins!");
        return;
      }
      this.currentPlayer = this.p1;
    }
  }

  getRandomCoordinates() {
    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * 10);
    return [row, col];
  }

  resetGame() {
    this.realPlayer.board = new Gameboard(10, 10);
    this.cpuPlayer.board = new Gameboard(10, 10);
    this.currentPlayer = this.realPlayer;
    this.gameOver = false;
  }
}
