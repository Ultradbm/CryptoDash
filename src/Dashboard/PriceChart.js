/** @format */

import HighchartsConfig from "./HighchartsConfig";
import React from "react";
import { Tile } from "../Shared/Tile";
import { AppContext } from "../App/AppProvider";
import ReactHighcharts from "react-highcharts";
import HighchartsTheme from "./HighchartsTheme";
ReactHighcharts.Highcharts.setOptions(HighchartsTheme);

export default function () {
  return (
    <AppContext.Consumer>
      {({ historicalPrices, currentSpotlight }) => (
        <Tile>
          {historicalPrices ? (
            <ReactHighcharts
              config={HighchartsConfig("Price History", historicalPrices)}
            />
          ) : (
            <ReactHighcharts
              config={HighchartsConfig("Loading " + currentSpotlight, null)}
            />
          )}
        </Tile>
      )}
    </AppContext.Consumer>
  );
}
