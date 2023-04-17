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
                                <button className="btn" onClick={() => handleEdit(journal.title, journal.entry, journal.journal_id)}>DELETE</button>
                            </div>
                        </div>
                    </div>

                
                </div>
            </div>
            
            
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
            <div class="container">
                <div class="row" id="main-container">
                    <div class="col-8">
                        <h2 className="entry-title">{name}'s Journal Entries</h2>
                    </div>
                    <div class="col-1">
                        <div class="dropdown">
                            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                L22
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="#">L1</a>
                                <a class="dropdown-item" href="#">L2</a>
                                <a class="dropdown-item" href="#">L3</a>
                                <a class="dropdown-item" href="#">L4</a>
                                <a class="dropdown-item" href="#">L5</a>
                                <a class="dropdown-item" href="#">L6</a>
                                <a class="dropdown-item" href="#">L7</a>
                                <a class="dropdown-item" href="#">L8</a>
                                <a class="dropdown-item" href="#">L9</a>
                                <a class="dropdown-item" href="#">L10</a>
                                <a class="dropdown-item" href="#">L11</a>
                                <a class="dropdown-item" href="#">L12</a>
                                <a class="dropdown-item" href="#">L13</a>
                                <a class="dropdown-item" href="#">L14</a>
                                <a class="dropdown-item" href="#">L15</a>
                                <a class="dropdown-item" href="#">L16</a>
                                <a class="dropdown-item" href="#">L17</a>
                                <a class="dropdown-item" href="#">L18</a>
                                <a class="dropdown-item" href="#">L19</a>
                                <a class="dropdown-item" href="#">L20</a>
                                <a class="dropdown-item" href="#">L21</a>
                                <a class="dropdown-item" href="#">L22</a>
                                <a class="dropdown-item" href="#">L23</a>
                                <a class="dropdown-item" href="#">L24</a>
                            </div>
                         </div>
                    </div>
                    <div class="col-3">
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