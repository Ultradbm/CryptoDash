import React from 'react';
import './App.css';
import WelcomeMessage from "./WelcomeMessage"
import styled, {css} from "styled-components";


const MyButton = styled.div`
  color: green;
  ${props => props.primary && css`
    color:palevioletred;
  `}
`

const CoolButton = styled(MyButton)`
  color:blue;
  border-color:purple;
`

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WelcomeMessage/>
        <MyButton>hi</MyButton>
        <MyButton primary >hi</MyButton>
        <CoolButton> hi</CoolButton>
      </header>
    </div>
  );
}

export default App;
