import { Gameboard, RealPlayer, CPUPlayer } from "object.js";
import { renderBoard } from "./render.js";

export default function testGame() {
  const p1 = new RealPlayer();
  const p2 = new CPUPlayer();

  const carrier = [0, 0, 5, "horizontal"];
  const battleShip = [2, 2, 4, "vertical"];
  const cruiser = [4, 4, 3, "horizontal"];
  const destroyer = [6, 6, 2, "vertical"];

  // prepopulate boards for now
  p1.board.placeShip(...carrier);
  p1.board.placeShip(...battleShip);
  p1.board.placeShip(...cruiser);
  p1.board.placeShip(...destroyer);

  p2.board.placeShip(...carrier);
  p2.board.placeShip(...battleShip);
  p2.board.placeShip(...cruiser);
  p2.board.placeShip(...destroyer);

  renderBoard(p1);
  renderBoard(p2);
}
