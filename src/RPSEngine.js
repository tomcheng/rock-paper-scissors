import sample from "lodash/sample";

const moves = ["rock", "paper", "scissors"];

class RPSEngine {
  constructor({ onPlay }) {
    this._onPlay = onPlay;
  }

  play = playerMove => {
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

    this._onPlay({ playerMove, aiMove, result });
  };
}

export default RPSEngine;
