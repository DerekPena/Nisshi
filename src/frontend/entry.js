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
    const journals=journalData.map( journal => {        
        return <div key={journal.id} className="container">
            <p className="journalTitle">{journal.title}</p>
            <p className="date">{journal.date}</p>
            <button className="edit" onClick={() => handleEdit(journal.title, journal.entry, journal.journal_id)}>Edit</button>
            {/* <p className="entry" dangerouslySetInnerHTML={{ __html: journal.entry }}></p> */}
            {/* <p className="entry">{journal.entry}</p> */}
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

    const handleNew = () => {
        props.onFormSwitch('userHome')
    }

    return(
        <form className="entry-container">
            <h2 className="entry-title">{name}'s Journal Entries</h2>

            <button className="new" onClick={() => handleNew()}>New</button>
            
            {journals}
        </form>
    )
}