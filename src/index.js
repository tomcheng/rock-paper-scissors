import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import RPSEngine from "./RPSEngine";

const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorsButton = document.getElementById("scissors");
const engine = new RPSEngine({
  onPlay: ({ playerMove, aiMove, result }) => {
    console.log("playerMove:", playerMove);
    console.log("aiMove:", aiMove);
    console.log("result:", result);
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
