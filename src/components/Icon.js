import PropTypes from "prop-types";
import React from "react";

const getIconClasses = ({ move }) => {
  switch (move) {
    case "rock":
      return "fa-hand-rock-o";
    case "paper":
      return "fa-hand-paper-o";
    case "scissors":
      return "fa-hand-scissors-o";
    default:
      break;
  }
};

const Icon = ({ move, className, flip }) => (
  <div style={move === "scissors" ? { transform: "rotate(77deg)" } : null}>
    <i
      className={
        className +
        " fa fa-fw " +
        getIconClasses({ move }) +
        (flip ? " fa-rotate-180" : "")
      }
    />
  </div>
);

Icon.propTypes = {
  move: PropTypes.oneOf(["rock", "paper", "scissors"]).isRequired,
  flip: PropTypes.bool,
  className: PropTypes.string
};

export default Icon;
