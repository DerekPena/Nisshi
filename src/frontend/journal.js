import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './css/journal.css';


export default props => {
    const [title, setTitle] = useState(null)
    const [entry, setEntry] = useState(null)
    const [journal_id, setJournal_id] = useState(null)
    //const [vocabData,setVocabData]=useState([])
    let id = sessionStorage.getItem("id")
    //let lesson = sessionStorage.getItem("lesson")
    //let lessonNum = 22

    useEffect(() => {
        setJournal();
        // getVocabData();
    }, []);

    // function getVocabData() {
    //     let lessonNum = 22
    //     fetch("http://localhost:5000/vocab",{
    //         method: 'POST',
    //         headers: {'Content-type': 'application/json'},
    //         body: JSON.stringify({lessonNum})
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             setVocabData(data)
    //         })
    //         .catch(error => {console.log("Error: ", error)})
    // }

    // //Loops through list of Vocab and populates it 
    // const vocab=vocabData.map( vocab =>{
    //     return <div key={vocab.id}>
    //       <h5>Tango: {vocab.tango}</h5>
    //       <h5>Kanji: {vocab.kanji}</h5>
    //       <p>Definition: {vocab.definition}</p>
    //     </div>
    
    // })

    const handleSave = (e) => {
        e.preventDefault();

        fetch("http://localhost:5000/journal", {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({title, entry, id, journal_id})
        })
            .then(response => response.json())
            .catch(error => { console.log("Error: ", error) })

        props.onFormSwitch('entry')
    }

    //If the edit button was clicked, Prefills the journal page with the that journal's title and entry
    function setJournal() {
        setTitle(sessionStorage.getItem("title"))
        setEntry(sessionStorage.getItem("entry"))
        setJournal_id(sessionStorage.getItem("journal_id"))
    }

    return (

        <form onSubmit={handleSave} method="post" action="http://localhost:5000/entry">
            <h5>Please enter in your text below and it will display at the bottom of the screen.</h5>
            <div>
                <textarea
                    placeholder="Title..."
                    id="journal-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{wordWrap: "break-word", wordBreak: "break-all", fontFamily: "serif" }}
                />

                <ReactQuill  
                    id="Quill"
                    placeholder="Type Here..."
                    value= {entry}
                    onChange={setEntry}
                />

                {/* <textarea
                    placeholder="Type here..."
                    name="journal_entry"
                    onChange={(e) => setEntry(e.target.value)}
                    style={{ height: "300px", width: "500px", wordWrap: "break-word", wordBreak: "break-all", fontFamily: "serif" }}
                /> */}

            </div>

            <button type='submit'>Save entry</button>

            {/* <div>{vocab}</div> */}
        </form>
    );
};