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
import UserAccount from './user-account';
import CreateAccount from './create-user-account';
import Reservation from './reservation';
import PastRentals from './past-rentals';
import DetailVideo from './car-video';
import 'react-dates/lib/css/_datepicker.css';

export default class App extends React.Component {
  render() {
    return (
      <div
        className="d-flex flex-column"
        style={{ height: '100vh' }}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/cars" component={CarList}/>
            <Route exact path="/cars/:id" component={Details}/>
            <Route exact path="/cars" component={CarList} />
            <Route exact path="/reservations" component={Reservation} />
            <Route exact path="/car-video" component={DetailVideo} />
            <Route exact path="/user" component={UserAccount}/>
            <Route exact path="/userlogin" component={UserLogIn} />
            <Route exact path="/user/rentals" component={PastRentals}/>
            <Route exact path="/createaccount" component={CreateAccount} />
          </Switch>
        </Router>
      </div>
    );
  }
}
