import React from 'react';

class UserLoginSignUpPage extends React.Component {
  render() {
    return (
      <>
        <div className='NavBarContainer container'>
          <div className='NavBarUpperText'> Sign in to access your account or to book a rental. </div>
          <div className='NavBarMiddleText'> First time? Sign up, and book your Super Car experience today. </div>
        </div>
        <div className='NavBarButtonContainer'>
          <div
            className='logIn my-2'
            onClick={() => this.props.setView('login', {})}>
            LOG IN
          </div>
          <div
            className='signUp mt-1'
            onClick={() => this.props.setView('signup', {})}>
            SIGN UP
          </div>
        </div>
        <div className='NavBarLowerText text-muted my-2'> We will never share your data <br></br>with a third party. </div>
      </>
    );
  }
}

export default UserLoginSignUpPage;
