import React from 'react';
import propTypes from 'prop-types';
import BookedTimes from '../img/BookTimes';
import ActFast from '../img/ActFast';
import style from '../style/bookingStat.css';

const BookingStat = ({ bookingCount, availableTargetTimeSlots, inLuckView }) => {
  const renderInLuckMsg = () => {
    if (inLuckView) {
      return (
        <div className={style.book_stat_wrapper}>
          <ActFast
            className={style.act_fast_icon}
            viewBox="0 0 24 24"
            fill="#333333"
          />
          <div className={style.restaurant_booking_stat_text}>
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
    <div className={style.book_stat}>
      <div className={style.book_stat_wrapper}>
        <BookedTimes
          className={style.book_times_icon}
          viewBox="0 0 24 24"
          fill="#333333"
        />
        <div className={style.restaurant_booking_stat_text}>
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
  inLuckView: propTypes.bool.isRequired,
};

export default BookingStat;
