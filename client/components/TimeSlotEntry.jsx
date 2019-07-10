import React from 'react';
import moment from 'moment';

const TimeSlotEntry = ({ timeStamp }) => {
  return (
    <div className="time-slot-entry">
      <div className="time-slot-entry-inner">
        <span>{moment.unix(timeStamp)}</span>
      </div>
    </div>
  )
}

export default TimeSlotEntry;
