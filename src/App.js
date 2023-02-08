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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>NISSHI</h1>
        <input type="text" onChange={getData} 
        style={{height:"300px", width:"500px", top:"100px"}}/>
        <h3>{data}</h3>
        <button style={{position:"10px"}}>Login</button>
      </header>
    </div>
  );
}

export default App;
