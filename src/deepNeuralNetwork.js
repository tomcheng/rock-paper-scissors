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
  constructor({ nodeCount }) {
    this.numInputNodes = nodeCount[0];
    this.weights = [];
    this.biases = [];
    for (let i = 1; i < nodeCount.length; i++) {
      const rows = nodeCount[i];
      const cols = nodeCount[i - 1];
      this.weights.push(times(rows, constant(times(cols, constant(0)))));
      this.biases.push(times(rows, constant(0)));
    }
    console.log("this.weights:", this.weights);
    console.log("this.biases:", this.biases);
  }

  guess = input => {
    const filledInput = input.concat(
      times(this.numInputNodes - input.length, constant(0))
    );
    this.zs = [];
    this.as = [];
    for (let i = 0; i < this.weights.length; i++) {
      const W = this.weights[i];
      const inputCol = i === 0 ? filledInput : this.as[i - 1];
      const z = matrixMultiply(W, inputCol);
      const a = z.map(sigmoid);
      console.log("a:", a);
      this.zs.push(z);
      this.as.push(a);
    }

    return last(this.as);
  };

  update = result => {
    const output = last(this.as);
    const outputZ = last(this.zs);
    const cost =
      0.5 *
      result.reduce((a, v, i) => a + (v - output[i]) * (v - output[i]), 0);
    const outputErrors = output.map(
      (g, i) => (g - result[i]) * sigmoidPrime(outputZ[i])
    );
    this.errors = [];
    this.errors[this.weights.length - 1] = outputErrors;

    for (let i = this.weights.length - 1; i > 0; i--) {
      const nextLayerErrors = last(this.errors);
      const Wt = transpose(this.weights[i]);
      const z = this.zs[i - 1];

      this.errors[i - 1] = elementWiseMultiply(
        matrixMultiply(Wt, nextLayerErrors),
        z.map(sigmoidPrime)
      );
    }

    console.log("this.errors:", this.errors);
    console.log("cost:", cost);
  };
}

export default deepNeuralNetwork;
