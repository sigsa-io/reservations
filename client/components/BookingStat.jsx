import React from 'react';
import propTypes from 'prop-types';
import BookedTimes from '../img/BookTimes';
import ActFast from '../img/ActFast';

const BookingStat = ({ bookingCount, availableTargetTimeSlots, inLuckView }) => {
  const renderInLuckMsg = () => {
    if (inLuckView) {
      return (
        <div className="book-stat-wrapper">
          <ActFast
            className="act-fast-icon"
            viewBox="0 0 24 24"
            fill="#333333"
          />
          <div className="restaurant-booking-stat-text">
            {'You\'re in luck! We still have'}
            {' '}
            {availableTargetTimeSlots.length}
            {' '}
                timeslots left
          </div>
        </div>
      );
    }

    return <div />;
  };

  return (
    <div className="book-stat">
      <div className="book-stat-wrapper">
        <BookedTimes
          className="book-times-icon"
          viewBox="0 0 24 24"
          fill="#333333"
        />
        <div className="restaurant-booking-stat-text">
              Booked
          {' '}
          {bookingCount}
          {' '}
              times today
        </div>
      </div>
      { renderInLuckMsg() }
    </div>
  );
};

BookingStat.propTypes = {
  availableTargetTimeSlots: propTypes.array.isRequired,
  bookingCount: propTypes.number.isRequired,
  inLuckView: propTypes.boolean.isRequired,
};

export default BookingStat;
