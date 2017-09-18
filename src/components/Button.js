import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 10px;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 80px;
  text-align: center;
  cursor: pointer;
  user-select: none;
  background: #f2f2f2;
  border: 2px solid ${props => props.active ? "#333" : "#ddd"};
`;

const StyledIcon = styled.i`
  font-size: 40px;
  margin-bottom: 8px;
`;

const Button = ({ label, icon, onClick, active }) => (
  <StyledContainer onClick={onClick} active={active}>
    <StyledIcon className={"fa fa-" + icon} />
    {label}
  </StyledContainer>
);

Button.propTypes = {
  active: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Button;
