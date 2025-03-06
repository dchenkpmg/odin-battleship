import { RealPlayer, CPUPlayer, Ship } from "../game/objects.js";
import { randomisePlacements } from "./render.js";
import {
  GameController,
  renderRealBoard,
  renderCPUBoard,
  addHitButtonListeners,
} from "./render.js";

export function startGame() {
  const p1 = new RealPlayer();
  const p2 = new CPUPlayer();

  const p1carrier = [0, 0, new Ship(5), "horizontal"];
  const p1battleShip = [2, 2, new Ship(4), "vertical"];
  const p1cruiser = [4, 4, new Ship(3), "horizontal"];
  const p1destroyer = [6, 6, new Ship(2), "vertical"];

  // const p2carrier = [0, 0, new Ship(5), "horizontal"];
  // const p2battleShip = [2, 2, new Ship(4), "vertical"];
  // const p2cruiser = [4, 4, new Ship(3), "horizontal"];
  // const p2destroyer = [6, 6, new Ship(2), "vertical"];

  // prepopulate boards for now
  p1.placeShip(...p1carrier);
  p1.placeShip(...p1battleShip);
  p1.placeShip(...p1cruiser);
  p1.placeShip(...p1destroyer);

  randomisePlacements(p2);

  // p2.placeShip(...p2carrier);
  // p2.placeShip(...p2battleShip);
  // p2.placeShip(...p2cruiser);
  // p2.placeShip(...p2destroyer);
  // randomisePlacements(p2);

  const game = new GameController(p1, p2);

  renderRealBoard(p1);
  renderCPUBoard(p2);
  addHitButtonListeners(game); // Add listeners once
}
