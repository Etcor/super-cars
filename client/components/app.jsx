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
import 'react-dates/lib/css/_datepicker.css';
import UserAccount from './user-account';
import CreateAccount from './create-user-account';
import DetailVideo from './car-video';
import UpdateAccount from './update-account';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true
    };
    this.getUserInfo = this.getUserInfo.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
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

  // componentDidUpdate() {
  //   this.getUserInfo();
  // }

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
              <Route
                exact path="/user"
                render={props => <UserAccount {...props} logout={this.logout}/>}
              />
              <Route
                exact path="/user/updateaccount"
                render={props => <UpdateAccount {...props} />}
              />
              <Route exact path="/cars" component={CarList} />
              <Route exact path="/cars/:id" component={Details} />
              <Route
                exact path="/cars/reservations/:id"
                render={props => <Reservation {...props} />}
              />
              <Route exact path="/userlogin" component={UserLogIn} />
              <Route exact path="/user/rentals" component={PastRentals}/>
              <Route exact path="/createaccount" component={CreateAccount} />
              <Route exact path="/car-video/:id" component={DetailVideo} />
            </Switch>
          </Router>
        </AppContext.Provider>
      </div>
    );
  }
}
