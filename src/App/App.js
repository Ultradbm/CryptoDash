/** @format */

import React from "react";
import "./App.css";
import WelcomeMessage from "./WelcomeMessage";
import styled, { css } from "styled-components";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WelcomeMessage name="hi" />
      </header>
    </div>
  );
}

export default App;
