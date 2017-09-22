import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  padding-top: 10px;
  text-align: center;
  color: #888;
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