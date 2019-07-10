import React from 'react';
import TimeSlotEntry from './TimeSlotEntry';

const TimeSlots = ({ availableTargetTimeSlots }) => {

  const renderSlots = () => {
    console.log(availableTargetTimeSlots)
    return availableTargetTimeSlots.map((slot) => (
      <TimeSlotEntry
        slot={slot.reservationTimeStamp}
      />
    ));
  }

  return (
    <span className="time-slot-wrapper">
      <span>
        <div className="time-slot-title">
          <span>Select a time:</span>
        </div>
        <div className="time-slot-entry-wrapper">
          {renderSlots()}
        </div>
      </span>
    </span>
  );
};

export default TimeSlots;
