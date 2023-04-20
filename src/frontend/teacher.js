import React, { useEffect, useState } from 'react'

export default props => {
    const [studentList,setStudentList]=useState([])
    let id = sessionStorage.getItem("id")
    let teacherName = sessionStorage.getItem("teacherName")

    useEffect(() => {
        getStudents();
    }, []);

    //Gets a list of the user's journal entries
    function getStudents (){
        fetch("http://localhost:5000/teacher",{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({id})
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setStudentList(data)
            })
            .catch(error => {console.log("Error: ", error)})
    }

    //Loops through list of Journals and creates individual panels with each Journal entry
    const students=studentList.map( 
        student => { return <div key={student.id} className="col">
            <div class="card" id ="entry-card">
                <div class="card-body">
                    <div className="card-title">{student.name}</div>

                    <div class="card-footer">
                        <div class="row">
                            <div class="col-12">
                                <button className="btn" onClick={() => handleView(student.student_id, student.name)}>VIEW</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    })

    //When users click on the view button, they are sent to the student's page with their journal entries
    const handleView = (student_id, student_name) => {       
        sessionStorage.setItem("studentID", student_id)
        sessionStorage.setItem("studentName", student_name)

        props.onFormSwitch('studentEntry')
    }

    return(
        <form className="entry-container">
            <div class="container">
                <div class="row" id="main-container">
                    <div class="col-12">
                        <h2 className="entry-title">{teacherName} Sensei's Students</h2>
                    </div>   

                    {/* <div class="col-3">
                        <button className="btn" onClick={() => handleNew()}>NEW ENTRY</button>
                    </div> */}
                    
                    <div class="row row-cols-1 row-cols-md-3 gy-4 g-4">
                        {students}
                    </div>
                </div>
            </div>
        </form>
    )
}