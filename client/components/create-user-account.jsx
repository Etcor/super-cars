/* eslint-disable no-useless-escape */
import React from 'react';

class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      validFirstName: null,
      validLastName: null,
      validEmail: null,
      validPassword: null
    };
    this.inputHandler = this.inputHandler.bind(this);
    this.createUserAccount = this.createUserAccount.bind(this);
  }

  inputHandler(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.firstName !== prevState.firstName) {
      this.validateUserInformation();
    } else if (this.state.lastName !== prevState.lastName) {
      this.validateUserInformation();
    } else if (this.state.email !== prevState.email) {
      this.validateUserInformation();
    } else if (this.state.password !== prevState.password) {
      this.validateUserInformation();
    }
  }

  validateUserInformation() {
    const { firstName, lastName, email, password } = this.state;
    const validateFirstName = RegExp(/^[a-zA-Z ,.'-]{2,32}$/);
    const validateLastName = RegExp(/^[a-zA-Z ,.'-]{2,32}$/);
    const validateEmail = RegExp(/^([a-zA-Z\d\.\-_]{1,64})@([a-z\d-]{1,227})\.([a-z]{2,28})$/);
    const validatePassword = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);

    if (event.target.name === 'firstName') {
      if (!validateFirstName.test(firstName)) {
        this.setState({ validFirstName: false });
      } else {
        this.setState({ validFirstName: true });
      }
    } else if (event.target.name === 'lastName') {
      if (!validateLastName.test(lastName)) {
        this.setState({ validLastName: false });
      } else {
        this.setState({ validLastName: true });
      }
    } else if (event.target.name === 'email') {
      if (!validateEmail.test(email)) {
        this.setState({ validEmail: false });
      } else {
        this.setState({ validEmail: true });
      }
    } else if (event.target.name === 'password') {
      if (!validatePassword.test(password)) {
        this.setState({ validPassword: false });
      } else {
        this.setState({ validPassword: true });
      }
    }
  }

  createUserAccount(event) {
    event.preventDefault();
    const { firstName, lastName, email, password } = this.state;
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ firstName, lastName, email, password })
    })
      .then(() => {
        this.props.setView('login');
      })
      .catch(err => console.error(err));
  }

  render() {
    const { firstName, lastName, email, password, validFirstName, validLastName, validEmail, validPassword } = this.state;
    const red = 'is-invalid';
    const green = 'border-success';
    const checkFirstNameInput = !validFirstName || validFirstName === null ? red : green;
    const checkLastNameInput = !validLastName || validLastName === null ? red : green;
    const checkEmailInput = !validEmail || validEmail === null ? red : green;
    const checkPasswordInput = !validPassword || validPassword === null ? red : green;

    return (
      <div>
        <div className='createAccountUpperText'> Let&apos;s Get Started </div>
        <form
          className='d-flex flex-column form-group mb-2'
          onSubmit={this.createUserAccount}>
          <div className='firstLastContainer d-flex flex-row'>
            <label className='d-flex flex-column mr-1'>
              First Name
              <input
                name='firstName'
                type='text'
                className={`form-control ${checkFirstNameInput} border rounded`}
                value={firstName}
                onChange={this.inputHandler}/>
            </label>
            <label className='d-flex flex-column'>
              Last Name
              <input
                name='lastName'
                type='text'
                className={`form-control ${checkLastNameInput} border rounded`}
                value={lastName}
                onChange={this.inputHandler} />
            </label>
          </div>
          <label className='userCreateEmailContainer d-flex flex-column'>
            Email
            <input
              name='email'
              type='text'
              className={`form-control ${checkEmailInput} border rounded`}
              value={email}
              onChange={this.inputHandler} />
            {!validEmail && email !== '' ? <div className='mx-2' style={{ fontSize: '0.7rem', color: '#AC1E1E' }}> Email must be a valid address <br /> e.g. me@mydomain.com </div> : null }
          </label>
          <label className='userCreatePasswordContainer d-flex flex-column'>
            Password
            <input
              name='password'
              type='password'
              className={`form-control ${checkPasswordInput} border rounded mb-1`}
              value={password}
              onChange={this.inputHandler} />
            {!validPassword && password !== '' ? <div className='mx-2' style={{ fontSize: '0.7rem', color: '#AC1E1E' }}> Password must contain at least: <br/> 1 lowercase and 1 uppercase alphabetical character, <br /> 1 numeric character, <br /> 1 special character, <br /> and must be 8 characters long  </div> : null}
          </label>
          <div className='userCreateText1'> We will never share your data with a third party. </div>
          {validFirstName && validLastName && validEmail && validPassword ? <button className='userCreateSignUp border-success'> SIGN UP </button> : <div className='userCreateSignUp'> SIGN UP </div>}
        </form>
        <div className='userCreateBottomContainer'>
          <div className='userCreateBotText'> Already have an account? </div>
          <div
            className='userCreateLogIn'
            onClick={() => this.props.setView('login', {})}>
              LOG IN
          </div>
        </div>
      </div>
    );
  }
}

export default CreateAccount;
