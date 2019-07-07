import React from 'react';
import moment from 'moment';

class ComponentDates extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      month: this.props.month,
      daysOfMonth: moment().daysInMonth(),
      firstDate: moment().startOf('month').format('d'), // return the first week day of the month: 0 = sunday
    }

    this.renderDatesArr = this.renderDatesArr.bind(this);
    this.renderDates = this.renderDates.bind(this);
  }

  renderDatesArr() {
    let { daysOfMonth, firstDate } = this.state;
    const datesArr = [];

    // create black dates in calendar
    while (firstDate > 0) {
      datesArr.push('');
      firstDate --;
    }

    // create dates in calendar
    let i = 1;
    while (i <= daysOfMonth) {
      datesArr.push(i);
      i ++;
    }

    return datesArr;
  }

  renderDates() {
    const datesArr = this.renderDatesArr();
    const { month } = this.state;
    const render = [];

    // create row element with <td>
    let i = 0;
    let row;
    while (i < datesArr.length) {
      if (i % 7 === 0) {
        row = [];
      }

      row.push(
        <div
          key={`${month}-${datesArr[i]}`}
          className="date-cell"
        >
          {datesArr[i]}
        </div>)

      if (i % 7 === 1) {
        render.push(row);
      }

      i ++;
    }

    // render rows to <tr>
    return render.map((row, i) => (
      <div 
        key={`${month}-${i}`}
        className="calendar-row"
      >
        {row}
      </div>
    ));
  }

  render () {
    return (
      <div className="calendar-grid">
        {this.renderDates()}
      </div>
    )
  }
}

export default ComponentDates;
