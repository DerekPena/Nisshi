import React, { useState } from "react";
import './css/auth-form.css';

export default props => {
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [userType, setUserType] = useState('Student');

    const handleRegister = (e) => {
        e.preventDefault();

        fetch("http://localhost:5000/register",{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({username, email, pass, userType})
        })
            .then(response => response.json())
            .then(data => {
                sessionStorage.setItem("id", data["id"])
                sessionStorage.setItem("email", data["email"])

                if(data["is_Student"]){
                    sessionStorage.setItem("studentName", data["name"])
                    sessionStorage.setItem("userType", "Student")
                    props.onFormSwitch('entry')
                }
                else{
                    sessionStorage.setItem("teacherName", data["name"])
                    sessionStorage.setItem("userType", "Teacher")
                    props.onFormSwitch('teacher')
                }
            })
            .catch(error => {console.log("Error: ", error)})
    }

    return (
        <form onSubmit={handleRegister} className="login-form">

            <div class="container" id="auth-block">
                <h2 id="header">REGISTER</h2>
                <row>
                    <input type="username" class="inputEntry input-field" id="username" placeholder="Name" onChange={(e) => setName(e.target.value)} name="username"/>
                    <label class="labelEntry" for="username">Name</label>
                </row>

                <div id="divider"></div>

                <row>
                    <input type="email" class="inputEntry input-field" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} name="email"/>
                    <label class="labelEntry" for="email">Email</label>
                </row>

                <div id="divider"></div>
                <row>
                    <input type="password" class="inputEntry input-field" id="password" placeholder="Password" onChange={(e) => setPass(e.target.value)} name="password"/>
                    <label class="labelEntry" for="password">Password</label>
                </row>

                <row id="radioUser">
                    <div class="row">
                        <div class="col-6 custom-control custom-radio custom-control-inline">
                            <input type="radio" onClick={(e) => setUserType("Student")} id="student" name="userType" class="custom-control-input"/>
                            <label class="custom-control-label" for="student">Student | 学生</label>
                        </div>

                        <div class="col-6 custom-control custom-radio custom-control-inline">
                            <input type="radio" onClick={(e) => setUserType("Teacher")} id="teacher" name="userType" class="custom-control-input"/>
                            <label class="custom-control-label" for="teacher">Teacher | 先生</label>
                        </div>
                    </div>
                </row>

                <row>
                    <p onClick={() => props.onFormSwitch('login')} type="submit" id="redirect">I do have a Nisshi account.</p>
                    <button type="submit" className="btn btn-lg">SIGN UP</button>
                </row>
            </div>

            {/* <label for="username" className="label">Name: </label>
            <input value={username} className="input-field" onChange={(e) => setName(e.target.value)} type="username" placeholder="Your Name" id="username" name="username"/>
            
            <label for="email" className="label">Email: </label>
            <input value={email} className="input-field" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Your email" id="email" name="email"/>
            
            <label for="password" className="label">Password: </label>
            <input value={pass} className="input-field" onChange={(e) => setPass(e.target.value)} type="password" placeholder="Your password" id="password" name="password"/> 
            
            
            */}
            
            {/*Need to determine someway to obtain input from radio buttons*/}
            
        </form>
    )
}