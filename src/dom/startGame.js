import { RealPlayer, CPUPlayer, Ship } from "../game/objects.js";
import {
  GameController,
  renderRealBoard,
  renderCPUBoard,
  addHitButtonListeners,
} from "./render.js";

export function startGame() {
  const p1 = new RealPlayer();
  const p2 = new CPUPlayer();

  const carrier = [0, 0, new Ship(5), "horizontal"];
  const battleShip = [2, 2, new Ship(4), "vertical"];
  const cruiser = [4, 4, new Ship(3), "horizontal"];
  const destroyer = [6, 6, new Ship(2), "vertical"];

  // prepopulate boards for now
  p1.placeShip(...carrier);
  p1.placeShip(...battleShip);
  p1.placeShip(...cruiser);
  p1.placeShip(...destroyer);

  p2.placeShip(...carrier);
  p2.placeShip(...battleShip);
  p2.placeShip(...cruiser);
  p2.placeShip(...destroyer);

  const game = new GameController(p1, p2);

  renderRealBoard(p1);
  renderCPUBoard(p2);
  addHitButtonListeners(game); // Add listeners once
}
