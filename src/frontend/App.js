import './css/App.css';
import React, { useState } from 'react'
import Sidebar from './sidebar';
import Journal from './journal'
import Login from './login';
import Register from './register';
import Startpage from './startpage';
import Account from './account';
import Entry from './entry';

function App() {

    const [currentForm, setCurrentForm] = useState('startpage');

    const toggleForm = (formName) => { 
        //Handles clicking edit button for page switching    
        if (sessionStorage.getItem("editButton") == "true"){
            sessionStorage.setItem("editButton", "false")
            setCurrentForm(formName);
        }
        //Handles default page switching
        else{
            sessionStorage.removeItem("title")
            sessionStorage.removeItem("entry")
            sessionStorage.removeItem("journal_id")
            setCurrentForm(formName);
        }
    }

    return (
        <div className="App">
            {
                currentForm === "startpage" ? <div /> : currentForm === "login" ? <div /> : currentForm === "register" ? <div /> : <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} onFormSwitch={toggleForm} />
            }


            <header className="App-header" onClick={() => toggleForm('startpage')}>
                <a>Nisshi・日誌</a>
            </header>

            <div className="App-content">
                {
                    currentForm === "userHome" ? <Journal onFormSwitch={toggleForm}/> : currentForm === "login" ? <Login onFormSwitch={toggleForm} /> :
                    currentForm === "register" ? <Register onFormSwitch={toggleForm} /> : currentForm === "account" ? <Account /> :
                    currentForm === "entry" ? <Entry onFormSwitch={toggleForm}/>: <Startpage onFormSwitch={toggleForm} />
                }
            </div>
        </div>
    );
}

export default App;
