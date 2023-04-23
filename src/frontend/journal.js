import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './css/journal.css';

export default props => {
    const [title, setTitle] = useState(null)
    const [entry, setEntry] = useState(null)
    const [corrections, setCorrections] = useState(null)
    const [review, setReview] = useState(null)
    const [journalID, setJournalID] = useState(null)
    const [lessonNum, setLessonNum] = useState(parseInt(sessionStorage.getItem("lessonNum")))
    const [vocabData,setVocabData]=useState([])
    let id = sessionStorage.getItem("id")
    let user = sessionStorage.getItem("userType")

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
        setCorrections(sessionStorage.getItem("corrections"))
    }

    // const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    // const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    

    //Loops through list of Vocab and populates it in the vocab sidebar
    const vocab=vocabData.map( vocab =>{
        return <div key={vocab.id}>
            <div className="vocab" data-toggle = "tooltip" data-placement="right" title={vocab.kanji + "  ;  " + vocab.definition} data-content="hi">
                {vocab.tango}
            </div>

            {/* <div className="vocab" title={vocab.kanji + "  ;  " + vocab.definition}>
                {vocab.tango}
            </div> */}
        </div>
    })

    //Save button
    const handleSave = (e) => {
        e.preventDefault();

        //Save student journal entry
        if(user === "Student"){
            fetch("http://localhost:5000/journal", {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({title, entry, id, journalID, lessonNum})
            })
                .then(response => response.json())
                .catch(error => { console.log("Error: ", error) })

            props.onFormSwitch('entry')
        }

        //Save teacher corrections
        else if (user === "Teacher"){
            fetch("http://localhost:5000/corrections", {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({journalID, corrections})
            })
                .then(response => response.json())
                .catch(error => { console.log("Error: ", error) })

                props.onFormSwitch('studentEntry')
        }
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

    const editorStyle = {
        backgroundColor: "#f2f2f2",
      }

      const modules = {
        toolbar: true,
        clipboard: {
          // set the background color of the editor
          // (note that this property is camelCase, not kebab-case)
          backgroundColor: "#f2f2f2",
        },
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
                                    //Student-view journal page
                                    if (user === "Student"){
                                        //Case 2: Editing journals that haven't been reviewed yet
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
                                        
                                        //Case 3: Journal page with dual text boxes: Left) Journal entry & Right) Read-only teacher's corrections
                                        else if (review == "true") {
                                            console.log("Reviewed")
                                            return (
                                                <div class="row" >
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
                                                            id="ql-editor"
                                                            placeholder="ここに書いてください。。。"
                                                            value= {corrections}
                                                            onChange={setCorrections}
                                                            readOnly
                                                            theme="bubble"
                                                            modules={{ toolbar: false }}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        }

                                        //Default case 1: New journal entry
                                        else{
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
                                    }

                                    //Teacher-view journal page
                                    else if (user === "Teacher"){
                                        return (
                                            //Journal page with dual text boxes: Left) Read-only student journal entry & Right) Corrections
                                            <div class="row">
                                                <div class="col-6">
                                                    <ReactQuill
                                                        className={["Quill"]}
                                                        id="ql-editor"
                                                        placeholder="ここに書いてください。。。"
                                                        value= {entry}
                                                        onChange={setEntry}
                                                        readOnly
                                                        theme="bubble"
                                                        modules={{ toolbar: false }}
                                                    />
                                                </div>

                                                <div class="col-6">
                                                    <ReactQuill  
                                                        className="Quill"
                                                        placeholder="ここに書いてください。。。"
                                                        value= {corrections}
                                                        onChange={setCorrections}
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