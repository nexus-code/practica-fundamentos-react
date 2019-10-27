import React from 'react';
import { UserProvider } from './context/UserContext';
import ErrorBoundary    from '../src/ErrorBoundary/ErrorBoundary';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home      from './components/Home/Home';
import Search    from './components/Search/Search';
import Register  from './components/Register/Register';
import Profile   from './components/Register/Profile'; 
import AdEdit    from './components/AdEdit/AdEdit';
import AdDetail  from './components/AdDetail/AdDetail';
import NotFoundPage from './components/404/NotFoundPage';


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
          <ErrorBoundary>
              <Router>
                <Switch>
                  <Route exact path="/register" component={ Register } />
                  <Route exact path="/profile" component={ Profile } />
                  <Route path='/advert/create' component={ AdEdit } />
                  <Route path='/advert/edit/:id' component={ AdEdit } />
                  <Route path='/advert/:id' component={ AdDetail } />
                  <Route path='/advert/' component={ Search } />
                  <Route exact path='/home' component={ Home } />
                  <Route exact path='/' component={ Home } />
                  <Route path='*' component={ NotFoundPage } />

                  <Route component={Register} />
                </Switch>
              </Router>
          </ErrorBoundary>
        </UserProvider>
      </div>
    );
  }
}