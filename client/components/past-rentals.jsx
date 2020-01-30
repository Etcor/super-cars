import React from 'react';
import Header from './header';

function RentalListItem(props) {
  const date = new Date(props.startDate);
  const availability = props.availability ? 'Available' : 'Unavailable';
  const statusColor = props.availability ? { color: 'green' } : { color: 'red' };
  const buttonState = () => {
    return props.availability
      ? <button
        style={{ width: '100%', fontSize: '.85rem' }}
        onClick={() => props.history.push(`/cars/${props.carId}`)}
        className="btn btn-sm btn-outline-secondary">
        BOOK AGAIN
      </button>
      : <button
        style={{ width: '100%', fontSize: '.85rem' }}
        onClick={() => props.history.push('/cars')}
        className="btn btn-sm btn-outline-secondary">
        AVAILABLE CARS
      </button>;
  };

  return (
    <div className="card p-1 mb-2">
      <div className="row">
        <img src={props.image} className="col-7 px-1" style={{ objectFit: 'contain' }}/>
        <div className="col-5 px-1">
          <div className="p-1 text-center">
            <div className="card-title">
              {props.make}
            </div>
            <div className="card-text">
              Date Rented: {date.toLocaleDateString()}
            </div>
            <div className="card-text">
              Status:
              <p style={statusColor}>
                {availability}
              </p>
            </div>
            {buttonState()}
          </div>
        </div>
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
      ? <h4>No rental history found</h4>
      : rentals.map(car => {
        return <RentalListItem {...car} key={car.carId} history={this.props.history} />;
      });
  }

  render() {
    return (
      <div
        style={{ height: '100%' }}
        className="container bg-account px-0 pt-4">
        <Header
          back={true}
          title="Past Rentals"
          history={this.props.history} />
        <div
          style={{ paddingTop: '45px' }}
          className="container d-flex justify-content-center">
          {this.displayPastRentals()}
        </div>
      </div>
    );
  }
}

export default PastRentals;
