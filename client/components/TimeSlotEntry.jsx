import React from 'react';
import propTypes from 'prop-types';

const TimeSlotEntry = ({ slot, bookTimeSlot }) => (
  <div className="time-slot-entry">
    <div
      role="button"
      className="time-slot-entry-inner"
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
