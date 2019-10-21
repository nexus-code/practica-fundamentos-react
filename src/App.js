import React, { Component } from 'react';
import { UserProvider } from './context/UserContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Register from './components/Register/Register';
import Nodepop from './components/Nodepop/Nodepop';
import Profile from './components/Register/Profile';


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
    this.setState({ user });
    console.log('App this.state', this.state);

  }

  render() {
    console.log('init', this.state);
    return (
      <div>
        <UserProvider value={this.state}>
          <Router>
            <Switch>
              <Route exact path="/register" component={ Register } />
              <Route exact path="/profile" component={ Profile } />
              <Route exact path='/home' component={ Nodepop } />

              <Route component={Register} />
            </Switch>
          </Router>
        </UserProvider>
      </div>
    );
  }
}