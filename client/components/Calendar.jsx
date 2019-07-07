import React from 'react';
import moment from 'moment';
import CalendarButton from '../img/CalendarButton';
import CalendarDays from './CalendarDays';
import CalendarDates from './CalendarDates';

class Calendar extends React.Component {
  constructor() {
    super ();
    this.state = {
      year: moment().format('YYYY'),
      month: moment().format('MMMM'),
      done: false,
    }
  }

  render() {
    const { month, year } = this.state;

    return ( 
      <div className="calendar-container">
        <div className="calendar-inner-wrapper">
          <div className="calendar-button-wrapper">
            <CalendarButton className='calendar-button calendar-left-button'/>
            <CalendarButton className='calendar-button calendar-right-button'/>
          </div>
          <div className="calendar-detail-wrapper">
            <div className="calendar-month">
              <span>{month} {year}</span>
            </div>
            <CalendarDays />
            <CalendarDates 
              month={month}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Calendar;
