import React from 'react';
import HomePageCarousel from './main-carousel';
import Header from './header';

class Home extends React.Component {

  render() {
    return (
      <div className="home-bg-img">
        <div className="bg-filter">
          <Header title="Super Car Experience" history={this.props.history} user={true} login={this.props.login}/>
          <div className="container-vertical pt-5">
            <div
              className="home-title">
              DISCOVER
              <p
                style={{ fontSize: '1.6rem' }}
                className="text-right m-0">
                YOUR
              </p>
            </div>
            <div className="carousel"> <HomePageCarousel/> </div>
            <button
              onClick={() => this.props.history.push('/cars')}
              id="view-cars">VIEW CARS</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
