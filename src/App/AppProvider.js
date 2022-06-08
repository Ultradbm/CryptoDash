/** @format */

import React from "react";
import _ from "lodash";
import moment from "moment";

const cc = require("cryptocompare");
cc.setApiKey(
  "572c0124b895fbe634eca22784d9b2b18d7702eee4f5f346ddad1b34c709b9c3"
);

export const AppContext = React.createContext();

const MAX_FAVORITES = 35;
const TIME_UNITS = 12;

export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "dashboard",
      favorites: ["BTC", "ETH", "XMR", "DOGE"],
      timeInterval: "months",
      ...this.savedSettings(),
      setPage: this.setPage,
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      isInFavorites: this.isInFavorites,
      confirmFavorites: this.confirmFavorites,
      setCurrentSpotlight: this.setCurrentSpotlight,
      setFilteredCoins: this.setFilteredCoins,
      changeChartSelect: this.changeChartSelect,
    };
  }

  componentDidMount = () => {
    this.fetchCoins();
    this.fetchPrices();
    this.fetchHistorical();
  };

  addCoin = (key) => {
    let favorites = [...this.state.favorites];
    if (favorites.length < MAX_FAVORITES) {
      favorites.push(key);
      this.setState({ favorites });
    }
  };

  removeCoin = (key) => {
    let favorites = [...this.state.favorites];
    this.setState({ favorites: _.pull(favorites, key) });
  };

  isInFavorites = (key) => _.includes(this.state.favorites, key);

  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
    this.setState({ coinList });
  };

  fetchPrices = async () => {
    if (this.state.firstVisit) return;
    let coinPrices = await this.prices();
    //Filter empty price objects
    coinPrices = coinPrices.filter((coin) => Object.keys(coin).length);
    console.log(coinPrices);
    this.setState({ prices: coinPrices });
  };
  prices = async () => {
    let returnData = [];
    for (let i = 0; i < this.state.favorites.length; i++) {
      try {
        let priceData = await cc.priceFull(this.state.favorites[i], "USD");
        returnData.push(priceData);
      } catch (e) {
        console.warn("Fetch Price Error: ", e);
      }
    }
    return returnData;
  };

  fetchHistorical = async () => {
    if (this.state.firstVisit) return;
    let results = await this.historical();
    console.log("results", results);
    let historicalPrices = [
      {
        name: this.state.currentSpotlight,
        data: results.map((price, index) => [
          moment()
            .subtract({ [this.state.timeInterval]: TIME_UNITS - index })
            .valueOf(),
          price.USD,
        ]),
      },
    ];
    this.setState({ historicalPrices });
  };

  historical = () => {
    let promises = [];
    for (let units = TIME_UNITS; units > 0; units--) {
      promises.push(
        cc.priceHistorical(
          this.state.currentSpotlight,
          ["USD"],
          moment()
            .subtract({ [this.state.timeInterval]: units })
            .toDate()
        )
      );
    }
    return Promise.all(promises);
  };

  confirmFavorites = () => {
    let currentSpotlight = this.state.favorites[0];
    this.setState(
      {
        firstVisit: false,
        page: "dashboard",
        currentSpotlight,
        prices: null,
        historicalPrices: null,
      },
      () => {
        this.fetchPrices();
        this.fetchHistorical();
      }
    );
    localStorage.setItem(
      "cryptoDash",
      JSON.stringify({
        favorites: this.state.favorites,
        currentSpotlight,
      })
    );
    console.log("favorites confirmed");
  };

  setCurrentSpotlight = (sym) => {
    this.setState(
      {
        currentSpotlight: sym,
        historicalPrices: null,
      },
      this.fetchHistorical
    );
    localStorage.setItem(
      "cryptoDash",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("cryptoDash")),
        currentSpotlight: sym,
      })
    );
  };

  savedSettings() {
    let cryptoDashData = JSON.parse(localStorage.getItem("cryptoDash"));
    if (!cryptoDashData) {
      return { page: "settings", firstVisit: true };
    }
    let { favorites, currentSpotlight } = cryptoDashData;

    return { favorites, currentSpotlight };
  }

  setPage = (page) => this.setState({ page });

  setFilteredCoins = (filteredCoins) => this.setState({ filteredCoins });

  changeChartSelect = (value) => {
    this.setState({ timeInterval: value, historicalPrices: null });
    this.fetchHistorical();
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
