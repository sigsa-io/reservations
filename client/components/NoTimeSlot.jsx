import React from 'react';
import propTypes from 'prop-types';
import SVG from '../img/Warning';

const NoTimeSlot = ({ userTargetTime }) => (
  <span className="no-time-slot-wrapper">
    <div className="no-time-slot">
      <div className="no-time-slot-text-wrap">
        <SVG
          className="no-time-slot-warning"
          viewBox="0 0 1000 1000"
          fill="333333"
        />
        {`At the moment, there’s no online availability within 2.5 hours of `} 
        {userTargetTime}
        {`. Have another time in mind?`}
      </div>
    </div>
  </span>
);

NoTimeSlot.propTypes = {
  userTargetTime: propTypes.string.isRequired,
}

export default NoTimeSlot;
