import React, { Component } from 'react';
import { UserContext, UserProvider } from './context/UserContext'
import Register from './components/Register/Register';
// import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; // precisa instalar dependencias


export default class App extends Component {
  render() {
    return (
      <div>
        <Register></Register>
      </div>
    );
  }
}