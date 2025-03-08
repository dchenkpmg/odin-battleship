import { Player, Gameboard } from "../game/objects.js";
import { randomisePlacements } from "./render.js";
import { prepareGame } from "./prepareGame.js";
import {
  GameController,
  renderRealBoard,
  renderCPUBoard,
  addHitButtonListeners,
} from "./render.js";

export function startGame() {
  const p1 = prepareGame();
  const p2 = new Player();

  randomisePlacements(p2);

  const game = new GameController(p1, p2);

  renderRealBoard(p1);
  renderCPUBoard(p2);
  addHitButtonListeners(game); // Add listeners once
  addReplayListener(p1, p2);
}

function addReplayListener(p1, p2) {
  const replayBtn = document.querySelector(".replay-btn");
  const startBtn = document.querySelector(".start-btn");
  const randomBtn = document.querySelector(".random-btn");
  const cpuBoard = document.querySelector(".cpu-board");
  const statusMsg = document.querySelector(".status-msg");

  replayBtn.addEventListener("click", () => {
    replayBtn.style.display = "none";
    startBtn.style.display = "block";
    randomBtn.style.display = "block";
    cpuBoard.style.display = "none";
    statusMsg.textContent = "Battleship";
    p1.gameboard = new Gameboard(10, 10);
    p2.gameboard = new Gameboard(10, 10);
    randomisePlacements(p1);
    randomisePlacements(p2);
    renderRealBoard(p1);
    renderCPUBoard(p2);
  });
}
