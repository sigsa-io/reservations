import React from 'react';
import propTypes from 'prop-types';
import BookedTimes from '../img/BookTimes';
import ActFast from '../img/ActFast';

const BookingStat = ({ bookedTimes, remainingTimeSlot }) => (
  <div className="book-stat">
    <div className="book-stat-wrapper">
      <BookedTimes />
      <div className="restaurant-booking-stat-text">
            Booked
        {' '}
        {bookedTimes}
        {' '}
            times today
      </div>
    </div>
    <div hidden={false} className="book-stat-wrapper">
      <ActFast />
      <div className="restaurant-booking-stat-text">
        {'You\'re in luck! We still have'}
        {' '}
        {remainingTimeSlot}
        {' '}
            timeslots left
      </div>
    </div>
  </div>
);

BookingStat.propTypes = {
  bookedTimes: propTypes.number.isRequired,
  remainingTimeSlot: propTypes.number.isRequired,
};

export default BookingStat;
