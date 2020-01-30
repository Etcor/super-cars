import React from 'react';
import Header from './header';
import { Link } from 'react-router-dom';
import AppContext from '../lib/context';

class UserAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      verified: ''
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    if (!this.context.user) {
      return this.props.history.push('/');
    }
    const { firstName, lastName, email, verified } = this.context.user;
    this.setState({ firstName, lastName, email, verified });
  }

  verifyUser() {
    const { verified } = this.state;
    return verified
      ? <h5 style={{ paddingBottom: '5em' }}>Verified <i style={{ color: 'green' }} className="fas fa-check"/></h5>
      : <React.Fragment>
        <h5>Add photo Id to get verified <i style={{ color: 'red' }} className="fas fa-times"/></h5>
        <button style={{ width: '250px' }} className="btn btn-outline-dark my-3">UPLOAD</button>
        <div className="pb-5" style={{ width: '70%', textAlign: 'center' }}>
          <p>Verification allows us to approve you for a rental more quickly.</p>
        </div>
      </React.Fragment>;
  }

  logout() {
    fetch('/api/auth', { method: 'DELETE' })
      .then(res => {
        this.context.logout(null);
        return this.props.history.push('/');
      })
      .catch(err => console.error(err));
  }

  render() {
    const { firstName, lastName } = this.state;
    return (
      <div
        style={{ paddingTop: '45px', height: '100vh' }}
        className="container px-0 bg-account">
        <Header title="Your Account" history={this.props.history} back={true}/>
        <div
          style={{ height: '100%' }}
          className="d-flex flex-column align-items-center">
          <h4 className="my-5">Welcome back {firstName}!</h4>
          <i className="fas fa-user fa-7x mb-3"/>
          <h4 className="mb-4">{firstName} {lastName}</h4>
          {this.verifyUser()}
          <Link to={'/user/update'}
            style={{ width: '250px' }}
            className="btn btn-outline-dark mb-3">
              UPDATE ACCOUNT INFO
          </Link>
          <button
            style={{ width: '250px' }}
            onClick={() => this.props.history.push('/user/rentals')}
            className="btn btn-outline-dark mb-3">
              VIEW PAST RENTALS
          </button>
          <button
            style={{ width: '250px' }}
            onClick={this.logout}
            className="btn btn-danger">
              LOGOUT
          </button>
        </div>
      </div>
    );
  }
}

UserAccount.contextType = AppContext;

export default UserAccount;
