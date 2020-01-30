import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './home-page';
import CarList from './car-list';
import CarDetails from './car-details';
import DetailVideo from './car-video';
import AppContext from '../lib/context';
import Reservation from './reservation';
import PastRentals from './past-rentals';
import UserAccount from './user-account';
import UpdateAccount from './update-account';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo() {
    fetch('/api/auth')
      .then(res => res.json())
      .then(result =>
        this.setState({
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
    const context = {
      user: this.state.user,
      login: this.login,
      logout: this.logout
    };
    if (this.state.isAuthorizing) return null;
    return (
      <div
        className="d-flex flex-column"
        style={{ height: '100vh' }}>
        <AppContext.Provider value={context}>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/cars" component={CarList} />
              <Route exact path="/cars/:id" component={CarDetails} />
              <Route exact path="/cars/video/:id" component={DetailVideo} />
              <Route exact path="/cars/reservations/:id" component={Reservation} />
              <Route exact path="/user" component={UserAccount} />
              <Route exact path="/user/update" component={UpdateAccount} />
              <Route exact path="/user/rentals" component={PastRentals}/>
            </Switch>
          </Router>
        </AppContext.Provider>
      </div>
    );
  }
}
