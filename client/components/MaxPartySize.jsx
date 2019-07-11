import React from 'react';
import propTypes from 'prop-types';
import SVG from '../img/Warning';

const MaxPartySize = ({ restaurantName }) => (
  <span className="no-time-slot-wrapper">
    <div className="no-time-slot">
      <div className="no-time-slot-text-wrap">
        <SVG
          className="no-time-slot-warning"
          viewBox="0 0 1000 1000"
          fill="333333"
        />
        {`Unfortunately, your party is too large to make an online reservation at ${restaurantName}. 
            We recommend contacting the restaurant directly.`}
      </div>
    </div>
  </span>
);

MaxPartySize.propTypes = {
  restaurantName: propTypes.string.isRequired,
};

export default MaxPartySize;
