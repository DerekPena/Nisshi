import React, { useEffect, useState } from "react";
import './css/entry.css';

export default props => {
    const [journalData,setJournalData]=useState([])
    let id = sessionStorage.getItem("id")
    let studentName = sessionStorage.getItem("studentName")

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
                sessionStorage.setItem("lessonNum", 1)
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
                                <button className="btn" onClick={() => handleEdit(journal.journalID, journal.title, journal.entry, journal.lesson, journal.reviewed)}>EDIT</button>
                            </div>

                            <div class="col-6">
                                <button className="btn" onClick={() => handleDelete(journal.journalID)}>DELETE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    })

    //When users click on the edit button, they are sent to the journal page to edit their journal entry
    const handleEdit = (journalID, title, entry, lessonNum, reviewed) => {       
        sessionStorage.setItem("journalID", journalID)
        sessionStorage.setItem("title", title)
        sessionStorage.setItem("entry", entry)
        sessionStorage.setItem("lessonNum", lessonNum)
        sessionStorage.setItem("edit", "true")
        sessionStorage.setItem("reviewed", reviewed)

        props.onFormSwitch('journal')
    }

    //When users click on the delete button, the journal entry is deleted
    const handleDelete = (journalID) => {       
        fetch("http://localhost:5000/delete",{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({journalID})
        })
            .then(response => response.json())

            .catch(error => {console.log("Error: ", error)})

        props.onFormSwitch('journal')
    }

    //Store the Lesson #
    const handleLessonNum = (lessonNum) => {
        sessionStorage.setItem("lessonNum", lessonNum)
    }

    //When users click on the new entry button, they are sent to the journal page to write a new journal entry
    const handleNew = () => {
        // sessionStorage.removeItem("journalID")
        // sessionStorage.removeItem("title")
        // sessionStorage.removeItem("entry")
        sessionStorage.setItem("edit", "false")
        props.onFormSwitch('journal')
    }

    return(
        <form className="entry-container">
            <div class="container">
                <div class="row" id="main-container">
                    <div class="col-8">
                        <h2 className="entry-title">{studentName}'s Journal Entries</h2>
                    </div>
                    <div class="col-1">
                        {/* <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                         </div> */}
                         <select class="btn btn-mini" aria-label=".form-select-sm" onChange={(e) => handleLessonNum(e.target.value)}>
                            <option selected value="1">L1</option>
                            <option value="2">L2</option>
                            <option value="3">L3</option>
                            <option value="4">L4</option>
                            <option value="5">L5</option>
                            <option value="6">L6</option>
                            <option value="7">L7</option>
                            <option value="8">L8</option>
                            <option value="9">L9</option>
                            <option value="10">L10</option>
                            <option value="11">L11</option>
                            <option value="12">L12</option>
                            <option value="13">L13</option>
                            <option value="14">L14</option>
                            <option value="15">L15</option>
                            <option value="16">L16</option>
                            <option value="17">L17</option>
                            <option value="18">L18</option>
                            <option value="19">L19</option>
                            <option value="20">L20</option>
                            <option value="21">L21</option>
                            <option value="22">L22</option>
                            <option value="23">L23</option>
                            <option value="24">L24</option>
                        </select>
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