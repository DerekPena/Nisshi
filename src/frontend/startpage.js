import React from 'react';
import './startpage.css';

export default props => {
    return(
    <form className="start-page"> 
        <h3> Welcome to Nisshi, a web application designed to enhance your understanding of the Japanese language through journaling and composition assessments. </h3>
        <h5> Click below to get started!</h5>
        <button className="button" onClick={() => props.onFormSwitch('login')}>Login</button>
        <p></p>
        <button className="button" onClick={() => props.onFormSwitch('register')}> Don't have an account? Click Here!</button>
    </form>
    );
};