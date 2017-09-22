import RPSEngine from "./RPSEngine";
import * as strategies from "./strategies";
import { track, resetTracker, outputTracker } from "./tracker";

describe("RPS Engine", () => {
  it("Should do something", () => {
    const configs = [
      { hiddenLayers: [39], learningRate: 1, costFunction: "cross-entropy" },
      { hiddenLayers: [39], learningRate: 1, costFunction: "quadratic" },
      { hiddenLayers: [], learningRate: 1, costFunction: "cross-entropy" },
      { hiddenLayers: [], learningRate: 1, costFunction: "quadratic" },
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

      for (let i = 0; i < 100; i++) {
        lastResult = track(engine.play(strategies.otherWay(lastResult)));
      }

      outputTracker();
      resetTracker();
    });
  })
});