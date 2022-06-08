/** @format */

import React from "react";
import styled, { css } from "styled-components";
import { SelectableTile } from "../Shared/Tile";
import { fontSize3, fontSizeBig, greenBoxShadow } from "../Shared/Styles";
import { CoinHeaderGridStyled } from "../Settings/CoinHeaderGrid";
import { AppContext } from "../App/AppProvider";

const JustifyRight = styled.div`
  justify-self: right;
`;
const JustifyLeft = styled.div`
  justify-self: left;
`;

const TickerPrice = styled.div`
  ${fontSizeBig};
`;

const ChangePct = styled.div`
  color: green;
  ${(props) =>
    props.red &&
    css`
      color: red;
    `}
`;

const numberFormat = (number) => {
  return +(number + "").slice(0, 7); //+ in beginning converts back to integer
};

const PriceTileStyled = styled(SelectableTile)`
  ${(props) =>
    props.compact &&
    css`
      ${fontSize3};
      display: grid;
      grid-gap: 5px;
      justify-items: right;
      grid-template-columns: repeat(3, 1fr);
    `}
    ${(props) =>
      props.noData &&
      css`
        grid-template-columns: repeat(2, 1fr);
        opacity: 0.5;
      `}
      ${(props) =>
        props.currentSpotlight &&
        css`
          ${greenBoxShadow};
          pointer-events: none;
        `}
  }
`;

function ChangePercent({ data }) {
  return (
    <JustifyRight>
      <ChangePct red={data.CHANGEPCT24HOUR < 0}>
        {numberFormat(data.CHANGEPCT24HOUR)}%
      </ChangePct>
    </JustifyRight>
  );
}

const NoPrice = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
`;

const NoPriceData = styled.div`
  font-size: 14px;
  color: gray;
`;

function PriceTile({ sym, data, currentSpotlight, setCurrentSpotlight }) {
  return (
    <PriceTileStyled
      onClick={setCurrentSpotlight}
      currentSpotlight={currentSpotlight}
    >
      {data.PRICE ? (
        <div>
          <CoinHeaderGridStyled>
            <div>{sym}</div>
            <ChangePercent data={data} />
          </CoinHeaderGridStyled>
          <TickerPrice>${numberFormat(data.PRICE)}</TickerPrice>
        </div>
      ) : (
        <NoPrice>
          <div>{sym}</div>
          <NoPriceData>No Price Data</NoPriceData>
        </NoPrice>
      )}
    </PriceTileStyled>
  );
}

function PriceTileCompact({
  sym,
  data,
  currentSpotlight,
  setCurrentSpotlight,
}) {
  return (
    <div>
      {data.PRICE ? (
        <PriceTileStyled
          onClick={setCurrentSpotlight}
          compact
          currentSpotlight={currentSpotlight}
        >
          <JustifyLeft>{sym}</JustifyLeft>
          <ChangePercent data={data} />
          <div>${numberFormat(data.PRICE)}</div>
        </PriceTileStyled>
      ) : (
        <PriceTileStyled compact noData>
          <JustifyLeft>{sym}</JustifyLeft>
          <JustifyRight>No Price Data</JustifyRight>
        </PriceTileStyled>
      )}
    </div>
  );
}

export default function ({ price, index }) {
  let sym = Object.keys(price)[0];
  let data = price[sym]["USD"];
  let TileClass = index < 5 ? PriceTile : PriceTileCompact;
  return (
    <AppContext.Consumer>
      {({ currentSpotlight, setCurrentSpotlight }) => (
        <TileClass
          sym={sym}
          data={data}
          currentSpotlight={currentSpotlight === sym}
          setCurrentSpotlight={() => setCurrentSpotlight(sym)}
        ></TileClass>
      )}
    </AppContext.Consumer>
  );
}
