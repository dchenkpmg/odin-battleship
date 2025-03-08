import { Gameboard, RealPlayer } from "../game/objects.js";
import { randomisePlacements, renderRealBoard } from "./render.js";

export function prepareGame() {
  const p1 = new RealPlayer();
  randomisePlacements(p1);
  renderRealBoard(p1);
  addRandomiserEventListener(p1);
  addPlayListener();
  return p1;
}

function addRandomiserEventListener(p1) {
  const playerBoard = document.querySelector(".real-board");
  const randomBtn = document.querySelector(".random-btn");
  randomBtn.addEventListener("click", () => {
    playerBoard.textContent = "";
    p1.gameboard = new Gameboard(10, 10);
    randomisePlacements(p1);
    renderRealBoard(p1);
  });
}

function addPlayListener() {
  const startGame = document.querySelector(".start-btn");
  const cpuBoard = document.querySelector(".cpu-board");
  const randomBtn = document.querySelector(".random-btn");
  startGame.addEventListener("click", () => {
    cpuBoard.style.display = "grid";
    randomBtn.style.display = "none";
    startGame.style.display = "none";
  });
}
