import React from 'react';
import moment from 'moment';
import propTypes from 'prop-types';
import CalendarButton from '../img/CalendarButton';
import CalendarDays from './CalendarDays';
import CalendarDates from './CalendarDates';
import style from '../style/calendar.css';

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
    const { renderDate } = this.props;
    this.setState({ momentDate: renderDate.clone() });
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
      <div className={style.calendar_container}>
        <div className={style.calendar_inner_wrapper}>
          <div className={style.calendar_button_wrapper}>
            <CalendarButton
              viewBox="0 0 5.24 8.07"
              buttonClass="calendar_left_button"
              momentDate={momentDate}
              switchMonth={this.toPriorMonth}
            />
            <CalendarButton
              viewBox="0 0 5.24 8.07"
              buttonClass="calendar_right_button"
              switchMonth={this.toNextMonth}
              momentDate={momentDate}
            />
          </div>
          <div className={style.calendar_detail_wrapper}>
            <div className={style.calendar_month}>
              <span>{momentDate.format('MMMM YYYY')}</span>
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

Calendar.propTypes = {
  renderDate: propTypes.instanceOf(moment).isRequired,
  changeRenderDate: propTypes.func.isRequired,
  changeShowCalendarStatus: propTypes.func.isRequired,
};

export default Calendar;
