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
export const alternateStrategies = lastResult => {
  const strategies = [sameUntilLose, alwaysPaper, alternate, alwaysScissors, otherWay, alwaysRock];
  const numMoves = 5;
  const strategy = strategies[Math.floor((altStrategyCounter % (strategies.length * numMoves)) / numMoves)];
  altStrategyCounter++;
  return strategy(lastResult);
};
