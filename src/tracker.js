const defaultTally = {
  win: 0,
  lose: 0,
  draw: 0
};
let tally = defaultTally;

export const track = params => {
  const { result } = params;

  tally = {
    ...tally,
    [result]: tally[result] + 1
  };

  return params;
};

export const outputTracker = () => {
  const total = tally.win + tally.lose + tally.draw;
  console.log(
    "win:",
    Math.round(tally.win / total * 100) + "%",
    "lose:",
    Math.round(tally.lose / total * 100) + "%",
    "draw:",
    Math.round(tally.draw / total * 100) + "%",
    "total:",
    total
  );
};

export const resetTracker = () => {
  tally = defaultTally;
};
