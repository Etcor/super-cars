import React from 'react';

class HomePageCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carsImages: []
    };
    this.carouselIndicator = [];
    this.generateCarouselIndicator = this.generateCarouselIndicator.bind(this);
  }

  componentDidMount() {
    this.getCars();
  }

  getCars() {
    fetch('api/cars')
      .then(response => response.json())
      .then(cars => {
        const imagesArray = [];
        cars.forEach(car => {
          imagesArray.push(car.image);
        });
        this.setState({ carsImages: imagesArray });
      })
      .catch(err => console.error(err));
  }

  generateCarouselIndicator() {
    for (let carouselIndex = 1; carouselIndex < 5; carouselIndex++) {
      this.carouselIndicator.push(
        <li data-target='#mainPageCarousel' key={carouselIndex} data-slide-to={carouselIndex}></li>
      );
    }
    return this.carouselIndicator;
  }

  render() {
    const { carsImages } = this.state;
    return (
      <div className='row'>
        <div id='mainPageCarousel' className='carousel slide' data-ride='carousel' data-interval='5000'>
          <div className='carousel-inner' role='listbox'>
            <div className='mainCarouselItem carousel-item active'>
              <img src={carsImages[0]} className='mainCarouselImage'/>
            </div>
            <div className='mainCarouselItem carousel-item'>
              <img src={carsImages[1]} className='mainCarouselImage' />
            </div>
            <div className='mainCarouselItem carousel-item'>
              <img src={carsImages[2]} className='mainCarouselImage' />
            </div>
            <div className='mainCarouselItem carousel-item'>
              <img src={carsImages[3]} className='mainCarouselImage' />
            </div>
            <div className='mainCarouselItem carousel-item'>
              <img src={carsImages[4]} className='mainCarouselImage' />
            </div>
          </div>
          <ol className='mainCarouselIndicator carousel-indicators'>
            <li data-target='#mainPageCarousel' key='0' data-slide-to='0' className='active' style={{}}></li>
            {this.generateCarouselIndicator()}
          </ol>
        </div>
      </div>
    );
  }
}

export default HomePageCarousel;
