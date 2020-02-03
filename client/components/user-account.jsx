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
      verified: '',
      photo: ''
    };
    this.logout = this.logout.bind(this);
    this.onUploadSubmit = this.onUploadSubmit.bind(this);
    this.onUploadChange = this.onUploadChange.bind(this);
    this.verification = this.verification.bind(this);
  }

  componentDidMount() {
    if (!this.context.user) {
      return this.props.history.push('/');
    }
    this.verification();
  }

  verification() {
    const { firstName, lastName, email, verified, photo } = this.context.user;
    this.setState({ firstName, lastName, email, verified, photo });
  }

  verifyUser() {
    const { verified, photo } = this.state;
    return verified
      ? <h5 >Verified <i style={{ color: 'green' }} className="fas fa-check"/></h5>
      : <React.Fragment>
        <h5>Add photo Id to get verified <i style={{ color: 'red' }} className="fas fa-times"/></h5>
        <form onSubmit={this.onUploadSubmit} className='d-flex flex-column'>
          <input
            name='userPhoto'
            type='file'
            onChange={this.onUploadChange}
            style={{ width: '250px', marginBottom: '5px' }}
            className="btn btn-link border border-dark">
          </input>
          <div className='d-flex justify-content-center' style={{ padding: '0 2.5rem' }}>
            {!photo ? null : <button className='btn btn-danger' type='submit'> SUBMIT </button>}
          </div>
        </form>
        <div className=" d-flex justify-content-center " style={{ width: '70%', height: '100px', textAlign: 'center' }}>
          <p className='d-flex align-items-center m-0'>Verification allows us to approve you for a rental more quickly.</p>
        </div>
      </React.Fragment>;
  }

  onUploadSubmit(event) {
    event.preventDefault();

    const uploadingPhoto = new FormData();
    uploadingPhoto.append('userPhoto', this.state.photo);

    fetch('/api/upload-image', {
      method: 'PUT',
      body: uploadingPhoto
    })
      .then(res => res.json())
      .then(data => {
        this.context.login(data);
        this.verification();
      })
      .catch(err => console.error(err));
  }

  onUploadChange(event) {
    this.setState({ photo: event.target.files[0] });
  }

  logout() {
    fetch('/api/auth', { method: 'DELETE' })
      .then(res => {
        this.context.logout(null);
        return this.props.history.push('/');
      })
      .catch(err => console.error(err));
  }

  toggleUserPhoto() {
    const { photo } = this.state;
    return typeof photo === 'object' || !photo ? <i className="fas fa-user fa-7x mb-3" /> : <img className='userImage' src={`${photo}`} />;
  }

  render() {
    const { firstName, lastName } = this.state;
    return (
      <div
        style={{ paddingTop: '45px', height: '100vh' }}
        className="container px-0 bg-account">
        <Header
          back={true}
          title="Your Account"
          history={this.props.history}
        />
        <div
          style={{ height: '100%' }}
          className="d-flex flex-column align-items-center">
          <h4 className="my-4">
            Welcome back {firstName}!
          </h4>
          {this.toggleUserPhoto()}
          <h4 className="mb-4">
            {firstName} {lastName}
          </h4>
          {this.verifyUser()}
          <Link
            to={'/user/update'}
            style={{ width: '250px' }}
            className="btn btn-outline-dark mb-3 mt-3">
              UPDATE ACCOUNT INFO
          </Link>
          <Link
            to={'/user/rentals'}
            style={{ width: '250px' }}
            className="btn btn-outline-dark mb-3">
              VIEW PAST RENTALS
          </Link>
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
