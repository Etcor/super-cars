import React from 'react';
import CarRenderCode from 'car-render-code';

class CarRates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rates: null,
      isClicked: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch('/api/cars/rate/')
      .then(response => response.json())
      .then(ratesData => {
        this.setState({ rates: ratesData });
      })
      .catch(error => `${error}`);
  }

  handleClick() {
    // clicks back to list of images of cars -- button on line 36
  }

  render() {
    if (this.state.rates === null) {
      return (null);
    }
    return (
      <div id="root">
        <div className="container .container-fluid ">
          <div className="row">
            <button onClick={this.props.handleClick}></button>
            {
              this.state.rates.map(rate => (
                <CarRenderCode key={rate.id} ratesData={rate}>
                </CarRenderCode>
              ))
            }
          </div>
        </div>
      </div>
    );
  }

}
