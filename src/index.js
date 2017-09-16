import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import RPSEngine from "./RPSEngine";

const RESULT_COLORS = {
  win: "green",
  lose: "red",
  draw: "lightgrey"
};
const log = ({ result }) => {
  console.log("%c " + result, "color: " + RESULT_COLORS[result]);
};

const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorsButton = document.getElementById("scissors");

const engine = new RPSEngine();

window.addEventListener("keydown", evt => {
  switch (evt.keyCode) {
    case 49:
      log(engine.play("rock"));
      break;
    case 50:
      log(engine.play("paper"));
      break;
    case 51:
      log(engine.play("scissors"));
      break;
    default:
      break;
  }
});

rockButton.addEventListener("click", () => {
  log(engine.play("rock"));
});

paperButton.addEventListener("click", () => {
  log(engine.play("paper"));
});

scissorsButton.addEventListener("click", () => {
  log(engine.play("scissors"));
});

registerServiceWorker();
