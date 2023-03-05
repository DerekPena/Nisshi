import React from 'react';

export default props => {
    return(
    <form> 
        <h3> Welcome to Nisshi, a web application designed to enhance your understanding of the Japanese language through journaling and composition assessments. </h3>
        <h6> Click on the login button below to get started!</h6>
        <button onClick={() => props.onFormSwitch('login')}>Login</button>
        <p></p>
        <button onClick={() => props.onFormSwitch('login')}> Don't have an account? Click Here!</button>
    </form>
    );
};