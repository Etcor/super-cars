import React from 'react';
import NavMenu from './nav-menu';
import { Link } from 'react-router-dom';
import AppContext from '../lib/context';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerClicked: false
    };
    this.sideBar = this.sideBar.bind(this);
    this.isUserAuthenticated = this.isUserAuthenticated.bind(this);
    this.drawerToggleClickHandler = this.drawerToggleClickHandler.bind(this);
  }

  drawerToggleClickHandler() {
    this.setState(prevState => { return { drawerClicked: !prevState.drawerClicked }; });
  }

  isUserAuthenticated() {
    if (!this.context.user) {
      return this.drawerToggleClickHandler();
    }
    return this.props.history.push('/user');
  }

  sideBar() {
    const { drawerClicked } = this.state;
    return (
      <React.Fragment>
        {drawerClicked ? <div className='backdrop' /> : <div className='d-none' />}
        <NavMenu
          history={this.props.history}
          login={this.props.login}
          drawerOpen={this.drawerToggleClickHandler}
          show={drawerClicked} />
      </React.Fragment>
    );
  }

  render() {
    const displayBackButton = this.props.back ? '' : 'd-none';
    const displayUserButton = this.props.user ? '' : 'd-none';
    return (
      <nav className="navbar fixed-top justify-content-center text-light header">
        <Link to={this.props.linkTo || '/'}>
          <i className={`back-btn fas fa-chevron-left pl-3 ${displayBackButton}`}/>
        </Link>
        <div className="title">
          {this.props.title}
        </div>
        <i
          style = {{ cursor: 'pointer' }}
          onClick={this.isUserAuthenticated}
          className={`account-btn fas fa-user pr-3 ${displayUserButton}`}>
        </i>
        {this.sideBar()}
      </nav>
    );
  }
}

Header.contextType = AppContext;

export default Header;
