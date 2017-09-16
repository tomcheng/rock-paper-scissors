import times from "lodash/times";
import constant from "lodash/constant";
import last from "lodash/last";

const sigmoid = x => 1 / (1 + Math.pow(Math.E, -x));
const sigmoidPrime = x => Math.exp(-x) / Math.pow(1 + Math.exp(-x), 2);
const transpose = m => m[0].map((col, i) => m.map(r => r[i]));
const matrixMultiply = (m, c) =>
  m.map(r => r.reduce((a, v, j) => a + v * c[j], 0));
const elementWiseMultiply = (c1, c2) => c1.map((v, i) => v * c2[i]);

class deepNeuralNetwork {
  constructor({ nodeCounts, learningRate }) {
    this.learningRate = learningRate || 1;
    this.numInputNodes = nodeCounts[0];
    this.numLayers = nodeCounts.length;
    this.weights = [null];
    this.biases = [null];
    for (let i = 1; i < nodeCounts.length; i++) {
      const rows = nodeCounts[i];
      const cols = nodeCounts[i - 1];
      this.weights[i] = times(rows, constant(times(cols, constant(0))));
      this.biases[i] = times(rows, constant(0));
    }
  }

  guess = rawInput => {
    const input = rawInput.concat(
      times(this.numInputNodes - rawInput.length, constant(0))
    );
    this.zs = [null];
    this.as = [input];
    for (let i = 1; i < this.numLayers; i++) {
      const W = this.weights[i];
      const inputCol = this.as[i - 1];
      const z = matrixMultiply(W, inputCol).map(
        (v, j) => v + this.biases[i][j]
      );
      const a = z.map(sigmoid);
      this.zs[i] = z;
      this.as[i] = a;
    }

    return last(this.as);
  };

  update = result => {
    this.errors = [null];

    const output = last(this.as);
    const outputZ = last(this.zs);
    this.errors[this.numLayers - 1] = output.map(
      (g, i) => (g - result[i]) * sigmoidPrime(outputZ[i])
    );

    for (let l = this.numLayers - 2; l > 0; l--) {
      this.errors[l] = elementWiseMultiply(
        matrixMultiply(transpose(this.weights[l + 1]), this.errors[l + 1]),
        this.zs[l].map(sigmoidPrime)
      );
    }

    for (let l = 1; l < this.numLayers; l++) {
      this.biases[l] = this.biases[l].map(
        (b, j) => b - this.learningRate * this.errors[l][j]
      );
      for (let j = 0; j < this.weights[l].length; j++) {
        this.weights[l][j] = this.weights[l][j].map(
          (w, k) => w - this.learningRate * this.as[l - 1][k] * this.errors[l][j]
        );
      }
    }
  };
}

export default deepNeuralNetwork;
