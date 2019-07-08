import React, { useEffect, useRef, useState } from 'react';
import SVG from '../img/SelectionIcon';
import Calendar from './Calendar';

const Date = (props) => {
  const node = useRef();
  const [showCalendar, setShowCalendar] = useState(false);

  const handleClickOutside = e => {
    console.log("clicking anywhere");
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
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  return (
    <div 
      className="date-selection-detail-wrapper"
      ref={node}
    >
      <div 
        className="date-input-text"
        onClick={e => setShowCalendar(!showCalendar)}
      >
        {props.renderDate.format('ddd, MM/D')}
      </div>
      <SVG />
      {showCalendar && (
        <Calendar 
          changeShowCalendarStatus={changeShowCalendarStatus}
          changeRenderDate={props.changeRenderDate}
          renderDate={props.renderDate}
        />
      )}
    </div>
  );
}

export default Date;
