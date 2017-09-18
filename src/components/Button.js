import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #f2f2f2;
  margin: 0 10px;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 80px;
  text-align: center;
  cursor: pointer;
  user-select: none;
`;

const StyledIcon = styled.i`
  font-size: 40px;
  margin-bottom: 8px;
`;

const Button = ({ label, icon, onClick }) => (
  <StyledContainer onClick={onClick}>
    <StyledIcon className={"fa fa-" + icon} />
    {label}
  </StyledContainer>
);

Button.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Button;
