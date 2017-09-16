let tally = {
  win: 0,
  lose: 0,
  draw: 0
};

const tracker = ({ result }) => {
  tally = {
    ...tally,
    [result]: tally[result] + 1
  };

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



export default tracker;