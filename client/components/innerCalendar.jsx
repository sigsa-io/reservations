import React from 'react';
import CalendarDays from './CalendarDays';
import CalendarDates from './CalendarDates';

class InnerCalendar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <table>
        <CalendarDays />
        <CalendarDates 
          month={this.props.month}
        />
      </table>
    )
  }
}

export default InnerCalendar;
