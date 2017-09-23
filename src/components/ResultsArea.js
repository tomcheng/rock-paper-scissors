import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";
import Icon from "./Icon";

const MESSAGES = {
  win: "You Win",
  lose: "You Lose",
  draw: "Draw"
};

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

const StyledPlayedIcon = styled(Icon)`
  font-size: 120px;
  margin-bottom: 16px;
`;

class ResultsArea extends Component {
  static propTypes = {
    showResults: PropTypes.bool.isRequired,
    resultColor: PropTypes.string.isRequired,
    aiMove: PropTypes.oneOf(["rock", "paper", "scissors"]),
    playerMove: PropTypes.oneOf(["rock", "paper", "scissors"]),
    result: PropTypes.oneOf(["win", "lose", "draw"])
  };
  render() {
    const { showResults, aiMove, playerMove, result, resultColor } = this.props;
    return showResults ? (
      <StyledBoard>
        <StyledPlayedIcon move={aiMove} flip />
        <StyledResult style={{ backgroundColor: resultColor }}>
          {MESSAGES[result]}
        </StyledResult>
        <StyledPlayedIcon move={playerMove} />
      </StyledBoard>
    ) : (
      <StyledBoard />
    );
  }
}

export default ResultsArea;
