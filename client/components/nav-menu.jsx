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
        className={`side-drawer bg-account ${this.props.show ? 'side-drawer-open' : null}`}>
        <div
          className='exitNavLogin far fa-arrow-alt-circle-right'
          onClick={this.props.drawerOpen}
          style={{ color: 'black', fontSize: '5vh' }} />
        <div
          className='displayContentInNavMenu'
          style={{ height: '100%' }}>
          {this.displayPage()}
        </div>
      </nav>
    );
  }
}

export default NavMenu;
