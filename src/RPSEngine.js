import sample from "lodash/sample";
import flatMap from "lodash/flatMap";
import deepNeuralNetwork from "./deepNeuralNetwork";

const moves = ["rock", "paper", "scissors"];
const moveToInputs = {
  rock: [1, 0, 0],
  paper: [0, 1, 0],
  scissors: [0, 0, 1]
};

class RPSEngine {
  constructor() {
    this.recentMoves = [];
    this.dnn = new deepNeuralNetwork({ nodeCounts: [42, 3], learningRate: 1 });
  }

  play = playerMove => {
    const inputs = flatMap(this.recentMoves, ({ playerMove: p, aiMove: a }) => [
      ...moveToInputs[p],
      ...moveToInputs[a]
    ]);
    const guess = this.dnn.guess(inputs);
    console.log("guess:", guess);

    const aiMove = sample(moves);
    let result = "";

    if (playerMove === aiMove) {
      result = "draw";
    } else if (
      (playerMove === "rock" && aiMove === "scissors") ||
      (playerMove === "scissors" && aiMove === "paper") ||
      (playerMove === "paper" && aiMove === "rock")
    ) {
      result = "win";
    } else {
      result = "lose";
    }

    this.updateTraining({ playerMove, aiMove });

    return { playerMove, aiMove, result };
  };

  updateTraining = ({ playerMove, aiMove }) => {
    this.dnn.update(moveToInputs[playerMove]);

    this.recentMoves = [{ playerMove, aiMove }].concat(this.recentMoves);

    if (this.recentMoves.length > 7) {
      this.recentMoves.pop();
    }
  };
}

export default RPSEngine;
