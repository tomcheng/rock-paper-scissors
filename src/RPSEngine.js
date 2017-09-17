import flatMap from "lodash/flatMap";
import deepNeuralNetwork from "./deepNeuralNetwork";

const MEMORY = 7;

const moveToInputs = {
  rock: [1, 0, 0],
  paper: [0, 1, 0],
  scissors: [0, 0, 1]
};
const resultToInputs = {
  win: [1, 0, 0],
  lose: [0, 1, 0],
  draw: [0, 0, 1]
};
const getResult = (p, a) => {
  if (p === a) {
    return "draw";
  }
  if (
    (p === "rock" && a === "scissors") ||
    (p === "scissors" && a === "paper") ||
    (p === "paper" && a === "rock")
  ) {
    return "win";
  }
  return "lose";
};
const outputToGuess = output => {
  if (output[1] > Math.max(output[0], output[2])) {
    return "scissors";
  }
  if (output[2] > Math.max(output[0], output[1])) {
    return "rock";
  }
  return "paper";
};

class RPSEngine {
  constructor(params = { numLayers: 3, learningRate: 1 }) {
    const { numLayers, learningRate } = params;
    this.recentMoves = [];
    this.dnn = new deepNeuralNetwork({
      nodeCounts: numLayers === 2 ? [MEMORY * 9, 3] : [MEMORY * 9, 33, 3],
      learningRate
    });
  }

  play = playerMove => {
    const inputs = flatMap(this.recentMoves, ({ playerMove: p, aiMove: a, result: r }) => [
      ...moveToInputs[p],
      ...moveToInputs[a],
      ...resultToInputs[r]
    ]);
    const aiMove = outputToGuess(this.dnn.guess(inputs));
    const result = getResult(playerMove, aiMove);

    this.dnn.update(moveToInputs[playerMove]);

    this.recentMoves = [{ playerMove, aiMove, result }].concat(this.recentMoves);
    if (this.recentMoves.length > MEMORY) {
      this.recentMoves.pop();
    }

    return { playerMove, aiMove, result };
  };
}

export default RPSEngine;
