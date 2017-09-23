import PropTypes from "prop-types";
import { Component } from "react";

const COLORS = {
  win: { r: 78, g: 150, b: 112 },
  lose: { r: 217, g: 94, b: 87 },
  draw: { r: 136, g: 136, b: 136 }
};

class Colors extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    result: PropTypes.oneOf(["win", "lose", "draw"])
  };

  static defaultProps = {
    result: "draw"
  };

  render() {
    const { children, result } = this.props;
    const c = COLORS[result];
    const backgroundColor = `rgba(${c.r},${c.g},${c.b},0.2)`;
    const color = `rgba(${c.r},${c.g},${c.b},1)`;

    return children({ backgroundColor, color });
  }
}

export default Colors;
