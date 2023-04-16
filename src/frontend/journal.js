import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './css/journal.css';


export default props => {
    const [title, setTitle] = useState(null)
    const [entry, setEntry] = useState(null)
    const [journal_id, setJournal_id] = useState(null)
    const [vocabData,setVocabData]=useState([])
    let id = sessionStorage.getItem("id")
    // let lesson = sessionStorage.getItem("lesson")
    let lessonNum = 22

    useEffect(() => {
        setJournal();
        getVocabData();
    }, []);

    function getVocabData() {
        let lessonNum = 22
        fetch("http://localhost:5000/vocab",{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({lessonNum})
        })
            .then(response => response.json())
            .then(data => {
                setVocabData(data)
            })
            .catch(error => {console.log("Error: ", error)})
    }

    //Loops through list of Vocab and populates it 
    const vocab=vocabData.map( vocab =>{
        return <div key={vocab.id}>
            {/* <p className="vocab" onMouseOver={() => handleMouseOver(vocab.kanji, vocab.definition)} onMouseLeave={() => handleMouseLeave()}>{vocab.tango}</p> */}
            <div className="vocab">
                {vocab.tango}

                {/* <div className='tooltiptext'> 
                    {vocab.kanji} 
                    {vocab.definition}
                </div> */}
            </div>
        </div>
    })

    // const handleMouseOver = (kanji, definition) => {
    //     return <div className='popup'> HI </div>
    //     return <div className='popup'>
    //         <span className='tooltiptext'>
    //             <p>{kanji}</p>
    //             <p>{definition}</p>
    //         </span>
    //     </div>
    // };

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
    
    function checkVocab() {
        let index = 0;
        let tempEntry = entry;
        tempEntry = tempEntry.replaceAll("<strong style=\"color: rgb(255, 180, 0);\">", "");
        tempEntry = tempEntry.replaceAll("</strong>", "");
        for(let key of vocabData.keys())
        {
            let word = vocabData[key].tango;
            index = tempEntry.indexOf(word)
            if(index != -1)
            {
                tempEntry = (tempEntry.slice(0, index) + "<strong style=\"color: rgb(255, 180, 0);\">" + tempEntry.slice(index, index+word.length) + "</strong>" + tempEntry.slice(index + word.length));
            } 
        } 
        setEntry(tempEntry);
    } 

    //If the edit button was clicked, Prefills the journal page with the that journal's title and entry
    function setJournal() {
        setTitle(sessionStorage.getItem("title"))
        setEntry(sessionStorage.getItem("entry"))
        setJournal_id(sessionStorage.getItem("journal_id"))
    }

    return (

        <form onSubmit={handleSave}  method="post" action="http://localhost:5000/entry">
            <div className="journal-container">
                <textarea
                    placeholder="Title..."
                    id="journal-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{wordWrap: "break-word", wordBreak: "break-all", fontFamily: "serif" }}
                />

                <ReactQuill  
                    className="Quill"
                    placeholder="Type Here..."
                    value= {entry}
                    onChange={setEntry}
                />

                <div className="vocab-container">
                    <p className="vocab-title">Lesson {lessonNum} Vocab</p>
                    <p className="vocab-box">{vocab}</p>
                </div>
            </div>

            <div>
                <h5><u>{title}</u></h5>
                <p dangerouslySetInnerHTML={{ __html: entry }}></p>
            </div>
            <button type="button" onClick={checkVocab}>Check Vocabulary</button>
            <button type='submit' onClick={checkVocab}>Save Entry</button>
        </form>
    );
};