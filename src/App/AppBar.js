/** @format */

import styled, { css } from "styled-components";
import React from "react";

const Bar = styled.div`
  display: grid;
  margin-bottom: 40px;
  grid-template-columns: 180px auto 100px 100px;
`;

const Logo = styled.div`
  font-size: 1.5em;
`;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const ControlButtonElem = styled.div`
  cursor: pointer;
  ${(props) =>
    props.active &&
    css`
      text-shadow: 0px 0px 40px #03ff03;
    `}
`;

const ControlButton = ({ name, active }) => {
  return (
    <ControlButtonElem active={active}>
      {capitalizeFirstLetter(name)}
    </ControlButtonElem>
  );
};

export const AppBar = () => {
  return (
    <Bar>
      <Logo>CryptoDash</Logo>
      <div></div>
      <ControlButton active name="dashboard" />
      <ControlButton name="settings" />
    </Bar>
  );
};
