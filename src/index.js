import "./styles.css";
import { startGame } from "./dom/startGame.js";
import { prepareGame } from "./dom/prepareGame.js";

const p1 = prepareGame();
startGame(p1);
