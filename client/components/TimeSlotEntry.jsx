import React from 'react';
import propTypes from 'prop-types';
import style from '../style/timeSlot.css';

const TimeSlotEntry = ({ slot, bookTimeSlot }) => (
  <div className={style.time_slot_entry}>
    <div
      role="button"
      className={style.time_slot_entry_inner}
      onClick={e => bookTimeSlot(e, slot)}
      onKeyDown={e => bookTimeSlot(e, slot)}
      value={slot}
    >
      <span>{slot}</span>
    </div>
  </div>
);

TimeSlotEntry.propTypes = {
  slot: propTypes.string.isRequired,
  bookTimeSlot: propTypes.func.isRequired,
};

export default TimeSlotEntry;
