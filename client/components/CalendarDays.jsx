import React from 'react';
import moment from 'moment';
import style from '../style/calendarDays.css';

const CalendarDays = () => {
  const weekdaysShort = moment.weekdaysShort();

  const render = weekdaysShort.map(day => (
    <div key={day} className={style.week_day}>
      {day}
    </div>
  ));

  return (
    <div className={style.calendar_days}>
      {render}
    </div>
  );
};

export default CalendarDays;
