import React, { Component } from "react";
import styled from "styled-components";
import last from "lodash/last";
import { getHistory, storeHistory, storeModel, getModel } from "../storage";
import RPSEngine from "../RPSEngine";
import Button from "./Button";
import Icon from "./Icon";
import History from "./History";
import Colors from "./Colors";

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

const StyledPlayedIcon = styled(Icon)`
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
      <Colors result={result}>
        {({ backgroundColor, color }) => (
          <StyledAppContainer style={{ backgroundColor }}>
            {hasPlayed ? (
              <StyledBoard>
                <StyledPlayedIcon move={aiMove} flip />
                <StyledResult
                  style={{ backgroundColor: color }}
                >
                  {MESSAGES[result]}
                </StyledResult>
                <StyledPlayedIcon move={playerMove} />
              </StyledBoard>
            ) : (
              <StyledBoard />
            )}
            <History
              history={history.map(({ result }) => result)}
              onClick={this.handleClickHistory}
            />
            <StyledButtons>
              {["rock", "paper", "scissors"].map(move => (
                <Button
                  key={move}
                  move={move}
                  onClick={() => this.handleClick(move)}
                  notSelected={!!playerMove && playerMove !== move}
                />
              ))}
            </StyledButtons>
          </StyledAppContainer>
        )}
      </Colors>
    );
  }
}

export default App;
