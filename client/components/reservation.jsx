import React from 'react';
import 'react-dates/initialize';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carId: [],
      user: '',
      startDate: new Date(),
      endDate: new Date(),
      total: ''
    };
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.getCarOverview = this.getCarOverview.bind(this);
    this.getUser = this.getUser.bind(this);
    this.reservationInput = this.reservationInput.bind(this);
    this.submitReservationInformation = this.submitReservationInformation.bind(this);

  }

  componentDidMount() {
    this.getUser();
    this.getCarOverview();
  }

  getCarOverview() {
    // const { id } = this.props.match.params;
    fetch('/api/cars/2')
      .then(res => res.json())
      .then(carId => this.setState({ carId }))
      .catch(err => console.error(err));
  }

  reservationInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitReservationInformation() {
    console.log('this happened');
    event.preventDefault();
    const { carId, total, startDate, endDate } = this.state;

    fetch('/api/rentals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(carId, total, startDate, endDate)
    })
      .then(response => response.json())
      .then(data => { console.log('data: ', data); })
      .catch(err => console.error(err));
  }

  getUser() {
    // const { id } = this.props.match.params;
    fetch('/api/users/13')
      .then(res => res.json())
      .then(user => this.setState({ user }))
      .catch(err => console.error(err));
  }

  handleChangeStart(date) {
    this.setState(
      {
        startDate: date
      },
      () => this.calculateDaysLeft()
    );
  }

  handleChangeEnd(date) {
    this.setState(
      {
        endDate: date
      },
      () => this.calculateDaysLeft()
    );
  }

  calculateDaysLeft(startDate, endDate) {
    if (!moment.isMoment(startDate)) startDate = moment(startDate);
    if (!moment.isMoment(endDate)) endDate = moment(endDate);

    return endDate.diff(startDate, 'days');
  }

  render() {
    const { carId, total, startDate, endDate, user } = this.state;
    const daysLeft = this.calculateDaysLeft(startDate, endDate);
    const rate = daysLeft * carId.rate;
    return !user
      ? <div>Loading...</div>
      : <div className="container bg-list">
        <div className="row text-white bg-dark mt-5">
          <h6
            className="reservation-opener text-center col-12"
            style= {{ color: 'white' }}>
           Book Your Reservation, {user.firstName}!
          </h6>
        </div>
        <form className="date-form" onSubmit={this.submitreservationInformation}>
          <div className="date-row"> Choose Your Date!</div>
          <div className="date-pickers col">
            <div>
              <b>Start Date</b>:
              <DatePicker

                selected={this.state.startDate}
                onChange={this.handleChangeStart}
                minDate={moment().toDate()}
                placeholderText="Select a day"
              />
            </div>
            &nbsp;&nbsp;&nbsp;
            <div>
              <b>End Date</b>:
              <DatePicker
                selected={this.state.endDate}
                onChange={this.handleChangeEnd}
                minDate={moment().toDate()}
                placeholderText="Select a day"
              />
            </div>
          </div>
          <div className="rectangle">
            <h4 className="vehicle-overview text-center ">Vehicle Overview</h4>
            <div className="vehicle">
              <img src={carId.image} className="img-fluid"
                style={{
                  objectFit: 'cover'
                }} />
            </div>
            <h6 className= "vehicle-name text-center" value={carId} onChange={this.reservationInput}>{carId.make}</h6>
            <h4 className= "rates">Rates</h4>
            <h6 className="rates-per-day">${carId.rate}/day</h6>
            <h6 className="estimated-days" value={total} onChange={this.reservationInput}>Number of day(s):{daysLeft}</h6>
            <h6 className="estimated-rates" value={total} onChange={this.reservationInput}>Total: ${rate}</h6>
          </div>
          <div className="col-md-4 text-center fixed-bottom mb-5">
            <div className="btn btn-secondary btn-sm" value="submit" onClick={this.submitReservationInformation}>Reserve Now</div>
          </div>
        </form>
      </div>
    ;
  }
}
