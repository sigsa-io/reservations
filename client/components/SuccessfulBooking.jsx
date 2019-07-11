import React from 'react';
import propTypes from 'prop-types';
import moment from 'moment';

const SuccessfulBooking = ({ renderDate, restaurantName, bookedTimeSlot }) => (
  <span className="sucessful-booking-wrapper">
    <div className="sucessful-booking">
      <div className="sucessful-booking-text-wrap">
        {'You have successfully booked a reservation at '}
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
}

export default SuccessfulBooking;