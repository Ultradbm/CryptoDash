/** @format */

import React from "react";
import styled, { css } from "styled-components";

const CoinImage = styled.img`
  height: 50px;
  border-radius: 100%;
  ${(props) =>
    props.spotlight &&
    css`
      height: 200px;
      margin: auto;
      display: block;
      border-radius: 0%;
    `}
`;

export default function ({ coin, spotlight }) {
  return (
    <CoinImage
      spotlight={spotlight}
      alt={coin.CoinSymbol}
      src={`http://cryptocompare.com/${coin.ImageUrl}`}
    />
  );
}
