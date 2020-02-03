import React from 'react';
import { Link } from 'react-router-dom';
import Header from './header';

function RentalListItem(props) {
  const date = new Date(props.startDate);
  const availability = props.availability ? 'Available' : 'Unavailable';
  const statusColor = props.availability ? { color: 'green' } : { color: 'red' };
  const buttonState = () => {
    return props.availability
      ? <Link
        to={`/cars/${props.carId}`}
        style={{ width: '15rem', fontSize: '1.1rem' }}
        className="btn btn-sm btn-outline-secondary mx-auto">
          BOOK AGAIN
      </Link>
      : <Link
        to={'/cars'}
        style={{ width: '15rem', fontSize: '1.1rem' }}
        className="btn btn-sm btn-outline-secondary mx-auto">
          AVAILABLE CARS
      </Link>;
  };

  return (
    <div className="card mb-3">
      <img
        src={props.image}
        className="card-img-top"
        style={{ objectFit: 'contain' }}/>
      <div className="d-flex flex-column card-body">
        <div
          style={{ fontSize: '1.5rem' }}
          className="card-title text-center">
          {props.make}
        </div>
        <div
          style={{ fontSize: '1.1rem' }}
          className="card-text text-center">
          <div className="mb-1">
              Date Rented: {date.toLocaleDateString()}
          </div>
          <div className="mb-3">
              Status: <span style={statusColor}>{availability}</span>
          </div>
        </div>
        {
          buttonState()
        }
      </div>
    </div>

  );
}

class PastRentals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rentals: []
    };
  }

  componentDidMount() {
    fetch('/api/rentals')
      .then(res => res.json())
      .then(rentals => this.setState({ rentals }))
      .catch(err => console.error(err));
  }

  displayPastRentals() {
    const { rentals } = this.state;
    return rentals.length === 0
      ? <h5 className="text-center mt-3">No rental history found</h5>
      : rentals.map(car => {
        return <RentalListItem {...car} key={car.carId} />;
      });
  }

  render() {
    return (
      <div
        style={{ height: '100%' }}
        className="container-fluid bg-account pt-3">
        <Header
          back={true}
          title="Past Rentals"
          linkTo={'/user'} />
        <div
          style={{ paddingTop: '45px' }}
          className="d-flex flex-column justify-content-center">
          {this.displayPastRentals()}
        </div>
      </div>
    );
  }
}

export default PastRentals;
