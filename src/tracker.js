let tally = {
  win: 0,
  lose: 0,
  draw: 0
};

const tracker = (params, opts) => {
  const { result } = params;
  tally = {
    ...tally,
    [result]: tally[result] + 1
  };

  if (!opts || !opts.suppress) {
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
  }

  return params;
};



export default tracker;