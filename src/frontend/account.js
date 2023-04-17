import React from "react";
import './css/account.css';

export default props =>
{


    return(
        <form>
            <div class="container" id="account-container">
                <div class="row">
                    <h2>Account Information</h2>
                </div>

                <div class="row">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Email</span>
                        </div>
                        <input type="text" class="form-control" placeholder="" aria-label="Email"/>
                    </div>
                </div>

                <div class="row">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Password</span>
                        </div>
                        <input type="text" class="form-control" placeholder="Change Password" aria-label="Password"/>
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