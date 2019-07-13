import React from 'react';
import propTypes from 'prop-types';
import TimeSlotEntry from './TimeSlotEntry';
import style from '../style/timeSlot.css';

const TimeSlots = ({ availableTargetTimeSlots, bookTimeSlot }) => {
  const renderSlots = () => availableTargetTimeSlots.map(slot => (
    <TimeSlotEntry
      key={slot}
      slot={slot}
      bookTimeSlot={bookTimeSlot}
    />
  ));

  return (
    <span className={style.time_slot_wrapper}>
      <span>
        <div className={style.time_slot_title}>
          <span>Select a time:</span>
        </div>
        <div className={style.time_slot_entry_wrapper}>
          {renderSlots()}
        </div>
      </span>
    </span>
  );
};

TimeSlots.propTypes = {
  availableTargetTimeSlots: propTypes.array.isRequired,
  bookTimeSlot: propTypes.func.isRequired,
};

export default TimeSlots;
