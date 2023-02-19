import './App.css';
import React, {useState} from 'react'
import Sidebar from './sidebar';

function App() {
  const [data, setData]=useState(null)
  function getData(val)
  {
    //setData stores the text entry in a variable, updating as the user types
    setData(val.target.value)
    console.warn(val.target.value)
  }

  return (
    <div className="App">
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <header className="App-header">
        <h1>NISSHI</h1> 
        <h3 style={{color:"#ffb400"}}>日誌</h3>
      </header>
      <div className="App-content" id="body">
        <h7>Please enter in your text below and it will display at the bottom of the screen.</h7>
        <p></p>
        <textarea placeholder="Type here..." onChange={getData} 
        style={{height:"300px", width:"500px", wordWrap:"break-word", wordBreak:"break-all", fontFamily:"serif"}}/>
        <h3>{data}</h3>
      </div>
    </div>
  );
}

export default App;
