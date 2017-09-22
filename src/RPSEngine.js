import flatMap from "lodash/flatMap";
import deepNeuralNetwork from "./deepNeuralNetwork";

const MEMORY = 5;

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
const timeToInputs = ms => {
  if (ms < 300) return [1, 0, 0, 0, 0, 0];
  if (ms < 600) return [0, 1, 0, 0, 0, 0];
  if (ms < 1200) return [0, 0, 1, 0, 0, 0];
  if (ms < 2400) return [0, 0, 0, 1, 0, 0];
  if (ms < 4800) return [0, 0, 0, 0, 1, 0];
  return [0, 0, 0, 0, 0, 1];
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
  const expectedValueForRock = 2 * output[2] - output[1];
  const expectedValueForPaper = 2 * output[0] - output[2];
  const expectedValueForScissors = 2 * output[1] - output[0];
  if (
    expectedValueForRock >
    Math.max(expectedValueForPaper, expectedValueForScissors)
  ) {
    return "rock";
  }
  if (
    expectedValueForPaper >
    Math.max(expectedValueForRock, expectedValueForScissors)
  ) {
    return "paper";
  }
  return "scissors";
};

class RPSEngine {
  constructor(
    params = {
      hiddenLayers: [],
      learningRate: 1,
      costFunction: "cross-entropy",
      model: null
    }
  ) {
    const { hiddenLayers, learningRate, costFunction, model } = params;
    this.recentMoves = [];
    this.dnn = new deepNeuralNetwork({
      nodeCounts: [].concat([MEMORY * 15], hiddenLayers, [3]),
      learningRate,
      costFunction,
      model
    });
    this.lastPlayTime = new Date().getTime();
  }

  play = playerMove => {
    const playTime = new Date().getTime();
    const inputs = flatMap(
      this.recentMoves,
      ({ playerMove: p, aiMove: a, result: r, time: t }) => [
        ...moveToInputs[p],
        ...moveToInputs[a],
        ...resultToInputs[r],
        ...timeToInputs(t)
      ]
    );
    const aiMove = outputToGuess(this.dnn.guess(inputs));
    const result = getResult(playerMove, aiMove);

    const { weights, biases } = this.dnn.update(moveToInputs[playerMove]);

    this.recentMoves = [
      { playerMove, aiMove, result, time: playTime - this.lastPlayTime }
    ].concat(this.recentMoves);

    if (this.recentMoves.length > MEMORY) {
      this.recentMoves.pop();
    }

    this.lastPlayTime = playTime;

    return { playerMove, aiMove, result, model: { weights, biases } };
  };
}

export default RPSEngine;
