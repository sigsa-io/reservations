import React from 'react';
import moment from 'moment';
import CalendarButton from '../img/CalendarButton';
import CalendarDays from './CalendarDays';
import CalendarDates from './CalendarDates';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      momentDate: moment(),
    };

    this.toNextMonth = this.toNextMonth.bind(this);
    this.toPriorMonth = this.toPriorMonth.bind(this);
  }

  componentDidMount() {
    this.setState({ momentDate: this.props.renderDate.clone() });
  }

  toNextMonth(e) {
    const { momentDate } = this.state;
    const nextMomentDate = momentDate.clone().add(1, 'month');

    this.setState({
      momentDate: nextMomentDate,
    });
    e.preventDefault();
  }

  toPriorMonth(e) {
    const { momentDate } = this.state;
    const priorMomentDate = momentDate.clone().subtract(1, 'month');

    this.setState({
      momentDate: priorMomentDate,
    });
    e.preventDefault();
  }

  render() {
    const { momentDate } = this.state;
    const { changeRenderDate, changeShowCalendarStatus } = this.props;

    return (
      <div className="calendar-container">
        <div className="calendar-inner-wrapper">
          <div className="calendar-button-wrapper">
            <CalendarButton
              className="calendar-button calendar-left-button"
              momentDate={momentDate}
              toPriorMonth={this.toPriorMonth}
            />
            <CalendarButton
              className="calendar-button calendar-right-button"
              toNextMonth={this.toNextMonth}
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
              changeShowCalendarStatus={changeShowCalendarStatus}
              changeRenderDate={changeRenderDate}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Calendar;
