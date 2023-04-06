import React, { useEffect, useState } from "react";

export default props => {
    const [journalData,setJournalData]=useState([])
    let id = localStorage.getItem("id")

    useEffect(() => {
        getJournalData();
    }, []);

    const handleGetJournals = (e) => {
        e.preventDefault();

        fetch("http://localhost:5000/entry",{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({id})
        })
            .then(response => response.json())
            //.then(data => {usrData = data;})
            .then(data => {setJournalData(data)})
            .catch(error => {console.log("Error: ", error)})
    }

    function getJournalData (){
        fetch("http://localhost:5000/entry",{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({id})
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setJournalData(data)
            })
            .catch(error => {console.log("Error: ", error)})
    }

    //Loops through list of Journals and creates individual panels with each Journal entry
    const journals=journalData.map( journal =>{
        return <div key={journal.id}>
          <h4>{journal.title}</h4>
          <h5>{journal.date}</h5>
          <p>{journal.entry}</p>
        </div>
    
    })

    return(
        <form>
            <h5>Your Journal Entries</h5>
            
            {journals}
        </form>
    )
}