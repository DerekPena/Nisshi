import React, { useState } from 'react'

export default props => {
    const [title, setTitle] = useState(null)
    const [entry, setEntry] = useState(null)

    const handleSave = (e) => {
        e.preventDefault();

        fetch("http://localhost:5000/entry", {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ title, entry })
        })
            .then(response => response.json())
            .then(title => { console.log("Title: ", title) })
            .then(entry => { console.log("Entry: ", entry) })
            .catch(error => { console.log("Error: ", error) })

        //console.log(`Journal, ${data}`);
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