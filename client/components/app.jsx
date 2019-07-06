import React from 'react';
import SizeDateTime from './SizeDateTime';
import BookingStat from './BookingStat';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      bookedTimes: 0,
      remainingTimeSlot: 4,
    };
  }

  render() {
    const { bookedTimes, remainingTimeSlot } = this.state;

    return (
      <div className="reservation-frame">
        <div className="reservation-title-wrapper">
          <h3 className="reservation-title">
            <span>Make a reservation</span>
          </h3>
        </div>
        <SizeDateTime />
        <div className="find-a-table-wrapper">
          <button className="find-a-table-button" type="submit">Find a Table</button>
        </div>
        <BookingStat
          bookedTimes={bookedTimes}
          remainingTimeSlot={remainingTimeSlot}
        />
      </div>
    );
  }
}

export default App;
