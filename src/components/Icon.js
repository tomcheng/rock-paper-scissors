import PropTypes from "prop-types";
import React from "react";

const getIconClasses = ({ move }) => {
  switch (move) {
    case "rock":
      return "fa fa-hand-rock-o";
    case "paper":
      return "fa fa-hand-paper-o";
    case "scissors":
      return "fa fa-hand-scissors-o";
    default:
      break;
  }
};

const Icon = ({ move, className, flip }) => (
  <span style={move === "scissors" ? { transform: "rotate(77deg)" } : null}>
    <i
      className={
        className +
        " " +
        getIconClasses({ move }) +
        (flip ? " fa-rotate-180" : "")
      }
    />
  </span>
);

Icon.propTypes = {
  move: PropTypes.oneOf(["rock", "paper", "scissors"]).isRequired,
  flip: PropTypes.bool,
  className: PropTypes.string
};

export default Icon;
