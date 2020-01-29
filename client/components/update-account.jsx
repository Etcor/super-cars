import React from 'react';
// import Header from './header';

class UpdateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'Tim',
      lastName: 'Davis',
      email: 'timdavis@lfz.com'
    };
    this.infoInput = this.infoInput.bind(this);
  }

  infoInput() {
    this.setState({ [event.target.name]: event.target.value });
  }

  emptySubmitHandler() {
    <></>;
  }

  render() {
    const { firstName, lastName, email } = this.state;
    return (
      <div className='container'>
        {/* <Header title='Update Account'/> */}
        <div
          className='d-flex flex-column justify-content-center align-items-center'
          style={{ height: '27vh' }}>
          <h4>{firstName} {lastName}</h4>
          <i className="fas fa-user fa-7x mt-2"></i>
        </div>
        <div className='updateAccountContainer'>

          <form className='d-flex flex-column px-3 justify-content-center' onSubmit={this.emptySubmitHandler}>
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
              className=''
              style={{ width: '80%', height: '5vh', background: 'transparent', border: '1px solid black', backgroundColor: 'red', color: 'white' }}>
              UPDATE
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateAccount;
