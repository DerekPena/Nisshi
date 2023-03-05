import React from 'react';
import './mainhome.css';

export default props => {
    return(
    <form className="mainhome"> 
        <h3> Welcome to Nisshi, a web application designed to enhance your understanding of the Japanese language through journaling and composition assessments. </h3>
        <h6> Click below to get started!</h6>
        <button className="button" onClick={() => props.onFormSwitch('login')}>Login</button>
        <p></p>
        <button className="button" onClick={() => props.onFormSwitch('login')}> Don't have an account? Click Here!</button>
    </form>
    );
};