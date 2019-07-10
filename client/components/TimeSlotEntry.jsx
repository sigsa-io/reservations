import React from 'react';
import moment from 'moment';

const TimeSlotEntry = ({ slot }) => {
  return (
    <div className="time-slot-entry">
      <div className="time-slot-entry-inner">
        <span>{moment.unix(slot).format('h:mm A')}</span>
      </div>
    </div>
  )
}

export default TimeSlotEntry;
