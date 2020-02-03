import React from 'react';
import HomePageCarousel from './main-carousel';
import { Link } from 'react-router-dom';
import Header from './header';

class Home extends React.Component {

  render() {
    return (
      <div className="home-bg-img">
        <div className="bg-filter">
          <Header title="Super Car Experience" history={this.props.history} user={true}/>
          <div className="container-vertical pt-5">
            <div className="home-title">
              DISCOVER
              <p style={{ fontSize: '2.2rem' }} className="text-right m-0">
                YOUR
              </p>
            </div>
            <div className="carousel"> <HomePageCarousel/> </div>
            <Link to={'/cars'} style={{ textDecoration: 'none' }} id="view-cars">
              VIEW CARS
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
