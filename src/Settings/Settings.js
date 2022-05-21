/** @format */
import React from "react";
import WelcomeMessage from "./WelcomeMessage";
import ConfirmButton from "./ConfirmButton";
import Search from "./Search";
import Page from "../Shared/Page";
import CoinGrid from "./CoinGrid";

export default function Settings() {
  return (
    <Page name="settings">
      <WelcomeMessage />
      <CoinGrid topSection />
      <ConfirmButton />
      <Search />
      <CoinGrid />
    </Page>
  );
}
