import React from 'react';
import AppContext from '../lib/context';

class UserLogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.infoInput = this.infoInput.bind(this);
    this.submitUserInformation = this.submitUserInformation.bind(this);
  }

  infoInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitUserInformation(event) {
    event.preventDefault();
    const { email, password } = this.state;
    fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(user => {
        this.context.login(user);
        this.props.closeDrawer();
      })
      .catch(err => console.error(err));
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className='container' style={{ height: '100%', width: '100%' }}>
        <div className='welcomeBackText'> Welcome Back </div>
        <div className='userLogInEmailPassword d-flex flex-column'>
          <form className='d-flex flex-column' onSubmit={this.submitUserInformation}>
            <label>
              Email
              <input name='email' type='text' className='userLogInEmail border' value={email} onChange={this.infoInput} />
            </label>
            <label>
              Password
              <input name='password' type='password' className='userLogInPassword border' value={password} onChange={this.infoInput}/>
            </label>
            <button className='userLogInLogIn mt-4' value='submit'> LOG IN </button>
          </form>
        </div>
        <div className='userLogInBottomContainer mt-2'>
          <div className='userLogInBotText'> Don&apos;t have an account? </div>
          <button
            className='userLogInSignUp'
            onClick={() => this.props.setView('signup')}>
             SIGN UP
          </button>
        </div>
      </div>
    );
  }
}

UserLogIn.contextType = AppContext;

export default UserLogIn;
