import React from 'react';
import BookedTimes from '../img/BookTimes';
import ActFast from '../img/ActFast';

class BookingStat extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { bookedTimes, remainingTimeSlot } = this.props;

    return (
      <div className="book-stat">
        <div className="book-stat-wrapper">
          <BookedTimes />
          <div className="restaurant-booking-stat-text">
            Booked {bookedTimes} times today
          </div>
        </div>
        <div hidden={false} className="book-stat-wrapper">
          <ActFast />
          <div className="restaurant-booking-stat-text">
            You're in luck! We still have {remainingTimeSlot} timeslots left
          </div>
        </div>
      </div>
    );
  }
}

export default BookingStat;
