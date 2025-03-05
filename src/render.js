export function renderBoard(player) {
  if (player.type == "real") {
    const boardDiv = document.querySelector(".real-board");
  } else {
    const boardDiv = document.querySelector(".cpu-board");
  }
  const board = player.board;
  board.forEach((row, rowIndex) => {
    board.forEach((cell, cellIndex) => {
      const cellButton = document.createElement("button");
      cellButton.classList.add("cell");
      cellButton.dataset.row = rowIndex;
      cellButton.dataset.col = colIndex;
      if (cell.hit == true) {
        
      }
    });
  });
}
