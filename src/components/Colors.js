import PropTypes from "prop-types";
import { Component } from "react";
import Animations from "../animation";

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

  constructor(props) {
    super();
    this.state = COLORS[props.result];
  }

  componentWillReceiveProps(nextProps) {
    const { r: ri, g: gi, b: bi } = this.state;
    const { r: rf, g: gf, b: bf } = COLORS[nextProps.result];

    Animations.animate({
      name: "color",
      start: 0,
      end: 1,
      duration: 200,
      delay: 500,
      onUpdate: x => {
        this.setState({
          r: Math.round(ri + (rf - ri) * x),
          g: Math.round(gi + (gf - gi) * x),
          b: Math.round(bi + (bf - bi) * x)
        });
      },
      onComplete: () => {
        this.setState({ r: rf, g: gf, b: bf });
      }
    });
  }

  render() {
    const { children, result } = this.props;
    const { r, g, b } = this.state;
    const { r: rf, g: gf, b: bf } = COLORS[result];
    const backgroundColor = `rgba(${r},${g},${b},0.2)`;
    const color = `rgba(${rf},${gf},${bf},1)`;

    return children({ backgroundColor, color });
  }
}

export default Colors;
