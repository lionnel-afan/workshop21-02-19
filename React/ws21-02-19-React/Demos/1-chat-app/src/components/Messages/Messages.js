
import React, { Component } from "react";
import './Message.css';

import SendMessageForm from '../SendMessagesForm/SendMessageForm';



class Message extends Component {
    constructor () {
        super();

        this.state = {
            messages: []
        }

        this.startTimer = this.startTimer.bind(this);
        this.fetchMessages = this.fetchMessages.bind(this);


    }

    startTimer() {
        var intervalId = setInterval(this.fetchMessages, 5000);
        // store intervalId in the state so it can be accessed later:
        this.setState({ intervalId: intervalId });
    }

    componentDidMount() {
        this.startTimer();
    }

    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);
    }


    fetchMessages() {
        if (this.props.token) {
            fetch("http://localhost:8888/message?token=" + this.props.token,
                {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    this.setState({
                        messages: data.messages || data
                    });
                    // if (data && data.status != 500) {
                    //     this.props.onUserConnected(data);
                    // }
                })
        }
    }



    render() {
        return (
            <div>
                {
                    this.props.token ?
                        <div>
                            <ul className="message-list">
                                {
                                    this.state.messages.map((message, i) => {
                                        return (
                                            <li className="text-right" key={i}>
                                                <div className="owner">
                                                    {message.user.Name}
                                                </div>

                                                <div className="message">
                                                    <span> {message.message} </span>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>

                            <SendMessageForm token={this.props.token} username={this.props.username} />
                        </div>

                        :

                        <div>  Please log in first. </div>

                }

            </div>
        );
    }
}



export default Message;