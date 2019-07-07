import React from 'react';
import moment from 'moment';
import CalendarButton from '../img/CalendarButton';
import CalendarDays from './CalendarDays';
import CalendarDates from './CalendarDates';

class Calendar extends React.Component {
  constructor() {
    super ();
    this.state = {
      momentDate: moment(),
    }

    this.toNextMonth = this.toNextMonth.bind(this);
  }

  toNextMonth() {
    const { momentDate } = this.state;
    const nextMomentDate = momentDate.add(1, 'month');

    this.setState({
      momentDate: nextMomentDate,
    });
  }

  render() {
    const { momentDate } = this.state;

    return ( 
      <div className="calendar-container">
        <div className="calendar-inner-wrapper">
          <div className="calendar-button-wrapper">
            <CalendarButton className='calendar-button calendar-left-button'/>
            <CalendarButton 
              className='calendar-button calendar-right-button'
              toNextMonth={this.toNextMonth}
            />
          </div>
          <div className="calendar-detail-wrapper">
            <div className="calendar-month">
              <span>{momentDate.format('MMMM   YYYY')}</span>
            </div>
            <CalendarDays />
            <CalendarDates 
              momentDate={momentDate}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Calendar;
