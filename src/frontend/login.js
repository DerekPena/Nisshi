import React, { useState } from "react";
import './css/auth-form.css';
import onFormSwitch from "./App.js";

export default props => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        fetch("http://localhost:5000/login",{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({email, pass})
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data["error"] === "error"){
                    console.log("Incorrect email or password")
                }

                else {
                    sessionStorage.setItem("id", data["id"])
                    sessionStorage.setItem("name", data["name"])
                    props.onFormSwitch('entry')
                }
            })
            .catch(error => {console.log("Error: ", error)})
    }

    return (
        <form onSubmit={handleLogin} className="login-form">
            <label for="email" className="label">Email: </label>
            <input value={email} className="input-field" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Your email" id="email" name="email"/>
            <label for="password" className="label">Password: </label>
            <input value={pass} className="input-field" onChange={(e) => setPass(e.target.value)} type="password" placeholder="Your password" id="password" name="password"/>
            <button type="submit" className="button">Log In</button>
        </form>
    )
}