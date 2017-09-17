import sample from "lodash/sample";
import reject from "lodash/reject";

let altStrategyCounter = 0;
export const alwaysRock = () => "rock";
export const alwaysPaper = () => "paper";
export const alwaysScissors = () => "scissors";
export const alternate = lastResult => {
  if (!lastResult) return "rock";
  if (lastResult.playerMove === "rock") return "paper";
  if (lastResult.playerMove === "paper") return "scissors";
  return "rock";
};
export const otherWay = lastResult => {
  if (!lastResult) return "rock";
  if (lastResult.playerMove === "rock") return "scissors";
  if (lastResult.playerMove === "scissors") return "paper";
  return "rock";
};
export const sameUntilLose = lastResult => {
  if (!lastResult) return "rock";

  if (lastResult.result === "win") {
    return lastResult.playerMove;
  }
  return sample(
    reject(["rock", "paper", "scissors"], p => p === lastResult.playerMove)
  );
};
export const rockAndPaper = lastResult => {
  if (!lastResult || lastResult !== "paper") return "paper";
  return "rock";
};
export const paperAndScissors = lastResult => {
  if (!lastResult || lastResult !== "paper") return "paper";
  return "rock";
};
export const scissorsAndRock = lastResult => {
  if (!lastResult || lastResult !== "paper") return "paper";
  return "rock";
};
export const random = () => sample(["rock", "paper", "scissors"])

export const alternateStrategies = lastResult => {
  const strategies = [
    sameUntilLose,
    alwaysPaper,
    alternate,
    alwaysScissors,
    otherWay,
    alwaysRock,
    rockAndPaper,
    paperAndScissors,
    scissorsAndRock,
    random
  ];
  const numMoves = 5;
  const strategy =
    strategies[
      Math.floor(
        (altStrategyCounter % (strategies.length * numMoves)) / numMoves
      )
    ];
  altStrategyCounter++;
  return strategy(lastResult);
};
