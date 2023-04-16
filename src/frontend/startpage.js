import React from 'react';
import './css/startpage.css';

export default props => {
    return(
    <form className="start-page flex-wrap">
        <div class="row" id="first-section">
            <div class="col-sm-8" id="sidetext">
                <h2 id="text1">こんにちは!</h2>
                <h3 id="text2">Your journal, your journey.</h3>
                <h5 id="text3">Write at your own pace. Look back on your growth.</h5>
                
                <p></p>
                <div id="button-group">
                    <button id="login" onClick={() => props.onFormSwitch('login')} type="submit" class="btn btn-primary"><span>Log-in</span></button>
                    <button id="register" onClick={() => props.onFormSwitch('register')} type="submit" class="btn btn-primary"><span>New Account</span></button>
                </div>
            </div>

            <div class="col-sm-4">
                <img id="graphic" src="images/phanapy_image.png"></img>
            </div>
        </div>

        {/* TODO: Fix scaling overlap of second section when screen size decreases. */}
        <div class="row flex-wrap" id="second-section">
            <div class="col-sm-6" id="left-row">
                <img id="figma" src="images/figma1.png"></img>   
            </div>
            <div class="col-sm-6" id="sidetext">
                <div class="row">
                    <h5 id="text4" class="col-sm-12">Designed for UF Japanese-learning students to practice journaling skills.</h5>
                </div>

                <div class="row" id="bullet">
                    <ul class="col">
                        <li>Review vocabulary terms from actual lessons</li>
                        <li>Save and edit your entries</li>
                        <li>Share with others and educators</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="row" id="third-section">
            <div id="team">
                <h5 id="text5">Meet the Nisshi Team</h5>
            </div>

            <div class="row row-cols-1 row-cols-md-4 g-4">
                <div class="col">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title" id="sano"><span>Ryosuke Sano</span></h3>
                            <img id="card-icon" src="images/sano1.png"></img>
                            <p id="card-text">Project Nisshi advisor.</p>
                            <p id="card-text">Japanese language instructor for beginning to advanced levels at the University of Florida.</p>
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title" id="darian"><span>Darian Cheung</span></h3>
                            <img id="card-icon" src="images/darian.png"></img>
                            <p id="card-text">Mid-lane hypercarry.</p>
                            <p id="card-text"> UF Computer Science major, Asian language learning enthusiast.</p>
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title" id="derek"><span>Derek Pena</span></h3>
                            <img id="card-icon" src="images/gamer.png"></img>
                            <p id="card-text">Hunter master-race, Genji OTP.</p>
                            <p id="card-text"> UF Computer Science major, past Japanese-learning student.</p>
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title" id="tiff"><span>Tiffany Wu</span></h3>
                            <img id="card-icon" src="images/tiff.png"></img>
                            <p id="card-text">Sometimes archer & artist.</p>
                            <p id="card-text"> UF Computer Science major, past Chinese + Japanese-learning student.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        {/* <button className="button" onClick={() => props.onFormSwitch('login')}>Login</button>
        <p></p>
        <button className="button" onClick={() => props.onFormSwitch('register')}> Don't have an account? Click Here!</button> */}
    </form>
    );
};