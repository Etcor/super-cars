import React from 'react';
import Header from './header';
import AppContext from '../lib/context';

class UpdateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      firstName: '',
      lastName: '',
      email: ''
    };
    this.infoInput = this.infoInput.bind(this);
    this.updateSubmitHandler = this.updateSubmitHandler.bind(this);
  }

  componentDidMount() {
    const { userId, firstName, lastName, email } = this.context.user;
    this.setState({ userId, firstName, lastName, email });
  }

  infoInput() {
    this.setState({ [event.target.name]: event.target.value });
  }

  updateSubmitHandler() {
    event.preventDefault();
    const { userId, firstName, lastName, email } = this.state;
    fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ firstName, lastName, email })
    })
      .then(res => res.json())
      .then(user => {
        this.context.login(user);
        return this.props.history.push('/user');
      })
      .catch(err => console.error(err));
  }

  render() {
    const { firstName, lastName, email, updateButtonClicked } = this.state;
    return (
      <div className='container bg-account'>
        <Header title='Update Account' linkTo={'/user'} back={true}/>
        <div
          className='d-flex flex-column justify-content-center align-items-center'
          style={{ height: '275px', paddingTop: '40px' }}>
          <h4>{firstName} {lastName}</h4>
          <i className="fas fa-user fa-7x mt-2"></i>
        </div>
        <div className='updateAccountContainer'>

          <form className='d-flex flex-column px-3 justify-content-center' onSubmit={this.updateSubmitHandler}>
            <label className='text-muted'>
              First Name
              <input
                className='border my-1'
                style={{ width: '100%', borderRadius: '4px' }}
                name='firstName' type='text'
                value={firstName}
                onChange={this.infoInput}/>
            </label>
            <label className='text-muted'>
              Last Name
              <input
                className='border my-1'
                style={{ width: '100%', borderRadius: '4px' }}
                name='lastName' type='text'
                value={lastName}
                onChange={this.infoInput} />
            </label>
            <label className='text-muted'>
              Email
              <input
                className='border my-1'
                style={{ width: '100%', borderRadius: '4px' }}
                name='email' type='text'
                value={email}
                onChange={this.infoInput} />
            </label>
          </form>
          <div
            className='d-flex justify-content-center align-items-center mx-3'
            style={{ height: '30vh' }}>
            <button
              className='btn btn-danger'
              onClick={this.updateSubmitHandler}
              value='submit'
              style={{ width: '250px' }}>
              {updateButtonClicked ? 'INFORMATION UPDATED' : 'UPDATE'}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

UpdateAccount.contextType = AppContext;
export default UpdateAccount;
