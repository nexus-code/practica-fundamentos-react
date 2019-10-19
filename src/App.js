import React, { Component } from 'react';
import { UserProvider } from './context/UserContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Register from './components/Register/Register';
import Nodepop from './components/Nodepop/Nodepop';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.updateUser = this.updateUser.bind(this);
    this.state = {
      user: {},
      // user: {
      //   name: '',
      //   surname: '',
      //   tags: ''
      // },

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
        <UserProvider value={this.state}>
          <Router>
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path='/home' component={Nodepop} />

              <Route component={Register} />
            </Switch>
          </Router>
        </UserProvider>
      </div>
    );
  }
}