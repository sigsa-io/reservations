import React, { useEffect, useRef, useState } from 'react';
import propTypes from 'prop-types';
import moment from 'moment';
import SVG from '../img/SelectionIcon';
import Calendar from './Calendar';

const Date = ({ renderDate, changeRenderDate }) => {
  const node = useRef();
  const [showCalendar, setShowCalendar] = useState(false);

  const handleClickOutside = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setShowCalendar(false);
  };

  const changeShowCalendarStatus = () => setShowCalendar(false);

  useEffect(() => {
    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar]);

  return (
    <div
      className="date-selection-detail-wrapper"
      ref={node}
    >
      <div
        tabIndex="0"
        role="button"
        className="date-input-text"
        onClick={() => setShowCalendar(!showCalendar)}
        onKeyDown={() => setShowCalendar(!showCalendar)}
      >
        {renderDate.format('ddd, MM/D')}
      </div>
      <SVG />
      {showCalendar && (
        <div className="outer-calendar-container" role="grid">
          <Calendar
            changeShowCalendarStatus={changeShowCalendarStatus}
            changeRenderDate={changeRenderDate}
            renderDate={renderDate}
          />
        </div>
      )}
    </div>
  );
};

Date.propTypes = {
  renderDate: propTypes.instanceOf(moment).isRequired,
  changeRenderDate: propTypes.func.isRequired,
};

export default Date;
