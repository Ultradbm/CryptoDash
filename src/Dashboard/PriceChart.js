/** @format */

import HighchartsConfig from "./HighchartsConfig";
import React from "react";
import { Tile } from "../Shared/Tile";
import { AppContext } from "../App/AppProvider";
import ReactHighcharts from "react-highcharts";
import HighchartsTheme from "./HighchartsTheme";
import ChartSelect from "./ChartSelect";
ReactHighcharts.Highcharts.setOptions(HighchartsTheme);

export default function () {
  return (
    <AppContext.Consumer>
      {({ historicalPrices, currentSpotlight, changeChartSelect }) => (
        <Tile>
          <ChartSelect
            defaultValue={"months"}
            onChange={(e) => changeChartSelect(e.target.value)}
          >
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
          </ChartSelect>
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
