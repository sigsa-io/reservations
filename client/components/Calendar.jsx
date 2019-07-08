import React from 'react';
import moment from 'moment';
import CalendarButton from '../img/CalendarButton';
import CalendarDays from './CalendarDays';
import CalendarDates from './CalendarDates';

class Calendar extends React.Component {
  constructor() {
    super();
    this.state = {
      momentDate: moment(),
    };

    this.toNextMonth = this.toNextMonth.bind(this);
    this.toPriorMonth = this.toPriorMonth.bind(this);
  }

  toNextMonth() {
    const { momentDate } = this.state;
    const nextMomentDate = momentDate.add(1, 'month');

    this.setState({
      momentDate: nextMomentDate,
    });
  }

  toPriorMonth() {
    const { momentDate } = this.state;
    const nextMomentDate = momentDate.subtract(1, 'month');

    this.setState({
      momentDate: nextMomentDate,
    });
  }

  render() {
    const { momentDate } = this.state;
    const { toPriorMonth, toNextMonth } = this;

    return (
      <div className="calendar-container">
        <div className="calendar-inner-wrapper">
          <div className="calendar-button-wrapper">
            <CalendarButton
              className="calendar-button calendar-left-button"
              momentDate={momentDate}
              toPriorMonth={toPriorMonth}
            />
            <CalendarButton
              className="calendar-button calendar-right-button"
              toNextMonth={toNextMonth}
              momentDate={momentDate}
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
    );
  }
}

export default Calendar;
