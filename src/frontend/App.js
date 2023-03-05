import './App.css';
import React, {useState} from 'react'
import Sidebar  from './sidebar';
import Journal from './journal'
import Login from './login';

function App() {

  const [currentForm, setCurrentForm] = useState('home');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} onFormSwitch={toggleForm} />

      <header className="App-header">
        <h1>NISSHI</h1> 
        <h3 style={{color:"#ffb400"}}>日誌</h3>
      </header>

      <div className="App-content" id="body">
        {
          currentForm === "home" ? <Journal /> : <Login/>
        }
      </div>

    </div>
  );
}

export default App;
