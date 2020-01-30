import React from 'react';
import { Link } from 'react-router-dom';

function CarListItem(props) {
  const status = props.availability ? 'Available' : 'Unavailable';
  const statusColor = props.availability ? { color: 'green' } : { color: 'red' };
  return (
    <Link to={`/cars/${props.carId}`} style={{ textDecoration: 'none' }}>
      <div
        className="card mb-3"
        style={{ height: '100%', overflow: 'hidden', color: 'initial' }}>
        <img
          src={props.image}
          className="card-img-top list-img"
          style={{ objectFit: 'cover', height: '15em' }}>
        </img>
        <div
          className="card-body">
          <div className="row">
            <h5
              style={{ fontWeight: '600', color: '#2f3640' }}
              className="card-title col-6 p-0">
              {props.make}
            </h5>
            <h5
              style={statusColor}
              className="card-title col-6 text-right mt-1">
              {status}
            </h5>
          </div>
          <p className="card-text">
            {props.shortDescription}
          </p>
          <div className="row">
            <p className="card-text title text-muted text-left col-6 p-0 m-0">${props.rate} / day</p>
            <p className="card-text text-muted text-right col-6 mt-1">View details</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CarListItem;
