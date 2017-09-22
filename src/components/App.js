import React, { Component } from "react";
import styled from "styled-components";
import upperFirst from "lodash/upperFirst";
import last from "lodash/last";
import { getHistory, storeHistory, storeModel, getModel } from "../storage";
import RPSEngine from "../RPSEngine";
import Button from "./Button";
import History from "./History";

const ICONS = {
  rock: "hand-rock-o",
  paper: "hand-paper-o",
  scissors: "hand-scissors-o"
};

const RESULT_COLORS = {
  win: "green",
  lose: "red",
  draw: "#888"
};

const MESSAGES = {
  win: "You Win",
  lose: "You Lose",
  draw: "Tie"
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

const StyledBoard = styled.div`
  flex-grow: 1;
  flex-basis: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 40px 0;
`;

const StyledPlayedIcon = styled.i`
  font-size: 120px;
  margin-bottom: 16px;
`;

const StyledResult = styled.div``;

class App extends Component {
  state = {
    history: getHistory(),
    hasPlayed: false
  };

  componentDidMount() {
    this.engine = new RPSEngine({
      hiddenLayers: [],
      learningRate: 1,
      costFunction: "cross-entropy",
      model: getModel()
    });
  }

  handleClick = move => {
    const { aiMove, playerMove, result, model } = this.engine.play(move);
    this.setState(
      state => ({
        history: state.history.concat({ aiMove, playerMove, result }),
        hasPlayed: true
      }),
      () => {
        storeHistory(this.state.history);
        storeModel(model);
      }
    );
  };

  render() {
    const { history, hasPlayed } = this.state;
    const lastResult = last(history) || {};
    const { aiMove, result, playerMove } = lastResult;

    return (
      <StyledAppContainer>
        <History history={history.map(({ result }) => result)} />
        {hasPlayed ? (
          <StyledBoard>
            <StyledPlayedIcon className={"fa fa-" + ICONS[aiMove]} />
            <StyledResult style={{ color: RESULT_COLORS[result] }}>
              {MESSAGES[result]}
            </StyledResult>
            <StyledPlayedIcon className={"fa fa-" + ICONS[playerMove]} />
          </StyledBoard>
        ) : (
          <StyledBoard />
        )}
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
