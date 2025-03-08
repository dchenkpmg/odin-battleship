import { Ship, Gameboard, Player } from "./objects.js";

describe("Ship", () => {
  it("should initialize with the correct length and default values", () => {
    const ship = new Ship(3);
    expect(ship.length).toBe(3);
    expect(ship.hitCount).toBe(0);
    expect(ship.sunk).toBe(false);
  });

  it("should increment hitCount when hit is called", () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.hitCount).toBe(1);
  });

  it("should set sunk to true when hitCount equals length", () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();
    ship.isSunk();
    expect(ship.sunk).toBe(true);
  });

  it("should not set sunk to true if hitCount is less than length", () => {
    const ship = new Ship(3);
    ship.hit();
    ship.isSunk();
    expect(ship.sunk).toBe(false);
  });
});

describe("Gameboard", () => {
  it("should initialize with the correct dimensions and default values", () => {
    const gameboard = new Gameboard(10, 10);
    expect(gameboard.rows).toBe(10);
    expect(gameboard.cols).toBe(10);
    expect(gameboard.shipCount).toBe(0);
    expect(gameboard.sunkShips.size).toBe(0);
    expect(gameboard.missedAttacks).toBe(0);
    expect(gameboard.board.length).toBe(10);
    expect(gameboard.board[0].length).toBe(10);
  });

  it("should place a ship correctly if the position is valid", () => {
    const gameboard = new Gameboard(10, 10);
    const ship = new Ship(3);
    const result = gameboard.placeShip(0, 0, ship, "horizontal");
    expect(result).toBe(true);
    expect(gameboard.board[0][0].ship).toBe(ship);
    expect(gameboard.board[0][1].ship).toBe(ship);
    expect(gameboard.board[0][2].ship).toBe(ship);
    expect(gameboard.shipCount).toBe(1);
  });

  it("should not place a ship if the position is invalid", () => {
    const gameboard = new Gameboard(10, 10);
    const ship = new Ship(3);
    const result = gameboard.placeShip(0, 8, ship, "horizontal");
    expect(result).toBe(false);
    expect(gameboard.shipCount).toBe(0);
  });

  it("should correctly handle a received attack on a ship", () => {
    const gameboard = new Gameboard(10, 10);
    const ship = new Ship(3);
    gameboard.placeShip(0, 0, ship, "horizontal");
    const result = gameboard.receiveAttack(0, 0);
    expect(result).toBe(true);
    expect(gameboard.board[0][0].hit).toBe(true);
    expect(ship.hitCount).toBe(1);
  });

  it("should correctly handle a missed attack", () => {
    const gameboard = new Gameboard(10, 10);
    const result = gameboard.receiveAttack(0, 0);
    expect(result).toBe(true);
    expect(gameboard.board[0][0].hit).toBe(true);
    expect(gameboard.missedAttacks).toBe(1);
  });

  it("should return false if the cell has already been hit", () => {
    const gameboard = new Gameboard(10, 10);
    gameboard.receiveAttack(0, 0);
    const result = gameboard.receiveAttack(0, 0);
    expect(result).toBe(false);
  });

  it("should correctly identify when all ships are sunk", () => {
    const gameboard = new Gameboard(10, 10);
    const ship1 = new Ship(1);
    const ship2 = new Ship(1);
    gameboard.placeShip(0, 0, ship1, "horizontal");
    gameboard.placeShip(1, 0, ship2, "horizontal");
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(1, 0);
    expect(gameboard.checkGameOver()).toBe(true);
  });

  it("should not identify game over if not all ships are sunk", () => {
    const gameboard = new Gameboard(10, 10);
    const ship1 = new Ship(1);
    const ship2 = new Ship(1);
    gameboard.placeShip(0, 0, ship1, "horizontal");
    gameboard.placeShip(1, 0, ship2, "horizontal");
    gameboard.receiveAttack(0, 0);
    expect(gameboard.checkGameOver()).toBe(false);
  });
});

describe("Player", () => {
  it("should place a ship on the gameboard", () => {
    const player = new Player();
    const ship = new Ship(3);
    const result = player.placeShip(0, 0, ship, "horizontal");
    expect(result).toBe(true);
    expect(player.getBoard()[0][0].ship).toBe(ship);
  });
});
