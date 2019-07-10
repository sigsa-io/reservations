import React from 'react';
import propTypes from 'prop-types';
import BookedTimes from '../img/BookTimes';
import ActFast from '../img/ActFast';

class BookingStat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookedTimes: 0,
    };
  }

  render() {
    const { bookedTimes } = this.state;
    const { availableDateTimeSlots } = this.props;

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
            {bookedTimes}
            {' '}
                times today
          </div>
        </div>
        <div className="book-stat-wrapper">
          <ActFast
            className="act-fast-icon"
            viewBox="0 0 24 24"
            fill="#333333"
          />
          <div className="restaurant-booking-stat-text">
            {'You\'re in luck! We still have'}
            {' '}
            {availableDateTimeSlots}
            {' '}
                timeslots left
          </div>
        </div>
      </div>
    );
  }
}

BookingStat.propTypes = {
  availableDateTimeSlots: propTypes.number.isRequired,
};

export default BookingStat;
