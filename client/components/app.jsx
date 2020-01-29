import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './home-page';
import CarList from './car-list';
import Details from './car-details';
import UserLogIn from './user-login';
import AppContext from '../lib/context';
import Reservation from './reservation';
import PastRentals from './past-rentals';
import UserAccount from './user-account';
import CreateAccount from './create-user-account';
import DetailVideo from './car-video';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    fetch('/api/auth')
      .then(res => res.json())
      .then(result => this.setState({
        user: result.user,
        isAuthorizing: false
      }))
      .catch(err => console.error(err));
  }

  login(user) {
    this.setState({ user });
  }

  logout(user) {
    this.setState({ user });
  }

  render() {
    if (this.state.isAuthorizing) return null;
    return (
      <div
        className="d-flex flex-column"
        style={{ height: '100vh' }}>
        <AppContext.Provider value={this.state}>
          <Router>
            <Switch>
              <Route
                exact path="/"
                render={props => <Home {...props} login={this.login} />}
              />
              <Route exact path="/cars" component={CarList}/>
              <Route
                exact path="/user"
                render={props => <UserAccount {...props} logout={this.logout}/>}
              />
              <Route exact path="/cars/:id" component={Details}/>
              <Route exact path="/userlogin" component={UserLogIn} />
              <Route exact path="/user/rentals" component={PastRentals}/>
              <Route exact path="/reservations" component={Reservation} />
              <Route exact path="/createaccount" component={CreateAccount} />
              <Route exact path="/car-video/:id" component={DetailVideo}/>
            </Switch>
          </Router>
        </AppContext.Provider>
      </div>
    );
  }
}
