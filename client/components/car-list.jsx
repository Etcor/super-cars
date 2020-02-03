import React from 'react';
import Header from './header';
import CarListItem from './car-list-item';

class SearchFilter extends React.Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem('searchParams')) {
      this.state = JSON.parse(localStorage.getItem('searchParams'));
    } else {
      this.state = {
        category: '',
        orderBy: ''
      };
    }
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleOrderByChange = this.handleOrderByChange.bind(this);
  }

  handleCategoryChange(event) {
    this.setState({ category: event.target.value }, () => {
      localStorage.setItem('searchParams', JSON.stringify(this.state));
      this.props.filterCars(this.state);
    });
  }

  handleOrderByChange(event) {
    this.setState({ orderBy: event.target.value }, () => {
      localStorage.setItem('searchParams', JSON.stringify(this.state));
      this.props.filterCars(this.state);
    });
  }

  render() {
    return (
      <div
        className="container py-2 filter-bg">
        <div className="d-flex align-items-center justify-content-between">
          <div className="mr-1 filter-label">View</div>
          <select
            value={this.state.category}
            className="btn btn-sm mr-1 filter-dropdown"
            onChange={this.handleCategoryChange}>
            <option value="All">All</option>
            <option value="Hypercar">Hyper cars</option>
            <option value="Supercar">Super cars</option>
            <option value="Muscle">Muscle cars</option>
          </select>
          <div className="mr-1 filter-label">Sort by</div>
          <select
            value={this.state.orderBy}
            className="btn btn-sm ml-1 filter-dropdown"
            onChange={this.handleOrderByChange}>
            <option value=''></option>
            <option value="topSpeed">Top Speed</option>
            <option value="horsePower">Horse Power</option>
            <option value="mpg">Mpg</option>
            <option value="availability">Availability</option>
          </select>
        </div>
      </div>
    );
  }
}

export default class CarList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      filter: {
        orderBy: '',
        category: ''
      }
    };
    this.filterCars = this.filterCars.bind(this);
  }

  componentDidMount() {
    this.getCars();
  }

  getCars() {
    const { search } = this.props.location;
    fetch(`/api/cars${search}`)
      .then(response => response.json())
      .then(cars => this.setState({ cars }))
      .catch(error => console.error(error));
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.getCars();
    }
  }

  filterCars(filterParams) {
    const { category, orderBy } = filterParams;
    const params = new URLSearchParams();
    if (orderBy) {
      params.append('orderBy', orderBy);
    }
    if (category && category !== 'All') {
      params.append('category', category);
    }
    this.props.history.push(`/cars?${params.toString()}`);
    this.setState({ filter: { orderBy, category } });
  }

  displayCars() {
    const { cars } = this.state;
    return cars.map(car => {
      return <CarListItem
        key={car.carId} {...car}
        history={this.props.history}/>;
    });
  }

  render() {
    return (
      <div className="bg-list">
        <Header
          title="All Cars"
          back={true} user={true}
          history={this.props.history}/>
        <div
          style={{ paddingTop: '45px' }}
          className="container-fluid px-0">
          <SearchFilter filterCars={this.filterCars}/>
          <div className="container">
            {this.displayCars()}
          </div>
        </div>
      </div>
    );
  }
}
