import React from 'react';
import propTypes from 'prop-types';
import SVG from '../img/Warning';
import style from '../style/message.css';
import iconStyle from '../style/selectionIcon.css';

const NoTimeSlot = ({ userTargetTime }) => (
  <span className={style.no_time_slot_wrapper}>
    <div className={style.no_time_slot}>
      <div className={style.no_time_slot_text_wrap}>
        <SVG
          className={iconStyle.no_time_slot_warning}
          viewBox="0 0 1000 1000"
          fill="333333"
        />
        {'At the moment, there’s no online availability within 2.5 hours of '}
        {userTargetTime}
        {'. Have another time in mind?'}
      </div>
    </div>
  </span>
);

NoTimeSlot.propTypes = {
  userTargetTime: propTypes.string.isRequired,
};

export default NoTimeSlot;
