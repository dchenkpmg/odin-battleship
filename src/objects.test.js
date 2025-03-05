import { Ship } from "./objects.js";

it("increases ship hit count", () => {
  const ship = new Ship(1);
  ship.hit();
  expect(ship.hitCount).toBe(1);
});

it("Increases");
