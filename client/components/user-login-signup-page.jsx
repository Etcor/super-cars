import React from 'react';

class UserLoginSignUpPage extends React.Component {
  render() {
    return (
      <>
        <div className='NavBarContainer container'>
          <div className='NavBarUpperText'> Sign in to have access to pricing or book a rental. </div>
          <div className='NavBarMiddleText'> First time? Sign up, and book your Super Car experience today. </div>
        </div>
        <div className='NavBarButtonContainer'>
          <div
            className='logIn my-3'
            onClick={() => this.props.setView('login', {})}>
            LOG IN
          </div>
          <div
            className='signUp'
            onClick={() => this.props.setView('signup', {})}>
            SIGN UP
          </div>
        </div>
        <div className='NavBarLowerText my-2'> We will never share your data with a third party. </div>
      </>
    );
  }
}

export default UserLoginSignUpPage;
