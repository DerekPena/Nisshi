import './css/App.css';
import React, { useState } from 'react'
import Sidebar from './sidebar';
import Journal from './journal'
import Login from './login';
import Register from './register';
import Startpage from './startpage';
import Account from './account';
import Entry from './entry';
import Teacher from './teacher';
import StudentEntry from './studentEntry';

function App() {

    const [currentForm, setCurrentForm] = useState('startpage');

    const toggleForm = (formName) => {
        if (formName === "login" || formName === "register"){
            setCurrentForm(formName);
        }
        
        if(sessionStorage.getItem("userType") === "Teacher"){
            setCurrentForm(formName);
        }

        else if(sessionStorage.getItem("userType") === "Student"){
             //Handles clicking edit button for page switching
            if (sessionStorage.getItem("edit") == "true"){
                sessionStorage.setItem("edit", "false")
                setCurrentForm(formName);
            }
            //Handles default page switching
            else{
                sessionStorage.removeItem("title")
                sessionStorage.removeItem("entry")
                sessionStorage.removeItem("journalID")
                setCurrentForm(formName);
            }
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
                    currentForm === "journal" ? <Journal onFormSwitch={toggleForm}/> : currentForm === "login" ? <Login onFormSwitch={toggleForm} /> :
                    currentForm === "register" ? <Register onFormSwitch={toggleForm} /> : currentForm === "account" ? <Account /> :
                    currentForm === "entry" ? <Entry onFormSwitch={toggleForm}/> : currentForm === "teacher" ? <Teacher onFormSwitch={toggleForm}/> :
                    currentForm === "studentEntry" ? <StudentEntry onFormSwitch={toggleForm}/> : <Startpage onFormSwitch={toggleForm} />
                }
            </div>
        </div>
    );
}

export default App;
