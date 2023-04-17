import React, { useEffect, useState } from "react";
import './css/entry.css';
import onFormSwitch from "./App.js";

export default props => {
    const [journalData,setJournalData]=useState([])
    let id = sessionStorage.getItem("id")
    let name = sessionStorage.getItem("name")

    useEffect(() => {
        getJournalData();
    }, []);

    //Gets a list of the user's journal entries
    function getJournalData (){
        fetch("http://localhost:5000/entry",{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({id})
        })
            .then(response => response.json())
            .then(data => {
                setJournalData(data)
            })
            .catch(error => {console.log("Error: ", error)})
    }

    //Loops through list of Journals and creates individual panels with each Journal entry
    const journals=journalData.map( 
        journal => { return <div key={journal.id} className="col">
            <div class="card" id ="entry-card">
                <div class="card-body">
                    <div className="card-title">{journal.title}</div>

                    <div className="card-subtitle mb-2 text-muted">{journal.date}</div>

                    <div class="card-footer">
                        <div class="row">
                            <div class="col-6">
                                <button className="btn" onClick={() => handleEdit(journal.title, journal.entry, journal.journal_id)}>EDIT</button>
                            </div>

                            <div class="col-6">
                                <button className="btn" onClick={() => handleDelete(journal.journal_id)}>DELETE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    })

    //When users click on the edit button, they are sent to the journal page to edit their journal entry
    const handleEdit = (title, entry, journal_id) => {       
        sessionStorage.setItem("title", title)
        sessionStorage.setItem("entry", entry)
        sessionStorage.setItem("journal_id", journal_id)
        sessionStorage.setItem("editButton", "true")

        props.onFormSwitch('userHome')
    }

    const handleDelete = (journal_id) => {       
        fetch("http://localhost:5000/delete",{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({journal_id})
        })
            .then(response => response.json())

            .catch(error => {console.log("Error: ", error)})

        props.onFormSwitch('userHome')
        // props.onFormSwitch('entry')
    }

    const handleNew = () => {
        props.onFormSwitch('userHome')
    }

    return(
        <form className="entry-container">
            <div class="container">
                <div class="row" id="main-container">
                    <div class="col-10">
                        <h2 className="entry-title">{name}'s Journal Entries</h2>
                    </div>
                    <div class="col-2">
                        <button className="btn" onClick={() => handleNew()}>NEW ENTRY</button>
                    </div>
                    
                    <div class="row row-cols-1 row-cols-md-3 gy-4 g-4">
                            {journals}
                    </div>
                </div>


            </div>
            
        </form>
    )
}