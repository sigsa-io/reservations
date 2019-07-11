import React from 'react';
import propTypes from 'prop-types';
import TimeSlotEntry from './TimeSlotEntry';

const TimeSlots = ({ availableTargetTimeSlots }) => {
  const renderSlots = () => {
    return availableTargetTimeSlots.map((slot) => (
      <TimeSlotEntry
        key={slot}
        slot={slot}
      />
    ));
  };

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

TimeSlots.propTypes = {
  availableTargetTimeSlots: propTypes.array.isRequired,
}

export default TimeSlots;
