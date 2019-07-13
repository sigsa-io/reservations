import React from 'react';
import propTypes from 'prop-types';
import moment from 'moment';
import SVG from '../img/Cheers';
import style from '../style/message.css';
import iconStyle from '../style/selectionIcon.css';

const SuccessfulBooking = ({ renderDate, restaurantName, bookedTimeSlot }) => (
  <span className={style.successful_booking_wrapper}>
    <div className={style.successful_booking}>
      <div className={style.successful_booking_text_wrap}>
        <SVG
          className={iconStyle.successful_booking_icon}
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
