import './css/App.css';
import React, { useState } from 'react'
import Sidebar from './sidebar';
import Journal from './journal'
import Login from './login';
import Register from './register';
import Startpage from './startpage';
import Account from './account';
import Entry from './entry';
import Exercise from './exercise';

function App() {

    const [currentForm, setCurrentForm] = useState('startpage');

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }

    return (
        <div className="App">

            {
                currentForm === "startpage" ? <div /> : currentForm === "login" ? <div /> : currentForm === "register" ? <div /> : <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} onFormSwitch={toggleForm} />
            }


            <header className="App-header" onClick={() => toggleForm('startpage')}>
                <div>NISSHI</div>
                <div id="sub-header">日誌</div>
            </header>

            <div className="App-content">
                {
                    currentForm === "userHome" ? <Journal /> : currentForm === "login" ? <Login onFormSwitch={toggleForm} /> :
                    currentForm === "register" ? <Register onFormSwitch={toggleForm} /> : currentForm === "account" ? <Account /> :
                    currentForm === "entry" ? <Entry /> : currentForm === "exercise" ? <Exercise /> : <Startpage onFormSwitch={toggleForm} />
                }
            </div>

        </div>
    );
}

export default App;
