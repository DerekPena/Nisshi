import React, { useState } from "react";
import './auth-form.css';

export default props => {
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        //REMOVE CONSOLE LOGS LATER FOR SECURITY PURPOSES
        console.log("Name:", username);
        console.log("Email:", email);
        console.log("Password:", pass);
        props.onFormSwitch('userHome')
    }

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <label for="username" className="label">Name: </label>
            <input value={username} className="input-field" onChange={(e) => setName(e.target.value)} type="username" placeholder="Your Name" id="username" name="username"/>
            <label for="email" className="label">Email: </label>
            <input value={email} className="input-field" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Your email" id="email" name="email"/>
            <label for="password" className="label">Password: </label>
            <input value={pass} className="input-field" onChange={(e) => setPass(e.target.value)} type="password" placeholder="Your password" id="password" name="password"/>
            <div className="radio-button">
                <input type="radio" value="Teacher" name="userType" /> Teacher
                <p></p>
                <input type="radio" value="Student" name="userType" /> Student
            </div>
            <button type="submit" className="button">Sign Up</button>
        </form>
    )
}