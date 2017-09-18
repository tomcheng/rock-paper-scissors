import "font-awesome/css/font-awesome.min.css";
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
const aiMoveEl = document.getElementById("ai-move");

const update = ({ result, playerMove, aiMove }) => {
  aiMoveEl.dataset.move = aiMove;
  aiMoveEl.dataset.result = result;
  console.log("%c " + result, "color: " + RESULT_COLORS[result]);
};


const engine = new RPSEngine();

const play = move => {
  update(engine.play(move));
};

window.addEventListener("keydown", evt => {
  switch (evt.keyCode) {
    case 49:
      play("rock");
      break;
    case 50:
      play("paper");
      break;
    case 51:
      play("scissors");
      break;
    default:
      break;
  }
});

rockButton.addEventListener("click", () => { play("rock"); });
paperButton.addEventListener("click", () => { play("paper"); });
scissorsButton.addEventListener("click", () => { play("scissors"); });

registerServiceWorker();
