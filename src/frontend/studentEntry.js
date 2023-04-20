import React, { useEffect, useState } from 'react'

export default props => {
    const [journalData,setJournalData]=useState([])
    let id = sessionStorage.getItem("studentID")
    let studentName = sessionStorage.getItem("studentName")

    useEffect(() => {
        getJournalData();
    }, []);

    //Gets a list of the student's journal entries
    function getJournalData (){
        console.log(studentName, id)
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
                            <div class="col-12">
                                <button className="btn" onClick={() => handleView(journal.journalID, journal.title, journal.entry, journal.lesson, journal.reviewed)}>VIEW</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    })

    //When users click on the view button, they are sent to the journal page to view the student's journal entry
    const handleView = (journalID, title, entry, lessonNum, reviewed) => {       
        sessionStorage.setItem("journalID", journalID)
        sessionStorage.setItem("title", title)
        sessionStorage.setItem("entry", entry)
        sessionStorage.setItem("lessonNum", lessonNum)
        sessionStorage.setItem("reviewed", reviewed)

        props.onFormSwitch('journal')
    }

    return(
        <form className="entry-container">
            <div class="container">
                <div class="row" id="main-container">
                    <div class="col-12">
                        <h2 className="entry-title">{studentName}'s Journal Entries</h2>
                    </div>                    
                    
                    <div class="row row-cols-1 row-cols-md-3 gy-4 g-4">
                            {journals}
                    </div>
                </div>
            </div>
        </form>
    )
}