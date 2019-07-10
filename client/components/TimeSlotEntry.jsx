import React from 'react';
import propTypes from 'prop-types';
import moment from 'moment';

const TimeSlotEntry = ({ slot }) => (
  <div className="time-slot-entry">
    <div className="time-slot-entry-inner">
      <span>{moment.unix(slot).format('h:mm A')}</span>
    </div>
  </div>
);

TimeSlotEntry.propTypes = {
  slot: propTypes.number.isRequired,
};

export default TimeSlotEntry;
