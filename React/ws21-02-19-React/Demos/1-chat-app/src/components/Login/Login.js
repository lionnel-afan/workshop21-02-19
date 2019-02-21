import React, { Component } from 'react';

import "./Login.css"

class Login extends Component {

    constructor () {
        super();

        this.state = {
            username: "lionnel",
            name: "Lionnel Afangbedjee"
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    onFormSubmit(e) {
        e.preventDefault();
        fetch("http://localhost:7777/api/login",
            {
                method: "POST",
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data && data.status != 500) {
                    this.props.onUserConnected(data);
                }
            })
    }


    render() {
        return (
            <div className="login-wrapper container"
                style={{ 'maxWidth': '400px' }}>
                {
                    this.props.currentUser.token ?
                        <div >
                            Your are now Connected.
                         <small className="form-text text-muted">Token : {this.props.currentUser.token} </small>
                            <small className="form-text text-muted">Other connected users are: </small>
                            <br />
                            <ul>
                                {
                                    this.props.currentUser.users.map(user => {
                                        return (
                                            <div key={user.Username}>
                                                < b> {user.Username}</b>
                                                <small className="form-text text-muted">{user.Name} </small>
                                            </div>
                                        )
                                    })
                                }
                            </ul>
                        </div>

                        :

                        <form onSubmit={this.onFormSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text"
                                    className="form-control"
                                    id="username"
                                    aria-describedby="emailHelp"
                                    placeholder="Your username"
                                    value={this.state.username}
                                    onChange={this.handleUsernameChange} required />
                                <small id="usernameHelp" className="form-text text-muted">You are going to share your username with people.</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Your name"
                                    value={this.state.name}
                                    onChange={this.handleNameChange} required />
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form >

                }

            </div >
        );
    }

}

export default Login;