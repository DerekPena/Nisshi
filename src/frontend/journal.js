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
        settingEntry = settingEntry.replaceAll("<strong style=\"color: rgb(30, 144, 255);\">", "");
        //Following line of code is to preserve formatting when users copy vocabulary from the word bank
        settingEntry = settingEntry.replaceAll("<strong style=\"background-color: rgb(255, 247, 237); color: rgb(43, 17, 7);\">", "");
        settingEntry = settingEntry.replaceAll("</strong>", "");
        let runningEntry = settingEntry;
        let replacement = "";

        for(let key of vocabData.keys())
        {
                if(vocabData[key].type == "verb")
                {
                    if(vocabData[key].type2 == "ru")
                    {
                        index = 1;
                        indexKanji = 1;
                        while(index != -1 || indexKanji != -1)
                        {
                            word = vocabData[key].tango;
                            wordKanji = vocabData[key].kanji;
                            if(wordKanji == null)
                            {
                                wordKanji = "nulldatainvalidkanji";
                            }
                            index = runningEntry.indexOf(word);
                            indexKanji = runningEntry.indexOf(wordKanji);
                            if(index != -1)
                            {
                                settingEntry = (settingEntry.slice(0, index) + "<strong style=\"color: rgb(255, 180, 0);\">" + settingEntry.slice(index, index + word.length) + "</strong>" + settingEntry.slice(index + word.length));
                                runningEntry = (runningEntry.slice(0, index) + "<strong style=\"color: rgb(255, 180, 0);\">" + runningEntry.slice(index, index + word.length) + "</strong>" + runningEntry.slice(index + word.length));
                                for(let i = 0; i < word.length; i++)
                                        {
                                            replacement = replacement + "X";
                                        }
                                runningEntry = runningEntry.replace(word, replacement);
                                replacement = "";
                            }
                            else if(indexKanji != -1)
                            {
                                settingEntry = (settingEntry.slice(0, indexKanji) + "<strong style=\"color: rgb(255, 180, 0);\">" + settingEntry.slice(indexKanji, indexKanji + wordKanji.length) + "</strong>" + settingEntry.slice(indexKanji + wordKanji.length));
                                runningEntry = (runningEntry.slice(0, indexKanji) + "<strong style=\"color: rgb(255, 180, 0);\">" + runningEntry.slice(indexKanji, indexKanji + wordKanji.length) + "</strong>" + runningEntry.slice(indexKanji + wordKanji.length));
                                for(let i = 0; i < wordKanji.length; i++)
                                        {
                                            replacement = replacement + "X";
                                        }
                                runningEntry = runningEntry.replace(wordKanji, replacement);
                                replacement = "";
                            } 
                            else {
                                word = word.substring(0, word.length-1);
                                wordKanji = wordKanji.substring(0, wordKanji.length-1);
                                index = runningEntry.indexOf(word);
                                indexKanji = runningEntry.indexOf(wordKanji);
                                if(index != -1)
                                {
                                    if(runningEntry.substring(index + word.length, index + word.length + 2) == "ます")
                                    {
                                        word = word + "ます";
                                        conjugated = true;
                                    }
                                    else if(runningEntry.substring(index + word.length, index + word.length + 3) == "ません")
                                    {
                                        word = word + "ません";
                                        conjugated = true;
                                    }
                                    if(conjugated)
                                    {
                                        settingEntry = (settingEntry.slice(0, index) + "<strong style=\"color: rgb(255, 180, 0);\">" + settingEntry.slice(index, index + word.length) + "</strong>" + settingEntry.slice(index + word.length));
                                        runningEntry = (runningEntry.slice(0, index) + "<strong style=\"color: rgb(255, 180, 0);\">" + runningEntry.slice(index, index + word.length) + "</strong>" + runningEntry.slice(index + word.length));
                                        for(let i = 0; i < word.length; i++)
                                        {
                                            replacement = replacement + "X";
                                        }
                                        runningEntry = runningEntry.replace(word, replacement);
                                        replacement = "";
                                        conjugated = false;
                                    }
                                    else {
                                        console.log("NOT CONJUGATED OR UNRECOGNIZED FORM");
                                        settingEntry = (settingEntry.slice(0, index) + "<strong style=\"color: rgb(30, 144, 255);\">" + settingEntry.slice(index, index + word.length) + "</strong>" + settingEntry.slice(index + word.length));
                                        runningEntry = (runningEntry.slice(0, index) + "<strong style=\"color: rgb(30, 144, 255);\">" + runningEntry.slice(index, index + word.length) + "</strong>" + runningEntry.slice(index + word.length));
                                        for(let i = 0; i < word.length; i++)
                                        {
                                            replacement = replacement + "X";
                                        }
                                        runningEntry = runningEntry.replace(word, replacement);
                                        replacement = ""; 
                                    }
                                    
                                }
                                else if(indexKanji != -1)
                                {
                                    if(runningEntry.substring(indexKanji + wordKanji.length, indexKanji + wordKanji.length + 2) == "ます")
                                    {
                                        wordKanji = wordKanji + "ます";
                                        conjugated = true;
                                    }
                                    else if(runningEntry.substring(indexKanji + wordKanji.length, indexKanji + wordKanji.length + 3) == "ません")
                                    {
                                        wordKanji = wordKanji + "ません";
                                        conjugated = true;
                                    }
                                    if(conjugated)
                                    {
                                        settingEntry = (settingEntry.slice(0, indexKanji) + "<strong style=\"color: rgb(255, 180, 0);\">" + settingEntry.slice(indexKanji, indexKanji + wordKanji.length) + "</strong>" + settingEntry.slice(indexKanji + wordKanji.length));
                                        runningEntry = (runningEntry.slice(0, indexKanji) + "<strong style=\"color: rgb(255, 180, 0);\">" + runningEntry.slice(indexKanji, indexKanji + wordKanji.length) + "</strong>" + runningEntry.slice(indexKanji + wordKanji.length));
                                        for(let i = 0; i < wordKanji.length; i++)
                                        {
                                            replacement = replacement + "X";
                                        }
                                        runningEntry = runningEntry.replace(wordKanji, replacement);
                                        replacement = "";
                                        conjugated = false;
                                    }
                                    else {
                                        console.log("NOT CONJUGATED OR UNRECOGNIZED FORM");
                                        settingEntry = (settingEntry.slice(0, indexKanji) + "<strong style=\"color: rgb(30, 144, 255);\">" + settingEntry.slice(indexKanji, indexKanji + wordKanji.length) + "</strong>" + settingEntry.slice(indexKanji + wordKanji.length));
                                        runningEntry = (runningEntry.slice(0, indexKanji) + "<strong style=\"color: rgb(30, 144, 255);\">" + runningEntry.slice(indexKanji, indexKanji + wordKanji.length) + "</strong>" + runningEntry.slice(indexKanji + wordKanji.length));
                                        for(let i = 0; i < wordKanji.length; i++)
                                        {
                                            replacement = replacement + "X";
                                        }
                                        runningEntry = runningEntry.replace(wordKanji, replacement);
                                        replacement = "";
                                    }
                                }
                            }
                        }
                    }
                    else if(vocabData[key].type2 == "u")
                    {
                        //U-verbs WORK IN PROGRESS
                        index = 1;
                        indexKanji = 1;
                        while(index != -1 || indexKanji != -1)
                        {
                            word = vocabData[key].tango;
                            wordKanji = vocabData[key].kanji;
                            if(wordKanji == null)
                            {
                                wordKanji = "nulldatainvalidkanji";
                            }
                            index = runningEntry.indexOf(word);
                            indexKanji = runningEntry.indexOf(wordKanji);
                            if(index != -1)
                            {
                                settingEntry = (settingEntry.slice(0, index) + "<strong style=\"color: rgb(255, 180, 0);\">" + settingEntry.slice(index, index + word.length) + "</strong>" + settingEntry.slice(index + word.length));
                                runningEntry = (runningEntry.slice(0, index) + "<strong style=\"color: rgb(255, 180, 0);\">" + runningEntry.slice(index, index + word.length) + "</strong>" + runningEntry.slice(index + word.length));
                                for(let i = 0; i < word.length; i++)
                                        {
                                            replacement = replacement + "X";
                                        }
                                runningEntry = runningEntry.replace(word, replacement);
                                replacement = "";
                            }
                            else if(indexKanji != -1)
                            {
                                settingEntry = (settingEntry.slice(0, indexKanji) + "<strong style=\"color: rgb(255, 180, 0);\">" + settingEntry.slice(indexKanji, indexKanji + wordKanji.length) + "</strong>" + settingEntry.slice(indexKanji + wordKanji.length));
                                runningEntry = (runningEntry.slice(0, indexKanji) + "<strong style=\"color: rgb(255, 180, 0);\">" + runningEntry.slice(indexKanji, indexKanji + wordKanji.length) + "</strong>" + runningEntry.slice(indexKanji + wordKanji.length));
                                for(let i = 0; i < wordKanji.length; i++)
                                        {
                                            replacement = replacement + "X";
                                        }
                                runningEntry = runningEntry.replace(wordKanji, replacement);
                                replacement = "";
                            } 
                            else {
                                if(word[word.length-1] == "う")
                                {
                                    word = word.substring(0, word.length-1) + "い";
                                    wordKanji = wordKanji.substring(0, wordKanji.length-1) + "い";
                                }
                                else if(word[word.length-1] == "く")
                                {
                                    word = word.substring(0, word.length-1) + "き";
                                    wordKanji = wordKanji.substring(0, wordKanji.length-1) + "き";
                                }
                                else if(word[word.length-1] == "ぐ")
                                {
                                    word = word.substring(0, word.length-1) + "ぎ";
                                    wordKanji = wordKanji.substring(0, wordKanji.length-1) + "ぎ";
                                }
                                else if(word[word.length-1] == "す")
                                {
                                    word = word.substring(0, word.length-1) + "し";
                                    wordKanji = wordKanji.substring(0, wordKanji.length-1) + "し";
                                }
                                else if(word[word.length-1] == "つ")
                                {
                                    word = word.substring(0, word.length-1) + "ち";
                                    wordKanji = wordKanji.substring(0, wordKanji.length-1) + "ち";
                                }
                                else if(word[word.length-1] == "ぬ")
                                {
                                    word = word.substring(0, word.length-1) + "に";
                                    wordKanji = wordKanji.substring(0, wordKanji.length-1) + "に";
                                }
                                else if(word[word.length-1] == "ぶ")
                                {
                                    word = word.substring(0, word.length-1) + "び";
                                    wordKanji = wordKanji.substring(0, wordKanji.length-1) + "び";
                                }
                                else if(word[word.length-1] == "む")
                                {
                                    word = word.substring(0, word.length-1) + "み";
                                    wordKanji = wordKanji.substring(0, wordKanji.length-1) + "み";
                                }
                                else if(word[word.length-1] == "る")
                                {
                                    word = word.substring(0, word.length-1) + "り";
                                    wordKanji = wordKanji.substring(0, wordKanji.length-1) + "り";
                                }
                                index = runningEntry.indexOf(word);
                                indexKanji = runningEntry.indexOf(wordKanji);
                                if(index != -1)
                                {
                                    if(runningEntry.substring(index + word.length, index + word.length + 2) == "ます")
                                    {
                                        word = word + "ます";
                                        conjugated = true;
                                    }
                                    else if(runningEntry.substring(index + word.length, index + word.length + 3) == "ません")
                                    {
                                        word = word + "ません";
                                        conjugated = true;
                                    }
                                    if(conjugated)
                                    {
                                        settingEntry = (settingEntry.slice(0, index) + "<strong style=\"color: rgb(255, 180, 0);\">" + settingEntry.slice(index, index + word.length) + "</strong>" + settingEntry.slice(index + word.length));
                                        runningEntry = (runningEntry.slice(0, index) + "<strong style=\"color: rgb(255, 180, 0);\">" + runningEntry.slice(index, index + word.length) + "</strong>" + runningEntry.slice(index + word.length));
                                        for(let i = 0; i < word.length; i++)
                                        {
                                            replacement = replacement + "X";
                                        }
                                        runningEntry = runningEntry.replace(word, replacement);
                                        replacement = "";
                                        conjugated = false;
                                    }
                                    else {
                                        console.log("NOT CONJUGATED OR UNRECOGNIZED FORM");
                                        settingEntry = (settingEntry.slice(0, index) + "<strong style=\"color: rgb(30, 144, 255);\">" + settingEntry.slice(index, index + word.length) + "</strong>" + settingEntry.slice(index + word.length));
                                        runningEntry = (runningEntry.slice(0, index) + "<strong style=\"color: rgb(30, 144, 255);\">" + runningEntry.slice(index, index + word.length) + "</strong>" + runningEntry.slice(index + word.length));
                                        for(let i = 0; i < word.length; i++)
                                        {
                                            replacement = replacement + "X";
                                        }
                                        runningEntry = runningEntry.replace(word, replacement);
                                        replacement = ""; 
                                    }
                                    
                                }
                                else if(indexKanji != -1)
                                {
                                    if(runningEntry.substring(indexKanji + wordKanji.length, indexKanji + wordKanji.length + 2) == "ます")
                                    {
                                        wordKanji = wordKanji + "ます";
                                        conjugated = true;
                                    }
                                    else if(runningEntry.substring(indexKanji + wordKanji.length, indexKanji + wordKanji.length + 3) == "ません")
                                    {
                                        wordKanji = wordKanji + "ません";
                                        conjugated = true;
                                    }
                                    if(conjugated)
                                    {
                                        settingEntry = (settingEntry.slice(0, indexKanji) + "<strong style=\"color: rgb(255, 180, 0);\">" + settingEntry.slice(indexKanji, indexKanji + wordKanji.length) + "</strong>" + settingEntry.slice(indexKanji + wordKanji.length));
                                        runningEntry = (runningEntry.slice(0, indexKanji) + "<strong style=\"color: rgb(255, 180, 0);\">" + runningEntry.slice(indexKanji, indexKanji + wordKanji.length) + "</strong>" + runningEntry.slice(indexKanji + wordKanji.length));
                                        for(let i = 0; i < wordKanji.length; i++)
                                        {
                                            replacement = replacement + "X";
                                        }
                                        runningEntry = runningEntry.replace(wordKanji, replacement);
                                        replacement = "";
                                        conjugated = false;
                                    }
                                    else {
                                        console.log("NOT CONJUGATED OR UNRECOGNIZED FORM");
                                        settingEntry = (settingEntry.slice(0, indexKanji) + "<strong style=\"color: rgb(30, 144, 255);\">" + settingEntry.slice(indexKanji, indexKanji + wordKanji.length) + "</strong>" + settingEntry.slice(indexKanji + wordKanji.length));
                                        runningEntry = (runningEntry.slice(0, indexKanji) + "<strong style=\"color: rgb(30, 144, 255);\">" + runningEntry.slice(indexKanji, indexKanji + wordKanji.length) + "</strong>" + runningEntry.slice(indexKanji + wordKanji.length));
                                        for(let i = 0; i < wordKanji.length; i++)
                                        {
                                            replacement = replacement + "X";
                                        }
                                        runningEntry = runningEntry.replace(wordKanji, replacement);
                                        replacement = "";
                                    }
                                }
                            }
                        }
                    }
                    else{
                        //Irregular verbs, bug in lesson 3 as suru and kuru are vocab words. Cannot use other words that include these verbs in them properly.
                        index = 1;
                        indexKanji = 1;
                        while(index != -1 || indexKanji != -1)
                        {
                            word = vocabData[key].tango;
                            wordKanji = vocabData[key].kanji;
                            if(wordKanji == null)
                            {
                                wordKanji = "nulldatainvalidkanji";
                            }
                            index = runningEntry.indexOf(word);
                            indexKanji = runningEntry.indexOf(wordKanji);
                            if(index != -1)
                            {
                                settingEntry = (settingEntry.slice(0, index) + "<strong style=\"color: rgb(255, 180, 0);\">" + settingEntry.slice(index, index + word.length) + "</strong>" + settingEntry.slice(index + word.length));
                                runningEntry = (runningEntry.slice(0, index) + "<strong style=\"color: rgb(255, 180, 0);\">" + runningEntry.slice(index, index + word.length) + "</strong>" + runningEntry.slice(index + word.length));
                                for(let i = 0; i < word.length; i++)
                                        {
                                            replacement = replacement + "X";
                                        }
                                runningEntry = runningEntry.replace(word, replacement);
                                replacement = "";
                            }
                            else if(indexKanji != -1)
                            {
                                settingEntry = (settingEntry.slice(0, indexKanji) + "<strong style=\"color: rgb(255, 180, 0);\">" + settingEntry.slice(indexKanji, indexKanji + wordKanji.length) + "</strong>" + settingEntry.slice(indexKanji + wordKanji.length));
                                runningEntry = (runningEntry.slice(0, indexKanji) + "<strong style=\"color: rgb(255, 180, 0);\">" + runningEntry.slice(indexKanji, indexKanji + wordKanji.length) + "</strong>" + runningEntry.slice(indexKanji + wordKanji.length));
                                for(let i = 0; i < wordKanji.length; i++)
                                        {
                                            replacement = replacement + "X";
                                        }
                                runningEntry = runningEntry.replace(wordKanji, replacement);
                                replacement = "";
                            } 
                            else {
                                if(word.substring(word.length-2) == "する")
                                {
                                    word = word.substring(0, word.length-2) + "し";
                                    wordKanji = wordKanji.substring(0, wordKanji.length-2) + "し";
                                }
                                else if(word.substring(word.length-2) == "くる")
                                {
                                    word = "き";
                                    wordKanji = wordKanji.substring(0, wordKanji.length-1);
                                }
                                index = runningEntry.indexOf(word);
                                indexKanji = runningEntry.indexOf(wordKanji);
                                if(index != -1)
                                {
                                    if(runningEntry.substring(index + word.length, index + word.length + 2) == "ます")
                                    {
                                        word = word + "ます";
                                        conjugated = true;
                                    }
                                    else if(runningEntry.substring(index + word.length, index + word.length + 3) == "ません")
                                    {
                                        word = word + "ません";
                                        conjugated = true;
                                    }
                                    if(conjugated)
                                    {
                                        settingEntry = (settingEntry.slice(0, index) + "<strong style=\"color: rgb(255, 180, 0);\">" + settingEntry.slice(index, index + word.length) + "</strong>" + settingEntry.slice(index + word.length));
                                        runningEntry = (runningEntry.slice(0, index) + "<strong style=\"color: rgb(255, 180, 0);\">" + runningEntry.slice(index, index + word.length) + "</strong>" + runningEntry.slice(index + word.length));
                                        for(let i = 0; i < word.length; i++)
                                        {
                                            replacement = replacement + "X";
                                        }
                                        runningEntry = runningEntry.replace(word, replacement);
                                        replacement = "";
                                        conjugated = false;
                                    }
                                    else {
                                        console.log("NOT CONJUGATED OR UNRECOGNIZED FORM");
                                        settingEntry = (settingEntry.slice(0, index) + "<strong style=\"color: rgb(30, 144, 255);\">" + settingEntry.slice(index, index + word.length) + "</strong>" + settingEntry.slice(index + word.length));
                                        runningEntry = (runningEntry.slice(0, index) + "<strong style=\"color: rgb(30, 144, 255);\">" + runningEntry.slice(index, index + word.length) + "</strong>" + runningEntry.slice(index + word.length));
                                        for(let i = 0; i < word.length; i++)
                                        {
                                            replacement = replacement + "X";
                                        }
                                        runningEntry = runningEntry.replace(word, replacement);
                                        replacement = ""; 
                                    }
                                    
                                }
                                else if(indexKanji != -1)
                                {
                                    if(runningEntry.substring(indexKanji + wordKanji.length, indexKanji + wordKanji.length + 2) == "ます")
                                    {
                                        wordKanji = wordKanji + "ます";
                                        conjugated = true;
                                    }
                                    else if(runningEntry.substring(indexKanji + wordKanji.length, indexKanji + wordKanji.length + 3) == "ません")
                                    {
                                        wordKanji = wordKanji + "ません";
                                        conjugated = true;
                                    }
                                    if(conjugated)
                                    {
                                        settingEntry = (settingEntry.slice(0, indexKanji) + "<strong style=\"color: rgb(255, 180, 0);\">" + settingEntry.slice(indexKanji, indexKanji + wordKanji.length) + "</strong>" + settingEntry.slice(indexKanji + wordKanji.length));
                                        runningEntry = (runningEntry.slice(0, indexKanji) + "<strong style=\"color: rgb(255, 180, 0);\">" + runningEntry.slice(indexKanji, indexKanji + wordKanji.length) + "</strong>" + runningEntry.slice(indexKanji + wordKanji.length));
                                        for(let i = 0; i < wordKanji.length; i++)
                                        {
                                            replacement = replacement + "X";
                                        }
                                        runningEntry = runningEntry.replace(wordKanji, replacement);
                                        replacement = "";
                                        conjugated = false;
                                    }
                                    else {
                                        console.log("NOT CONJUGATED OR UNRECOGNIZED FORM");
                                        settingEntry = (settingEntry.slice(0, indexKanji) + "<strong style=\"color: rgb(30, 144, 255);\">" + settingEntry.slice(indexKanji, indexKanji + wordKanji.length) + "</strong>" + settingEntry.slice(indexKanji + wordKanji.length));
                                        runningEntry = (runningEntry.slice(0, indexKanji) + "<strong style=\"color: rgb(30, 144, 255);\">" + runningEntry.slice(indexKanji, indexKanji + wordKanji.length) + "</strong>" + runningEntry.slice(indexKanji + wordKanji.length));
                                        for(let i = 0; i < wordKanji.length; i++)
                                        {
                                            replacement = replacement + "X";
                                        }
                                        runningEntry = runningEntry.replace(wordKanji, replacement);
                                        replacement = "";
                                    }
                                }
                            }
                        }
                    }
                }
                // else if (vocabData[key].type == "adjective")
                // {
                //     //adjectives
                // }
                else
                {
                    index = 1;
                    indexKanji = 1;
                        index = 1;
                        indexKanji = 1;
                        while(index != -1 || indexKanji != -1)
                        {
                            word = vocabData[key].tango;
                            wordKanji = vocabData[key].kanji;
                            if(wordKanji == null)
                            {
                                wordKanji = "nulldatainvalidkanji";
                            }
                            index = runningEntry.indexOf(word);
                            indexKanji = runningEntry.indexOf(wordKanji);
                            if(index != -1)
                            {
                                settingEntry = (settingEntry.slice(0, index) + "<strong style=\"color: rgb(255, 180, 0);\">" + settingEntry.slice(index, index + word.length) + "</strong>" + settingEntry.slice(index + word.length));
                                runningEntry = (runningEntry.slice(0, index) + "<strong style=\"color: rgb(255, 180, 0);\">" + runningEntry.slice(index, index + word.length) + "</strong>" + runningEntry.slice(index + word.length));
                                for(let i = 0; i < word.length; i++)
                                        {
                                            replacement = replacement + "X";
                                        }
                                runningEntry = runningEntry.replace(word, replacement);
                                replacement = "";
                            }
                            else if(indexKanji != -1)
                            {
                                settingEntry = (settingEntry.slice(0, indexKanji) + "<strong style=\"color: rgb(255, 180, 0);\">" + settingEntry.slice(indexKanji, indexKanji + wordKanji.length) + "</strong>" + settingEntry.slice(indexKanji + wordKanji.length));
                                runningEntry = (runningEntry.slice(0, indexKanji) + "<strong style=\"color: rgb(255, 180, 0);\">" + runningEntry.slice(indexKanji, indexKanji + wordKanji.length) + "</strong>" + runningEntry.slice(indexKanji + wordKanji.length));
                                for(let i = 0; i < wordKanji.length; i++)
                                        {
                                            replacement = replacement + "X";
                                        }
                                runningEntry = runningEntry.replace(wordKanji, replacement);
                                replacement = "";
                            }
                        }
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