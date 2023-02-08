import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'

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
      <div className="App-login">
        <button style={{color:"blue"}}>Login</button>
      </div>
      <header className="App-header">
        <h1>NISSHI</h1>
      </header>
      <div className="App-content">
        <h7>Please enter in your text below and it will display at the bottom of the screen.</h7>
        <p></p>
        <input type="text" onChange={getData} 
        style={{height:"300px", width:"500px", top:"100px"}}/>
        <h3>{data}</h3>
      </div>
      <div className="App-content">
        <h3>{data}</h3>
      </div>
    </div>
  );
}

export default App;
