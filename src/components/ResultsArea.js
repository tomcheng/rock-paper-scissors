import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";
import Icon from "./Icon";
import Animations, { cubicOut } from "../animation";

const MESSAGES = {
  win: "You Win",
  lose: "You Lose",
  draw: "Draw"
};
const ANIMATION_OFFSET = 30;

const StyledBoard = styled.div`
  flex-grow: 1;
  flex-basis: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 20px 0;
`;

const StyledResult = styled.div`
  color: #fff;
  padding: 5px 7px 4px;
  border-radius: 2px;
`;

const StyledPlayedIcon = styled(Icon)`font-size: 120px;`;

class ResultsArea extends Component {
  static propTypes = {
    showResults: PropTypes.bool.isRequired,
    resultColor: PropTypes.string.isRequired,
    resultIndex: PropTypes.number.isRequired,
    aiMove: PropTypes.oneOf(["rock", "paper", "scissors"]),
    playerMove: PropTypes.oneOf(["rock", "paper", "scissors"]),
    result: PropTypes.oneOf(["win", "lose", "draw"])
  };

  state = {
    iconOpacity: 0,
    iconOffset: ANIMATION_OFFSET,
    resultOpacity: 0
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.resultIndex !== nextProps.resultIndex) {
      this.setState({ iconOpacity: 0, iconOffset: ANIMATION_OFFSET, resultOpacity: 0 });
      Animations.animate({
        name: "icons",
        start: 0,
        end: 1,
        easing: cubicOut,
        duration: 600,
        onUpdate: x => {
          this.setState({ iconOpacity: x, iconOffset: ANIMATION_OFFSET * (1 - x) });
        },
        onComplete: () => {
          this.setState({ iconOpacity: 1, iconOffset: 0, resultOpacity: 1 });
        }
      });
    }
  }

  render() {
    const { showResults, aiMove, playerMove, result, resultColor } = this.props;
    const { iconOpacity, iconOffset, resultOpacity } = this.state;
    return showResults ? (
      <StyledBoard>
        <div
          style={{ opacity: iconOpacity, transform: `translate3d(0,-${iconOffset}px,0)` }}
        >
          <StyledPlayedIcon move={aiMove} flip />
        </div>
        <StyledResult style={{ backgroundColor: resultColor, opacity: resultOpacity }}>
          {MESSAGES[result]}
        </StyledResult>
        <div
          style={{ opacity: iconOpacity, transform: `translate3d(0,${iconOffset}px,0)` }}
        >
          <StyledPlayedIcon move={playerMove} />
        </div>
      </StyledBoard>
    ) : (
      <StyledBoard>
        Choose Rock, Paper or Scissors
      </StyledBoard>
    );
  }
}

export default ResultsArea;
