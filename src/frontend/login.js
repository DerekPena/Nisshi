import React, { useState } from "react";

export default props => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <form>
            <label for="email">Email: </label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Your email" id="email" name="email"/>
            <label for="password">Password: </label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Your password" id="password" name="password"/>
            <button>Log In</button>
        </form>
    )
}