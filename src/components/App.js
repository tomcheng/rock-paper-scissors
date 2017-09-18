import React, { Component } from "react";
import styled from "styled-components";
import upperFirst from "lodash/upperFirst";
import Button from "./Button";
import RPSEngine from "../RPSEngine";

const ICONS = {
  rock: "hand-rock-o",
  paper: "hand-paper-o",
  scissors: "hand-scissors-o"
};
const RESULT_COLORS = {
  win: "green",
  lose: "red",
  draw: "lightgrey"
};

const StyledAppContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledButtons = styled.div`
  height: 100px;
  display: flex;
  padding: 0 20px 20px;
`;

const StyledResult = styled.div`
  flex-grow: 1;
  flex-basis: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledAiIcon = styled.i`
  font-size: 120px;
  margin-bottom: 16px;
`;

class App extends Component {
  state = {
    result: null,
    aiMove: null,
    playerMove: null
  };

  componentDidMount() {
    this.engine = new RPSEngine();
  }

  handleClick = move => {
    this.setState(this.engine.play(move));
  };

  render() {
    const { result, aiMove, playerMove } = this.state;
    return (
      <StyledAppContainer>
        <StyledResult>
          {aiMove && <StyledAiIcon className={"fa fa-" + ICONS[aiMove]} />}
          <div style={{ color: RESULT_COLORS[result] }}>{result}</div>
        </StyledResult>
        <StyledButtons>
          {["rock", "paper", "scissors"].map(move => (
            <Button
              key={move}
              icon={ICONS[move]}
              label={upperFirst(move)}
              onClick={() => this.handleClick(move)}
              active={playerMove === move}
            />
          ))}
        </StyledButtons>
      </StyledAppContainer>
    );
  }
}

export default App;
