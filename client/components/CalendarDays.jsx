import React from 'react';
import moment from 'moment';

const CalendarDays = () => {
  const weekdaysshort = moment.weekdaysShort();

  const render = weekdaysshort.map(day => (
    <div key={day} className="week-day">
      {day}
    </div>
  ));

  return (
    <div className="calendar-days">
      {render}
    </div>
  );
};

export default CalendarDays;
