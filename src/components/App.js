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
  scissors: "hand-scissors-o fa-rotate-90"
};

const AI_ICONS = {
  rock: "hand-rock-o fa-rotate-180",
  paper: "hand-paper-o fa-rotate-180",
  scissors: "hand-scissors-o fa-rotate-270"
};

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

const MESSAGES = {
  win: "You Win",
  lose: "You Lose",
  draw: "Draw"
};

const StyledAppContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledButtons = styled.div`
  height: 100px;
  display: flex;
`;

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

const StyledPlayedIcon = styled.i`
  font-size: 120px;
  margin-bottom: 16px;
`;

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

  handleClickHistory = () => {
    this.setState(
      state => ({
        history: [],
        hasPlayed: false
      }),
      () => {
        storeHistory(this.state.history);
      }
    );
  };

  render() {
    const { history, hasPlayed } = this.state;
    const lastResult = last(history) || {};
    const { aiMove, playerMove } = lastResult;
    const result = hasPlayed && lastResult ? lastResult.result : "draw";

    return (
      <StyledAppContainer style={{ backgroundColor: BACKGROUND_COLORS[result] }}>
        <History
          history={history.map(({ result }) => result)}
          onClick={this.handleClickHistory}
        />
        {hasPlayed ? (
          <StyledBoard>
            <StyledPlayedIcon className={"fa fa-" + AI_ICONS[aiMove]} />
            <StyledResult style={{ backgroundColor: RESULT_COLORS[result] }}>
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
              notSelected={!!playerMove && playerMove !== move}
            />
          ))}
        </StyledButtons>
      </StyledAppContainer>
    );
  }
}

export default App;
