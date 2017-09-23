import PropTypes from "prop-types";
import React, { Component } from "react";

const BACKGROUND_COLORS = {
  win: "rgba(78, 150, 112, 0.2)",
  lose: "rgba(217, 94, 87, 0.2)",
  draw: "rgba(136, 136, 136, 0.2)"
};

const RESULT_COLORS = {
  win: "rgba(78, 150, 112, 1)",
  lose: "rgba(217, 94, 87, 1)",
  draw: "rgba(136, 136, 136, 1)"
};

class Colors extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    result: PropTypes.oneOf(["win", "lose", "draw"])
  };

  static defaultProps = {
    result: "draw"
  };

  render () {
    const { children, result } = this.props;
    const backgroundColor = BACKGROUND_COLORS[result];
    const color = RESULT_COLORS[result];

    return children({ backgroundColor, color });
  };
}

export default Colors;