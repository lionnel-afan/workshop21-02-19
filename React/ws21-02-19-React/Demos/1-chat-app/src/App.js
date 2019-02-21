import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import {

  Route,
  BrowserRouter,
  Link
} from 'react-router-dom';


import './App.css';


import Login from "./components/Login/Login";
import Messages from './components/Messages/Messages';
import { timingSafeEqual } from 'crypto';




const Header = () => (
  <ul className="header-links">
    <li>
      <Link to="/">Login</Link>
    </li>
    <li>
      <Link to="/messages">Messages</Link>
    </li>
  </ul>
);




const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }} />
  );
}




class App extends Component {

  constructor () {
    super();

    this.state = {
      messages: [
        {
          "user": {
            "Username": "lionnel",
            "Name": "Lionnel Afangbedjee",
            "IsActive": 1,
            "IP": "127.0.0.1"
          },
          "message": "Hello les amis"
        },
        {
          "user": {
            "Username": "lionnel",
            "Name": "Lionnel Afangbedjee",
            "IsActive": 1,
            "IP": "127.0.0.1"
          },
          "message": "Start using it...long long text comes here..."
        }
      ]
    }

    this.state.currentUser = {
      username: "lionnel",
      name: "Lionnel Afangbedjee"
    };
    this.state.onUserConnected = this.onUserConnected.bind(this);

  }



  onUserConnected(data) {
    console.log("Submit ", data)
    this.setState({ currentUser: data });
  }

  render() {
    return (
      // <div> HElllo </div>
      <BrowserRouter>
        <div className="app-content">
          <Header />
          <div>
            <PropsRoute exact path="/"
              component={Login}
              currentUser={this.state.currentUser}
              onUserConnected={this.state.onUserConnected}
            />

            <PropsRoute path="/messages"
              component={Messages}
              token={this.state.currentUser.token}
              username={this.state.currentUser.username} />
          </div>
        </div>
      </BrowserRouter >
    );
  }
}

export default App;
