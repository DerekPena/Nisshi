import React, { useState } from "react";
import './auth-form.css';

export default props => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        var usrData;

        fetch("http://localhost:5000/login",{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({email, pass})
        })
            .then(response => response.json())
            .then(data => {localStorage.setItem("id", data["id"])})
            .catch(error => {console.log("Error: ", error)})

        props.onFormSwitch('userHome')
    }

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <label for="email" className="label">Email: </label>
            <input value={email} className="input-field" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Your email" id="email" name="email"/>
            <label for="password" className="label">Password: </label>
            <input value={pass} className="input-field" onChange={(e) => setPass(e.target.value)} type="password" placeholder="Your password" id="password" name="password"/>
            <button type="submit" className="button">Log In</button>
        </form>
    )
}