import React from 'react';
import propTypes from 'prop-types';
import moment from 'moment';
import SVG from '../img/Cheers';

const SuccessfulBooking = ({ renderDate, restaurantName, bookedTimeSlot }) => (
  <span className="successful-booking-wrapper">
    <div className="successful-booking">
      <div className="successful-booking-text-wrap">
        <SVG
          className="successful-booking-icon"
          viewBox="0 0 400.264 400.264"
          fill="333333"
        />
        {'You have successfully booked a reservation at   '}
        {restaurantName}
        {' for '}
        {renderDate.format('MMMM Do YYYY')}
        {' at '}
        {bookedTimeSlot}
        {' !'}
      </div>
    </div>
  </span>
);

SuccessfulBooking.propTypes = {
  renderDate: propTypes.instanceOf(moment).isRequired,
  restaurantName: propTypes.string.isRequired,
  bookedTimeSlot: propTypes.string.isRequired,
};

export default SuccessfulBooking;
