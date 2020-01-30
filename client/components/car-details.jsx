import React from 'react';
import { Link } from 'react-router-dom';
import Header from './header';

class Details1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { car: null };
    this.getDetails = this.getDetails.bind(this);
  }

  componentDidMount() {
    this.getDetails();
  }

  getDetails() {
    const { id } = this.props.match.params;
    fetch(`/api/cars/${id}`)
      .then(res => res.json())
      .then(car => this.setState({ car }))
      .catch(err => console.error(err));
  }

  render() {
    const { car } = this.state;
    return !car
      ? <div>Loading...</div>
      : <div style={{ paddingTop: '3.8em' }} className="container bg-list">
        <Header
          history={this.props.history}
          title={this.state.car.make}
          back={true} user={true}
          linkTo={'/cars'}/>
        <div className="card">
          <img src={car.image} className="card-img-top"
            style={{ objectFit: 'cover' }} />
        </div>
        <div className="card card-filter">
          <div className="card-body">
            <div className="text-justify">
              <p> {car.shortDescription} </p>
            </div>
            <div className="card-text">
              Top Speed: {car.topSpeed} mph
            </div>
            <div className="card-text">
              Horse Power: {car.horsePower} BHP
            </div>
            <div className="card-text">
              Rate: ${car.rate} / day
            </div>
            <div className="d-flex flex-column align-items-center mt-5" >
              <div
                className="btn-group text-center">
                <button type="button" className="btn btn-outline-secondary"><Link to="/cars" style={{ color: 'inherit' }}>Back</Link></button>
                <Link to={`/cars/reservations/${car.carId}`}>
                  <button type="button" className="btn btn-outline-secondary">Book Now</button>
                </Link>
                <button type="button" className="btn btn-outline-secondary"><Link to={`/cars/video/${car.carId}`} style={{ color: 'inherit' }}>Video</Link></button>
              </div>
            </div>
          </div>
        </div>
      </div>;
  }
}

export default Details1;
