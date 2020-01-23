import React from 'react';

class CarDetailsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carDetails: [],
      isClicked: false
    };
    this.handeClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch('/api/cars/')
      .then(response => response.json())
      .then(carDetailsData => {
        this.setState({ carDetails: carDetailsData });
      })
      .catch(error => `${error}`);
  }

  handleClick() {
    // return to main screen
  }

  render() {
    return (
      <div id="root">
        <div className="container .container-fluid ">
          <div className="row">
            <button onClick={this.props.handleClick}></button>
            {
              this.state.carDetails.map(carDetail => (
                <carRenderCode key={carDetail.carDetails} carDetailData={carDetail}>
                </carRenderCode>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default CarDetailList;
