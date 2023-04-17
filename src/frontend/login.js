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
                    sessionStorage.setItem("email", data["email"])
                    props.onFormSwitch('entry')
                }
            })
            .catch(error => {console.log("Error: ", error)})
    }

    return (
        <form onSubmit={handleLogin} className="login-form">

            <div id="auth-block">
                <h2 id="header">LOG-IN</h2>
                <row>
                    <input type="email" class="inputEntry input-field" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} name="email"/>
                    <label class="labelEntry" for="email">Email</label>
                </row>

                <div id="divider"></div>
                <row>
                    <input type="password" class="inputEntry input-field" id="password" placeholder="Password" onChange={(e) => setPass(e.target.value)} name="password"/>
                    <label class="labelEntry" for="password">Password</label>
                </row>
                <div id="divider"></div>
                <row>
                    <p onClick={() => props.onFormSwitch('register')} type="submit" id="redirect">I don't have a Nisshi account.</p>
                    <button type="submit" className="btn btn-lg">LOGIN</button>
                </row>
            </div>

            {/* <label for="email" className="label">Email: </label>
            <input value={email} className="input-field" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" id="email" name="email"/>
            <label for="password" className="label">Password: </label>
            <input value={pass} className="input-field" onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" id="password" name="password"/>
            <button type="submit" className="button">Log In</button> */}
        </form>
    )
}