import React, { useState } from "react";
import './css/account.css';

export default props => {
    const [email, setEmail] = useState(sessionStorage.getItem("email"));
    const [pass, setPass] = useState('');
    let id = sessionStorage.getItem("id")

    const handleUpdate = (e) => {
        e.preventDefault();

        fetch("http://localhost:5000/account",{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({id, email, pass})
        })
            .then(response => response.json())

            .catch(error => {console.log("Error: ", error)})
    }

    return(
        <form onSubmit={handleUpdate}>
            <div class="container" id="account-container">
                <div class="row">
                    <h2>Account Information</h2>
                </div>

                <div class="row">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Email</span>
                        </div>
                        <input type="text" class="form-control" placeholder="" aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                </div>

                <div class="row">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Password</span>
                        </div>
                        <input type="text" class="form-control" placeholder="Change Password" aria-label="Password" onChange={(e) => setPass(e.target.value)}/>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                       <button type="submit" class="btn btn-lg">Update</button> 
                    </div>
                </div>
            </div>
        </form>
    )
}