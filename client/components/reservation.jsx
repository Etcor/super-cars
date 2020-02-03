import React from 'react';
import { Link } from 'react-router-dom';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import moment from 'moment';
import Header from './header';
import 'react-dates/initialize';
import AppContext from '../lib/context';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      carId: '',
      total: '',
      startDate: '',
      endDate: '',
      car: [],
      modal: false,
      fade: true
    };
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.reservationInput = this.reservationInput.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.toggleClickHandler = this.toggleClickHandler.bind(this);
    this.submitReservationInformation = this.submitReservationInformation.bind(this);
  }

  componentDidMount() {
    const { userId } = this.context.user;
    this.setState({ userId });
    this.getCarOverview();
  }

  getCarOverview() {
    const { id } = this.props.match.params;
    fetch(`/api/cars/${id}`)
      .then(res => res.json())
      .then(car => this.setState({ car, carId: car.carId }))
      .catch(err => console.error(err));
  }

  reservationInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitReservationInformation() {
    event.preventDefault();
    const { carId, car, startDate, endDate } = this.state;
    const total = this.calculateDaysLeft(startDate, endDate) * car.rate;
    fetch('/api/rentals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ carId, total, startDate, endDate })
    })
      .then(response => response.json())
      .then(data => this.toggleClickHandler())
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

  toggleClickHandler() {
    this.setState({
      modal: !this.state.modal,
      fade: !this.state.fade
    });
  }

  render() {
    const { userId, carId, startDate, endDate, car, modal, fade } = this.state;
    const { firstName, lastName } = this.context.user;
    const daysLeft = this.calculateDaysLeft(startDate, endDate);
    const hasStartEndDate = startDate && endDate;
    const rate = daysLeft * car.rate;
    return !userId
      ? <div>Loading...</div>
      : <div
        style={{ paddingTop: '2.9em' }}
        className="contain4er bg-list px-0">
        <Header
          title={'Reservation'}
          back={true}
          user={true}
          history={this.props.history}
          linkTo={`/cars/${carId}`}
        />
        <img
          src={car.image}
          className="img-fluid list-img"
          style={{ objectFit: 'cover' }}
        />
        <form
          className="card m-3 card-filter"
          style={{ borderRadius: '.25em' }}
          onSubmit={this.submitreservationInformation}>
          <div className="card-body">
            <h4 className="card-title mb-4">Reserve Car: <br/>{car.make}</h4>
            <div className="row px-0 mb-4">
              <div className="col-6 p-0">
                <label style={{ fontSize: '1.2rem' }}>Start Date:</label>
                <DatePicker
                  popperPlacement='top'
                  selected={this.state.startDate}
                  onChange={this.handleChangeStart}
                  minDate={moment().toDate()}
                  placeholderText="Select a start date"
                />
              </div>
              <div className="col-6 p-0">
                <label style={{ fontSize: '1.2rem' }}>End Date:</label>
                <DatePicker
                  popperPlacement='top-left'
                  selected={this.state.endDate}
                  style={{ borderRadius: '4px' }}
                  onChange={this.handleChangeEnd}
                  minDate={this.state.startDate}
                  placeholderText="Select an end date"
                />
              </div>
            </div>
            <div
              className="mt-2"
              style={{ fontSize: '1.2rem' }}>
              <div className="d-flex row">
                <div className="col-6 px-0">
                  <p className="card-text mb-1">Rate:</p>
                  <p className="card-text mb-1">Number of Days:</p>
                  <p className="card-text mb-1">Total:</p>
                </div>
                <div className="col-6 text-right px-0">
                  <p className="card-text mb-1">${car.rate}/day</p>
                  <p className="card-text mb-1">{daysLeft || 0}</p>
                  <p className="card-text mb-1">${rate || 0}</p>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column align-items-center mt-2" >
              <div
                className="btn-group text-center mb-2">
                <div
                  value="submit"
                  style={hasStartEndDate ? {} : { pointerEvents: 'none' }}
                  className="btn btn-outline-dark"
                  onClick={this.toggleClickHandler}>
                  Reserve Now
                </div>
              </div>
              <p className={hasStartEndDate ? 'd-none' : 'card-text text-center'}>
                Please select a start and end date <br/> before making a reservation
              </p>
            </div>
            <Modal
              isOpen={modal}
              toggle={this.toggleClickHandler}
              fade={fade}
              centered>
              <ModalHeader toggle={this.toggleClickHandler}> Confirm Your Reservation </ModalHeader>
              <ModalBody className="d-flex justify-content-center align-items-center">
                <div className='infoContainer d-flex align-items-center'>
                  <div className='d-flex flex-column'>
                    <div
                      className='d-flex justify-content-center align-items-center'
                      style={{ height: '50px' }}>
                      <h3
                        className='modalCarMake text-center'
                        style={{ height: '40px' }}>{car.make}</h3>
                    </div>
                    <div className='shadow-sm rounded'>
                      <img
                        className="img-fluid"
                        style={{ objectFit: 'cover' }}
                        src={car.image} />
                    </div>
                    <div className='d-flex flex-column justify-content-center text-center mt-4'>
                      <h5>{firstName} {lastName}</h5>
                      <h6>Start Date: {this.state.startDate ? startDate.toLocaleDateString() : 'Please Choose a Date'}</h6>
                      <h6>End Date: {this.state.endDate ? endDate.toLocaleDateString() : 'Please Choose a Date'} </h6>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className='d-flex align-items-center' style={{ borderTop: 'none' }}>
                <h4 className='modalTotal mr-1'>Total: ${rate} </h4>
                <Link
                  to={'/'}
                  className='btn btn-danger'
                  onClick={this.submitReservationInformation}>
                    CONFIRM
                </Link>
              </ModalFooter>
            </Modal>
          </div>
        </form>
      </div>
    ;
  }
}

Reservation.contextType = AppContext;
