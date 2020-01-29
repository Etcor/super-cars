import React from 'react';
export default class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      car: null,
      user: null,
      isBooked: false,
      isLocationSame: false
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    // const { id } = this.props.match.params;
    fetch('/api/users/13')
      .then(res => res.json())
      .then(user => this.setState({ user }))
      .catch(err => console.error(err));
  }

  render() {
    const { user } = this.state;
    return !user
      ? <div>Loading...</div>
      : <div className="container">
        <div className="row text-white bg-dark mt-5">
          <h6
            className="reservation-opener text-center col-12"
            style= {{ color: 'white' }}>
           Book Your Reservation, {user.firstName}!
          </h6>
        </div>
        <form className="form-inline">
          <div className="form-check mb-2 mr-sm-2">
            <input className="form-check-input" type="checkbox" id="inlineFormCheck"></input>
            <label className="form-check-label" htmlFor="inlineFormCheck">
              Drop-off location is the same
            </label>
          </div>
          <div className="form-row">
            <div className="col">
              <div className="input-group-prepend">
                <div className="input-group-text fas fa-search-location"></div>
                <input type="text" className="form-control" placeholder="Pick-up Location"></input>
              </div>
            </div>
            <div className="col">
              <div className="input-group-prepend">
                <div className="input-group-text fas fa-search-location"></div>
                <input type="text" className="form-control" placeholder="Drop-off Location"></input>
              </div>
            </div>
          </div>

          <div className="form-row mt-3">
            <div className="col">
              <div className="input-group-prepend">
                <div className="input-group-text fas fa-calendar-alt"></div>
                <input type="text" className="form-control" placeholder="Pick-up Date"></input>
              </div>
            </div>
            <div className="col">
              <div className="input-group-prepend">
                <div className="input-group-text fas fa-calendar-alt"></div>
                <input type="text" className="form-control" placeholder="Drop-off Date"></input>
              </div>
            </div>
          </div>
        </form>
        <div className="rectangle">
          <h4 className="vehicle-overview text-center mt-5">Vehicle Overview</h4>
          <div className="vehicle">{this.props.image}</div>
        </div>
        <div className="col-md-4 text-center fixed-bottom mb-5">
          <button type="button" className="btn btn-secondary btn-sm">Reserve Now</button>
        </div>
      </div>
    ;
  }
}
