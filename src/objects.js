export class Ship {
  constructor(length) {
    this.length = length;
    this.hitCount = 0;
    this.sunk = false;
  }
  hit() {
    this.hitCount += 1;
  }
  isSunk() {
    if (this.hitCount == this.length) {
      this.sunk = true;
    }
  }
}

class Cell {
  constructor() {
    this.hit = false;
    this.ship = null;
  }
}

export class Gameboard {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.shipCount = 0;
    this.sunkShips = new Set();
    this.missedAttacks = 0;
    this.board = this.constructBoard(rows, cols);
  }

  constructBoard(rows, cols) {
    const board = [];
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < cols; j++) {
        board[i][j] = new Cell();
      }
    }
    return board;
  }

  placeShip(r, c, ship, orientation) {
    if (!this.validPosition(r, c, ship.length, orientation)) {
      return null;
    }
    if (orientation == "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        this.board[r][c + i].ship = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        this.board[r + i][c].ship = ship;
      }
    }
    this.shipCount += 1;
  }

  validPosition(r, c, length, orientation) {
    if (orientation == "vertical") {
      if (r < 0 || r + length >= this.rows || c < 0 || c >= this.cols) {
        return false;
      }
      for (let i = 0; i < length; i++) {
        if (this.board[r + i][c].ship != null) {
          return false;
        }
      }
    } else if (orientation == "horizontal") {
      if (r < 0 || r >= this.rows || c < 0 || c + length >= this.cols) {
        return false;
      }
      for (let i = 0; i < length; i++) {
        if (this.board[r][c + i].ship != null) {
          return false;
        }
      }
    }
    return true;
  }

  receiveAttack(r, c) {
    if (this.board[r][c].ship != null) {
      this.board[r][c].hit = true;
      this.board[r][c].ship.hit();
      this.board[r][c].ship.isSunk();
    } else {
      this.missedAttacks += 1;
    }
  }

  checkGameOver() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (
          this.board[r][c].ship != null &&
          this.board[r][c].ship.sunk == true
        ) {
          this.sunkShips.add(this.board[r][c].ship);
          if (this.sunkShips.size == this.shipCount) {
            return true;
          }
        }
      }
    }
    return false;
  }
}

class Player {
  constructor() {
    this.board = new Gameboard(10, 10);
  }
}

export class RealPlayer extends Player {
  constructor() {
    super();
    this.type = "real";
  }
  placeShip(r, c, length, orientation) {
    this.board.placeShip(r, c, length, orientation);
  }
}

export class CPUPlayer extends Player {
  constructor() {
    super();
    this.type = "cpu";
  }
  placeShip(r, c, length, orientation) {
    // to change to random head row/col, valid length and orientation
    // something like this.board.placeShip(r, c, length, orientation);
    this.board.placeShip(r, c, length, orientation);
  }
}
