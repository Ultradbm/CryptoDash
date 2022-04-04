/** @format */

import styled from "styled-components";
import React from "react";

const Bar = styled.div`
  display: grid;
  grid-template-columns: 180px auto 100px 100px;
`;

export const AppBar = () => {
  return (
    <Bar>
      <div>CryptoDash</div>
      <div></div>
      <div>Dashboard</div>
      <div>Settings</div>
    </Bar>
  );
};
