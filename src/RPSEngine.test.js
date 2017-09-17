import RPSEngine from "./RPSEngine";
import * as strategies from "./strategies";
import { track, resetTracker, outputTracker } from "./tracker";

describe("RPS Engine", () => {
  it("Should do something", () => {
    const configs = [
      // { numLayers: 2, learningRate: 0.1 },
      // { numLayers: 2, learningRate: 0.5 },
      { numLayers: 2, learningRate: 1 },
      // { numLayers: 3, learningRate: 0.1 },
      // { numLayers: 3, learningRate: 0.5 },
      // { numLayers: 3, learningRate: 1 },
    ];

    configs.forEach(config => {
      console.log(config);
      const engine = new RPSEngine(config);

      let lastResult;

      for (let i = 0; i < 1000; i++) {
        lastResult = track(engine.play(strategies.alternateStrategies(lastResult)));
      }
      outputTracker();
      resetTracker();
      for (let i = 0; i < 1000; i++) {
        lastResult = track(engine.play(strategies.alternateStrategies(lastResult)));
      }
      outputTracker();
      resetTracker();
    });
  })
});