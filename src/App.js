import React, { Component } from 'react';
import { UserProvider } from './context/UserContext'
import Register from './components/Register/Register';
// import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; // precisa instalar dependencias


export default class App extends Component {
  constructor(props) {
    super(props);
    this.updateUser = this.updateUser.bind(this);
    this.state = {
      user: {},

      updateUser: this.updateUser
    }
  }

  updateUser(user) {
    
    console.log('App.updateUser');
    this.setState({ user })
  }

  render() {
    return (
      <div>
        {console.log('App:this.user:', this.user)}
        <UserProvider value={this.state}>
          <Register></Register>
        </UserProvider>
      </div>
    );
  }
}