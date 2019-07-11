import React from 'react';
import propTypes from 'prop-types';
import moment from 'moment';

const TimeSlotEntry = ({ slot }) => (
  <div className="time-slot-entry">
    <div className="time-slot-entry-inner">
      <span>{slot}</span>
    </div>
  </div>
);

TimeSlotEntry.propTypes = {
  slot: propTypes.string.isRequired,
};

export default TimeSlotEntry;
