import React, { useState } from "react";
import './login.css';

export default props => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        //REMOVE CONSOLE LOGS LATER FOR SECURITY PURPOSES
        console.log("Email:", email);
        console.log("Password:", pass);
        props.onFormSwitch('userHome')
    }

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <label for="email" className="label">Email: </label>
            <input value={email} className="input-field" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Your email" id="email" name="email"/>
            <label for="password" className="label">Password: </label>
            <input value={pass} className="input-field" onChange={(e) => setPass(e.target.value)} type="password" placeholder="Your password" id="password" name="password"/>
            <button type="submit" className="loginButton">Log In</button>
        </form>
    )
}