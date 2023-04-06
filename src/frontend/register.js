import React, { useState } from "react";
import './auth-form.css';

export default props => {
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [userType, setUserType] = useState('Student');

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:5000/register",{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({username, email, pass, userType})
        })
            .then(response => response.json())
            .then(data => {localStorage.setItem("id", data["id"])})
            .catch(error => {console.log("Error: ", error)})
        
        props.onFormSwitch('userHome')
    }

    return (
        <form onSubmit={handleSubmit} className="login-form" method="post" action="http://localhost:5000/users">
            <label for="username" className="label">Name: </label>
            <input value={username} className="input-field" onChange={(e) => setName(e.target.value)} type="username" placeholder="Your Name" id="username" name="username"/>
            
            <label for="email" className="label">Email: </label>
            <input value={email} className="input-field" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Your email" id="email" name="email"/>
            
            <label for="password" className="label">Password: </label>
            <input value={pass} className="input-field" onChange={(e) => setPass(e.target.value)} type="password" placeholder="Your password" id="password" name="password"/>
            
            {/*Need to determine someway to obtain input from radio buttons*/}
            <div className="radio-button">
                {/* <input type="radio" value="Teacher" name="userType" id="Teacher"/> */}
                <input type="radio" value={userType} name="userType" onClick={(e) => setUserType("Teacher")} id="Teacher"/>
                <label for="Teacher">Teacher</label>
                
                <p/>

                {/* <input type="radio" value="Student" name="userType" id="Student" defaultChecked/> */}
                <input type="radio" value={userType} name="userType" onClick={(e) => setUserType("Student")} id="Student" defaultChecked/>
                <label for="Student">Student</label>
            </div>
            <button type="submit" className="button">Sign Up</button>
        </form>
    )
}