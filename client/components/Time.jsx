import React from 'react';
import moment from 'moment';
import SVG from '../img/SelectionIcon';

class Time extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedTime: '6:30 PM',
    };

    this.selectionChange = this.selectionChange.bind(this);
    this.timeGenerator = this.timeGenerator.bind(this);
  }

  timeGenerator () {
    const timeEntry = [];
    let hourCount = 48;
    const time = moment().startOf('day');

    while (hourCount > 0) {
      timeEntry.push(
        <option 
          key={`${time.format('HH')}-${time.format('mm')}`}
          name={`${time.format('HH')}-${time.format('mm')}`}
          value={time.format('h:mm A')}
        >
          {time.format('hh:mm A')}
        </option>,
      );

      time.add(30, 'minute');
      hourCount --;
    }
    return timeEntry;
  }

  selectionChange(e) {
    this.setState({
      selectedTime: e.target.value,
    });
  }

  render() {
    const { timeGenerator, selectionChange } = this;
    const { selectedTime } = this.state;

    return (
      <div className="reservation-seleciton-wrapper">
        <div className="reservation-selection-text">{ selectedTime }</div>
        <SVG />
        <select className="reservation-seleciton" onChange={selectionChange}>
          { timeGenerator() }
        </select>
      </div>
    );
  }
}

export default Time;
