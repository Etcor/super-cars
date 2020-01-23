import React from 'react';
import dummyData from './dummy-data';

// import CarListItem from './car-list-item';

class CarDetailsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carDetails: dummyData[3],
      isClicked: false
    };
    this.handeClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getCarDetails();
  }

  getCarDetails() {
    // fetch('/api/cars/')
    //   .then(response => response.json())
    //   .then(carDetailsData => {
    //     this.setState({ carDetails: carDetailsData });
    //   })
    //   .catch(error => console.error(error));
  }

  handleClick() {
    // return to main screen
  }

  render() {
    const oneCarDetails = this.state.carDetails;
    return (
      <div id="root">
        <div className="container .container-fluid ">
          <div className="row">
            <button onClick={this.props.handleClick}>{oneCarDetails.model}</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CarDetailsList;

// rate={car.rate}
// year={car.year}
//
// shortDescription={car.shortDescription}
// topSpeed={car.topSpeed}
// availability={car.availability}
// mpg={car.mpg}
// make={car.make}
// productId={car.carId}
