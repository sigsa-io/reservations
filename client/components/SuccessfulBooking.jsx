import React from 'react';

const SuccessfulBooking = ({ renderDate, restaurantName, bookedTimeSlot }) => (
  <span className="sucessful-booking-wrapper">
    <div className="sucessful-booking">
      <div className="sucessful-booking-text-wrap">
        {'You have successfully booked a reservation at'}
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

export default SuccessfulBooking;