import React from 'react';
import moment from 'moment';

class ComponentDates extends React.Component {
  constructor (props) {
    super(props);

    this.renderDatesArr = this.renderDatesArr.bind(this);
    this.renderDates = this.renderDates.bind(this);
  }

  renderDatesArr() {
    const { momentDate } = this.props;
    let daysInMonth = momentDate.daysInMonth();
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
    const datesArr = this.renderDatesArr();
    let firstDay = momentDate.startOf('month').format('d'); // return the first week day of the month: 0 = sunday
    const month = momentDate.month();
    const render = [];
    
    // create row element with <td>
    let emptyCount = 0;
    let isEmptyCell = false;
    let keyIndex;
    let i = 0;
    let row;
    while (i < datesArr.length) {
      if (i % 7 === 0) {
        row = [];
      }
      
      if (datesArr[i] === '') {
        emptyCount += 1;
        keyIndex = 'empty' + emptyCount;
        isEmptyCell = true;
        let priorMonthDate = momentDate.clone();
        datesArr[i] = priorMonthDate.date(1 - firstDay).format('DD');
        firstDay -= 1;
      } else {
        keyIndex = datesArr[i];

        const renderDate = momentDate.clone().date(keyIndex);
        isEmptyCell = renderDate.isBefore(curDate) ? true : false;
      }

      row.push(
        <div
          key={`${month}-${keyIndex}`}
          className={isEmptyCell ? "date-cell empty-cell": "date-cell"}
        >
          {datesArr[i]}
        </div>)

      if (i % 7 === 1) {
        render.push(row);
      }

      if (i === datesArr.length - 1 && row.length < 7) {
        let missingDates = 6 - i % 7;
        
        while (missingDates > 0) {
          emptyCount += 1;
          keyIndex = 'empty' + emptyCount;

          row.push(
            <div
              key={`${month}-${keyIndex}`}
              className="date-cell empty-cell"
            />
          );
          missingDates -= 1;
        }
      }

      i += 1;
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
    );
  }
}

export default ComponentDates;
