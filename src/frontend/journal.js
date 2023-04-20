import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './css/journal.css';

export default props => {
    const [title, setTitle] = useState(null)
    const [entry, setEntry] = useState(null)
    const [comment, setComment] = useState(null)
    const [review, setReview] = useState(null)
    const [journalID, setJournalID] = useState(null)
    const [lessonNum, setLessonNum] = useState(parseInt(sessionStorage.getItem("lessonNum")))
    const [vocabData,setVocabData]=useState([])
    let id = sessionStorage.getItem("id")

    useEffect(() => {
        setJournal();
        getVocabData();
    }, []);

    function getVocabData() {
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

    //If the edit button was clicked, Prefills the journal page with the that journal's title, entry, & lesson number
    function setJournal() {
        setJournalID(sessionStorage.getItem("journalID"))
        setTitle(sessionStorage.getItem("title"))
        setEntry(sessionStorage.getItem("entry"))
        setLessonNum(parseInt(sessionStorage.getItem("lessonNum")))
        setReview(sessionStorage.getItem("reviewed"))
    }

    //Loops through list of Vocab and populates it in the vocab sidebar
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

    //Saves the journal entry
    const handleSave = (e) => {
        e.preventDefault();

        fetch("http://localhost:5000/journal", {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({title, entry, id, journalID, lessonNum})
        })
            .then(response => response.json())
            .catch(error => { console.log("Error: ", error) })

        sessionStorage.setItem("edit", "false")
        props.onFormSwitch('entry')
    }
    
    function checkVocab() {
        let index = 0;
        let indexKanji = 0;
        let settingEntry = entry;
        let word = "";
        let wordKanji = "";
        let conjugated = false;
        settingEntry = settingEntry.replaceAll("<strong style=\"color: rgb(255, 180, 0);\">", "");
        settingEntry = settingEntry.replaceAll("</strong>", "");
        let runningEntry = settingEntry;

        //Known Bug: Only checks for words once when conjugated and once unconjugated.
        for(let key of vocabData.keys())
        {
            let runningEntry = settingEntry;
                if(vocabData[key].type == "verb")
                {
                    if(vocabData[key].type2 == "ru")
                    {
                        word = vocabData[key].tango;
                        wordKanji = vocabData[key].kanji;
                        word = word.replace("る", "");
                        wordKanji = wordKanji.replace("る", "");
                        index = settingEntry.indexOf(word);
                        indexKanji = settingEntry.indexOf(wordKanji);
                        if(index != -1)
                        {
                            if(settingEntry.substring(index + word.length, index + word.length + 2) == "ます")
                            {
                                word = word + "ます";
                                conjugated = true;
                            }
                            else if(settingEntry.substring(index + word.length, index + word.length + 3) == "ません")
                            {
                                word = word + "ません";
                                conjugated = true;
                            }

                            if(conjugated)
                            {
                                settingEntry = (settingEntry.slice(0, index) + "<strong style=\"color: rgb(255, 180, 0);\">" + settingEntry.slice(index, index + word.length) + "</strong>" + settingEntry.slice(index + word.length));
                                //runningEntry = runningEntry.substring(index);
                                conjugated = false;
                            }
                            
                        }
                        else if(indexKanji != -1)
                        {
                            if(settingEntry.substring(index + wordKanji.length, index + wordKanji.length + 2) == "ます")
                            {
                                wordKanji = wordKanji + "ます";
                                conjugated = true;
                            }
                            else if(settingEntry.substring(index + wordKanji.length, index + wordKanji.length + 3) == "ません")
                            {
                                wordKanji = wordKanji + "ません";
                                conjugated = true;
                            }
                            if(conjugated)
                            {
                                settingEntry = (settingEntry.slice(0, indexKanji) + "<strong style=\"color: rgb(255, 180, 0);\">" + settingEntry.slice(indexKanji, indexKanji + wordKanji.length) + "</strong>" + settingEntry.slice(indexKanji + wordKanji.length));
                                //runningEntry = runningEntry.substring(index);
                                conjugated = false;
                            }
                        } 
                    }
                    else if(vocabData[key].type == "u")
                    {
                        //U-verbs
                    }
                    else{
                        // Need to account for irregular verbs
                    }
                }

                // Default case (Nouns, Infinitives, etc)
                word = vocabData[key].tango;
                wordKanji = vocabData[key].kanji;
                index = settingEntry.indexOf(word);
                indexKanji = settingEntry.indexOf(wordKanji);
                if(index != -1)
                {
                    settingEntry = (settingEntry.slice(0, index) + "<strong style=\"color: rgb(255, 180, 0);\">" + settingEntry.slice(index, index + word.length) + "</strong>" + settingEntry.slice(index + word.length));
                    //runningEntry = runningEntry.substring(index);
                }
                else if(indexKanji != -1)
                {
                    settingEntry = (settingEntry.slice(0, indexKanji) + "<strong style=\"color: rgb(255, 180, 0);\">" + settingEntry.slice(indexKanji, indexKanji + wordKanji.length) + "</strong>" + settingEntry.slice(indexKanji + wordKanji.length));
                    //runningEntry = runningEntry.substring(index);
                } 
        } 
        setEntry(settingEntry);
    } 

    return (
        <form onSubmit={handleSave}>
            {/* <div className="journal-container"> */}
            <div>
                <div class="row" id="header-area">
                    <div class="col-9">
                        <h3 id="journal-page-header">Editing Journal Entry</h3>
                    </div>
                    <div class="col-2">
                        <button class="btn btn-md" id="save-btn" type="button" onClick={checkVocab}>CHECK VOCABULARY</button>
                    </div>
                    <div class="col-1">
                        <button class="btn btn-md" id="save-btn" type="submit" onClick={checkVocab}>SAVE</button>
                    </div>
                </div>

                <div id="main-journal-area" class="flex-wrap">
                    <div class="row gx-4">

                        <div class="col-10">
                            <div class="row gx-2">
                                <div class="col-12">
                                    <input class="form-control form-control-lg" value={title} onChange={(e) => setTitle(e.target.value)} 
                                    type="text" placeholder="Enter a Title..." id="journal-title"></input>
                                </div>
                            </div>

                            <div>
                                {(() => {
                                    //Default journal page for 1) New journals and 2) Editing journals that haven't been reviewed yet
                                    if (review == "false") {
                                        return (
                                            <div class="col-12">
                                                <ReactQuill
                                                    className="Quill"
                                                    placeholder="ここに書いてください。。。"
                                                    value= {entry}
                                                    onChange={setEntry}
                                                />
                                            </div>
                                        )
                                    }
                                    
                                    //Teacher has reviewed journal entry; Displays the original journal entry and the reviewed comments
                                    else if (review == "true") {
                                        console.log("Reviewed")
                                        return (
                                            <div class="row">
                                                <div class="col-6">
                                                    <ReactQuill
                                                        className="Quill"
                                                        placeholder="ここに書いてください。。。"
                                                        value= {entry}
                                                        onChange={setEntry}
                                                    />
                                                </div>

                                                <div class="col-6">
                                                    <ReactQuill  
                                                        className="Quill"
                                                        placeholder="ここに書いてください。。。"
                                                        value= {comment}
                                                        onChange={setComment}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    }
                                }) ()}

                                {/* <div class="col-12">
                                    <ReactQuill
                                        className="Quill"
                                        placeholder="ここに書いてください。。。"
                                        value= {entry}
                                        onChange={setEntry}
                                    />
                                </div> */}

                            </div>
                        </div>

                        <div class="col-2">
                            <div class="row">
                                <div className="vocab-container">
                                    <p className="vocab-title">L{lessonNum}の単語</p>
                                    <p className="vocab-box">{vocab}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};