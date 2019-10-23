import React from 'react';
import { UserProvider } from './context/UserContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home     from './components/Home/Home';
import Register from './components/Register/Register';
import Profile  from './components/Register/Profile';
import AdDetail from './components/AdDetail/AdDetail'
import NotFoundPage from './components/404/NotFoundPage'


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.updateUser = this.updateUser.bind(this);
    this.state = {
      user: {},
      updateUser: this.updateUser
    }
  }

  updateUser(user) {
    
    this.setState({ user });
  }

  render() {
    
    return (
      <div>
        <UserProvider value={this.state}>
          <Router>
            <Switch>
              <Route exact path="/register" component={ Register } />
              <Route exact path="/profile" component={ Profile } />
              <Route path='/detail/:id' component={ AdDetail } />
              <Route exact path='/home' component={ Home } />
              <Route exact path='/' component={ Home } />
              <Route path='*' component={ NotFoundPage } />

              <Route component={Register} />
            </Switch>
          </Router>
        </UserProvider>
      </div>
    );
  }
}