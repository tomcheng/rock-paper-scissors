import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import RPSEngine from "./RPSEngine";

const RESULT_COLORS = {
  win: "green",
  lose: "red",
  draw: "lightgrey"
};

const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorsButton = document.getElementById("scissors");

const engine = new RPSEngine({
  onPlay: ({ result }) => {
    console.log("%c " + result, "color: " + RESULT_COLORS[result]);
  }
});

rockButton.addEventListener("click", () => {
  engine.play("rock");
});

paperButton.addEventListener("click", () => {
  engine.play("paper");
});

scissorsButton.addEventListener("click", () => {
  engine.play("scissors");
});

registerServiceWorker();
