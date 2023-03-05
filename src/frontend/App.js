import './App.css';
import React, {useState} from 'react'
import Sidebar  from './sidebar';
import Journal from './journal'
import Login from './login';
import Mainhome from './mainhome';

function App() {

  const [currentForm, setCurrentForm] = useState('mainHome');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">

      {
        currentForm === "mainHome" ? <a/> : <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} onFormSwitch={toggleForm} />
      }
      

      <header className="App-header" onClick={() => toggleForm('mainHome')}>
        <a>NISSHI</a> 
        <a className="sub-header">日誌</a>
      </header>

      <div className="App-content" id="body">
        {
          currentForm === "userHome" ? <Journal /> : currentForm === "login" ? <Login/> : <Mainhome onFormSwitch={toggleForm}/>
        }
      </div>

    </div>
  );
}

export default App;
