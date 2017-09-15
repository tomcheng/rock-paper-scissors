import sample from "lodash/sample";

const moves = ["rock", "paper", "scissors"];

class RPSEngine {
  constructor({ onPlay }) {
    this.onPlay = onPlay;
    this.tally = {
      win: 0,
      lose: 0,
      draw: 0
    };
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

    this.updateTally(result);

    this.onPlay({ playerMove, aiMove, result });
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
