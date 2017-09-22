import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  padding: 8px 0 7px;
  text-align: center;
  color: rgba(255,255,255,0.7);
  background-color: rgba(0,0,0,0.8);
  font-size: 11px;
`;

const History = ({ history, onClick }) => {
  const wins = history.filter(result => result === "win").length;
  const losses = history.filter(result => result === "lose").length;
  const draws = history.filter(result => result === "draw").length;
  return (
    <StyledContainer onClick={onClick}>
      {wins} win{wins === 1 ? "" : "s"}&ensp;{losses} loss{losses === 1 ? "" : "es"}&ensp;{draws}{" "}
      draw{draws === 1 ? "" : "s"}
    </StyledContainer>
  );
};

History.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.oneOf(["win", "lose", "draw"]).isRequired
  ).isRequired,
  onClick: PropTypes.func.isRequired
};

export default History;
