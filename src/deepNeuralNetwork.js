import times from "lodash/times";
import constant from "lodash/constant";

const sigmoid = x => 1 / (1 + Math.pow(Math.E, -x));

class deepNeuralNetwork {
  constructor({ nodeCount }) {
    this.numInputNodes = nodeCount[0];
    this.weights = [];
    this.biases = [];
    for (let i = 1; i < nodeCount.length; i++) {
      const rows = nodeCount[i];
      const cols = nodeCount[i - 1];
      this.weights.push(
        times(rows, constant(times(cols, constant(0))))
      );
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
      const z = W.map(r => r.reduce((a, w, j) => a + w * inputCol[j], 0));
      const a = z.map(sigmoid);
      console.log("a:", a);
      this.zs.push(z);
      this.as.push(z.map(sigmoid));
    }
    return [1, 0, 0];
  };
}

export default deepNeuralNetwork;
