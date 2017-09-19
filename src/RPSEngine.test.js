import RPSEngine from "./RPSEngine";
import * as strategies from "./strategies";
import { track, resetTracker, outputTracker } from "./tracker";

describe("RPS Engine", () => {
  it("Should do something", () => {
    const configs = [
      { hiddenLayers: [], learningRate: 1 },
    ];

    configs.forEach(config => {
      console.log(config);
      const engine = new RPSEngine(config);

      let lastResult;

      for (let i = 0; i < 10000; i++) {
        lastResult = track(engine.play(strategies.alternateStrategies(lastResult)));
      }

      outputTracker();
      resetTracker();
    });
  })
});