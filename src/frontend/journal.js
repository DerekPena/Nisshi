import React, { useState } from 'react'

export default props => {
    const [title, setTitle] = useState(null)
    const [entry, setEntry] = useState(null)
    let id = localStorage.getItem("id")

    const handleSave = (e) => {
        e.preventDefault();

        fetch("http://localhost:5000/journal", {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({title, entry, id})
        })
            .then(response => response.json())
            .catch(error => { console.log("Error: ", error) })
    }

    function getTitle(val) {
        //setTitle stores the text entry in a variable, updating as the user types
        setTitle(val.target.value)
    }

    function getEntry(val) {
        //setEntry stores the text entry in a variable, updating as the user types
        setEntry(val.target.value)
    }

    return (

        <form onSubmit={handleSave} method="post" action="http://localhost:5000/entry">
            <h5>Please enter in your text below and it will display at the bottom of the screen.</h5>
            <textarea
                placeholder="Title..."
                id="journal_title"
                onChange={getTitle}
                style={{ height: "30px", width: "200px", wordWrap: "break-word", wordBreak: "break-all", fontFamily: "serif" }}
            />
            <h3>{title}</h3>
            <textarea
                placeholder="Type here..."
                name="journal_entry"
                onChange={getEntry}
                style={{ height: "300px", width: "500px", wordWrap: "break-word", wordBreak: "break-all", fontFamily: "serif" }}
            />
            <h5>{entry}</h5>

            <button type='submit'>Save entry</button>
        </form>
    );
};