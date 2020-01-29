import React from 'react';
import { Link } from 'react-router-dom';

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
      : <div className="container ">
        <div className="card p-2">
          <h1 className="jumbotron-fluid text-center bg-white font-weight-bold font-italic">
            {car.make}
          </h1>
          <div className="opaque">
            <img src={car.image} className="img-fluid"
              style={{
                objectFit: 'cover'
                // height: '15em'
              }} />
          </div>
        </div>
        <div className="card-body see-thru">
          <div className="row flex-column flex-md-row align-items-center p-3 px-md-4 mb-3  border-bottom shadow-sm">

            <h6 className="card-title text-right col-6">
              {car.status}
            </h6>
          </div>
          <div className="card-text font-size-medium font-weight-bold font-italic">
            <h4>
              {car.shortDescription}
            </h4>

            <div className="mt-3"></div>
            <div className="card-text font-weight-bold font-italic">
                        Top Speed: {car.topSpeed} mph
            </div>
            <div className="card-text font-weight-bold font-italic">
                        Horse Power: {car.horsePower} BHP
            </div>
            <div className="card-text font-weight-bold font-italic">
                        Rate: ${car.rate} / day
            </div>
          </div>
        </div>
        <div className="mt-2"></div>
        <div className="d-flex flex-column align-items-center " >
          <div className="btn-group text-center" >
            <button type="button" className="btn btn-sm btn-outline-secondary"><Link to="/home-page">Back</Link></button>
            <Link to="/reservations">
              <button type="button" className="btn btn-sm btn-outline-secondary">Book Now</button>
            </Link>
            <button type="button" className="btn btn-sm btn-outline-secondary"><Link to="/car-video">Video</Link></button>
          </div>
        </div>
      </div>;
  }
}

export default Details1;
