import React, { Component } from 'react';
import logo from './logo.svg';
import './Welcome.css';


class Welcome extends Component {


    render() {
        return (

            <div className="App ">
                <div className="container">
                    Welcome to our application user.
                      Please <a href="/login"> login in here </a>
                </div>
            </div>
        );
    }
}

export default Welcome;