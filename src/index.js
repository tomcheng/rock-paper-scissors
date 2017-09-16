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

window.addEventListener("keydown", evt => {
  switch (evt.keyCode) {
    case 49:
      engine.play("rock");
      break;
    case 50:
      engine.play("paper");
      break;
    case 51:
      engine.play("scissors");
      break;
    default:
      break;
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
