

import React, { Component } from 'react'
import './SendMessageForm.css';

class SendMessageForm extends Component {

    constructor () {
        super();

        this.state = {
            message: ""
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }


    onSubmit(e) {
        e.preventDefault();
        fetch("http://localhost:8888/message",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: this.props.token,
                    message: this.state.message
                })
            })
            .then((res) => {
                return res.json();
            })
            .then((data) => {

            })
        this.setState({ messsage: "" });
    }

    handleOnChange(event) {
        this.setState({ message: event.target.value });
    }


    render() {
        return (
            <div className="Container-fluid">
                <form className="row" onSubmit={this.onSubmit}>
                    <div className="col-md">
                        <textarea className="text-box" placeholder="Votre message ici"
                            onChange={this.handleOnChange} required />
                        <button type="submit" className="btn btn-primary send-button"  > Envoyer </button>
                    </div>
                </form>
            </div>
        );
    }

}


export default SendMessageForm;