import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import upperFirst from "lodash/upperFirst";
import Icon from "./Icon";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 80px;
  text-align: center;
  cursor: pointer;
  user-select: none;
  background-color: rgba(0, 0, 0, 0.1);
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  & + & {
    margin-left: 1px;
  }
`;

const StyledIcon = styled(Icon)`
  font-size: 40px;
  margin-bottom: 8px;
`;

const StyledLabel = styled.div`
  opacity: 0.8;
  font-size: 13px;
`;

const Button = ({ move, onClick, notSelected }) => (
  <StyledContainer onClick={onClick} style={{ opacity: notSelected ? 0.4 : 1 }}>
    <StyledIcon move={move} />
    <StyledLabel>{upperFirst(move)}</StyledLabel>
  </StyledContainer>
);

Button.propTypes = {
  move: PropTypes.string.isRequired,
  notSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Button;
