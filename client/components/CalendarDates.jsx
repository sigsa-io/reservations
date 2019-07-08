import React from 'react';
import moment from 'moment';
import propTypes from 'prop-types';

class CalendarDates extends React.Component {
  constructor(props) {
    super(props);

    this.renderDatesArr = this.renderDatesArr.bind(this);
    this.renderDates = this.renderDates.bind(this);
  }

  clickEvent(date) {
    const { changeRenderDate, changeShowCalendarStatus } = this.props;

    // date is a moment object
    changeRenderDate(date);
    changeShowCalendarStatus();
  }

  renderDatesArr() {
    const { momentDate } = this.props;
    const daysInMonth = momentDate.daysInMonth();
    let firstDay = momentDate.startOf('month').format('d'); // return the first week day of the month: 0 = sunday
    const datesArr = [];

    // create black dates in calendar
    while (firstDay > 0) {
      datesArr.push('');
      firstDay -= 1;
    }

    // create dates in calendar
    let i = 1;
    while (i <= daysInMonth) {
      datesArr.push(i);
      i += 1;
    }

    return datesArr;
  }

  renderDates() {
    const { momentDate } = this.props;
    const curDate = moment();
    let nextMonthDateCount = 1 + momentDate.daysInMonth();
    let firstDay = momentDate.startOf('month').format('d'); // return the first week day of the month: 0 = sunday

    const datesArr = this.renderDatesArr();
    const render = [];

    // create row element with <td>
    let isOutOfCalendar = false;
    let isPastDate = false;
    let keyIndex;
    let classname = 'date-cell';
    let i = 0;
    let row = [];

    while (i < datesArr.length) {
      if (datesArr[i] === '') {
        isOutOfCalendar = true;
        keyIndex = momentDate.clone().date(1 - firstDay);
        firstDay -= 1;
      } else {
        keyIndex = momentDate.clone().date(datesArr[i]);
        isOutOfCalendar = false;
      }

      if (keyIndex.diff(curDate, 'days') >= 0) {
        isPastDate = false;
      } else {
        isPastDate = true;
      }

      if (isOutOfCalendar) {
        classname += ' out-of-calendar';
      }
      if (isPastDate) {
        classname += ' past-month-date';
      }

      row.push(
        <div
          key={`${keyIndex.format('M')}-${keyIndex.format('D')}`}
          className={classname}
          onClick={this.clickEvent.bind(this, keyIndex)}
          onKeyDown={this.clickEvent.bind(this, keyIndex)}
          role="button"
          tabIndex="0"
        >
          {keyIndex.format('D')}
        </div>,
      );

      classname = 'date-cell';

      // generate next month's date
      if (i === datesArr.length - 1 && row.length < 7) {
        while (row.length < 7) {
          keyIndex = momentDate.clone().date(nextMonthDateCount);

          row.push(
            <div
              key={`${keyIndex.format('M')}-${keyIndex.format('D')}`}
              className="date-cell out-of-calendar"
              onClick={this.clickEvent.bind(this, keyIndex)}
              onKeyDown={this.clickEvent.bind(this, keyIndex)}
              role="button"
              tabIndex="0"
            >
              {keyIndex.format('D')}
            </div>,
          );
          nextMonthDateCount += 1;
        }
        render.push(row);
        row = [];
      }

      if (i % 7 === 6) {
        render.push(row);
        row = [];
      }

      i += 1;
    }

    // generate extra row to show next month's calendar dates
    while (row.length < 7) {
      keyIndex = momentDate.clone().date(nextMonthDateCount);
      row.push(
        <div
          key={`${keyIndex.format('M')}-${keyIndex.format('D')}`}
          className="date-cell out-of-calendar"
          onClick={this.clickEvent.bind(this, keyIndex)}
          onKeyDown={this.clickEvent.bind(this, keyIndex)}
          role="button"
          tabIndex="0"
        >
          {keyIndex.format('D')}
        </div>,
      );
      nextMonthDateCount += 1;
    }
    render.push(row);

    // render rows to <tr>
    return render.map((row, j) => (
      <div
        key={`${momentDate.format('M')}-${j}`}
        className="calendar-row"
      >
        {row}
      </div>
    ));
  }

  render() {
    return (
      <div className="calendar-grid">
        {this.renderDates()}
      </div>
    );
  }
}

CalendarDates.propTypes = {
  momentDate: propTypes.instanceOf(moment).isRequired,
  changeRenderDate: propTypes.func.isRequired,
  changeShowCalendarStatus: propTypes.func.isRequired,
};

export default CalendarDates;
