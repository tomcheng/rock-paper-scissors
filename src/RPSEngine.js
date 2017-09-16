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
  constructor({ onPlay }) {
    this.onPlay = onPlay;
    this.tally = {
      win: 0,
      lose: 0,
      draw: 0
    };
    this.recentMoves = [];
    this.dnn = new deepNeuralNetwork({ nodeCount: [42, 22, 3] });
  }

  play = playerMove => {
    console.log("this.recentMoves:", this.recentMoves);
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

    this.updateTally(result);

    this.onPlay({ playerMove, aiMove, result });
  };

  updateTraining = ({ playerMove, aiMove }) => {
    this.dnn.update(moveToInputs[playerMove]);

    this.recentMoves = [{ playerMove, aiMove }].concat(this.recentMoves);

    if (this.recentMoves.length > 7) {
      this.recentMoves.pop();
    }
  };

  updateTally = result => {
    this.tally = {
      ...this.tally,
      [result]: this.tally[result] + 1
    };

    const total = this.tally.win + this.tally.lose + this.tally.draw;

    console.log(
      "win:",
      Math.round(this.tally.win / total * 100) + "%",
      "lose:",
      Math.round(this.tally.lose / total * 100) + "%",
      "draw:",
      Math.round(this.tally.draw / total * 100) + "%",
      "total:",
      total
    );
  };
}

export default RPSEngine;
