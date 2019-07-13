import React, { useEffect, useRef, useState } from 'react';
import propTypes from 'prop-types';
import moment from 'moment';
import SVG from '../img/SelectionIcon';
import Calendar from './Calendar';
import iconStyle from '../style/selectionIcon.css';
import style from '../style/dates.css';

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
      className={style.date_selection_detail_wrapper}
      ref={node}
    >
      <div
        tabIndex="0"
        role="button"
        className={style.date_input_text}
        onClick={() => setShowCalendar(!showCalendar)}
        onKeyDown={() => setShowCalendar(!showCalendar)}
      >
        {renderDate.format('ddd, MM/D')}
      </div>
      <SVG
        className={iconStyle.selection_icon}
        viewBox="0 0 8.07 5.24"
        fill="rgb(51, 51, 51)"
      />
      {showCalendar && (
        <div className={style.outer_calendar_container} role="grid">
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
