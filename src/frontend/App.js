import './App.css';
import React, {useState} from 'react'
import Sidebar from './sidebar';
import Journal from './journal'

function App() {

  return (
    <div className="App">
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />

      <header className="App-header">
        <h1>NISSHI</h1> 
        <h3 style={{color:"#ffb400"}}>日誌</h3>
      </header>

      <div className="App-content" id="body">
        <h5>Please enter in your text below and it will display at the bottom of the screen.</h5>

        <Journal />
      </div>

    </div>
  );
}

export default App;
