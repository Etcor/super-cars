import React from 'react';
import UserLogIn from './user-login';
import CreateAccount from './create-user-account';
import UserLoginSignUpPage from './user-login-signup-page';

class NavMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      view: 'default'
    };
    this.setView = this.setView.bind(this);
    this.displayPage = this.displayPage.bind(this);
  }

  setView(newView) {
    this.setState({ view: newView });
  }

  displayPage() {
    const { view } = this.state;
    if (view === 'default') {
      return (
        <UserLoginSignUpPage
          drawerOpen={this.props.drawerOpen}
          show={this.props.show}
          setView={this.setView} />);
    } else if (view === 'login') {
      return (
        <UserLogIn
          closeDrawer={this.props.drawerOpen}
          login={this.props.login}
          history={this.props.history}
          setView={this.setView} />
      );
    } else if (view === 'signup') {
      return (
        <CreateAccount
          history={this.props.history}
          setView={this.setView} />
      );
    }
  }

  render() {
    return (
      <nav
        className={`${this.props.show ? 'side-drawer' : 'side-drawer hidden'}`}>
        <div
          className='exitNavLogin fas fa-chevron-right'
          onClick={this.props.drawerOpen} />
        <div
          className='displayContentInNavMenu'>
          {this.displayPage()}
        </div>
      </nav>
    );
  }
}

export default NavMenu;
