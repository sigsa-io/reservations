import React from 'react';
import propTypes from 'prop-types';
import moment from 'moment';
import SVG from '../img/SelectionIcon';

const Time = (
  {
    userTargetTime,
    timeSelectionChange,
  }
) => {
  const timeGenerator = () => {
    const timeEntry = [];
    let hourCount = 48;
    const time = moment().startOf('day');

    while (hourCount > 0) {
      timeEntry.push(
        <option
          key={`${time.format('HH')}-${time.format('mm')}`}
          name={`${time.format('HH')}-${time.format('mm')}`}
          value={time.format('h:mm A')}
        >
          {time.format('hh:mm A')}
        </option>,
      );

      time.add(30, 'minute');
      hourCount--;
    }
    return timeEntry;
  }

  return (
    <div className="reservation-seleciton-wrapper">
      <div className="reservation-selection-text">{ userTargetTime }</div>
      <SVG />
      <select className="reservation-seleciton" onChange={timeSelectionChange}>
        { timeGenerator() }
      </select>
    </div>
  );
}

Time.propTypes = {
  userTargetTime: propTypes.string.isRequired,
  timeSelectionChange: propTypes.func.isRequired,
}

export default Time;
