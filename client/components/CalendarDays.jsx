import React from 'react';
import moment from 'moment';

const CalendarDays = () => {
  const weekdaysshort = moment.weekdaysShort();

  const render = weekdaysshort.map(day => (
    <th key={day} className="week-day">
      {day}
    </th>
  ));

  return (
    <thead>
      <tr>{render}</tr>
    </thead>
  );
}

export default CalendarDays;
