import React from 'react';
import SizeDateTime from './SizeDateTime';
import BookingStat from './BookingStat';
import moment from 'moment';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurantId: null,
      renderDate: moment(), // default render date is today
      userTargetTime: '6:30 PM', // default target time for initial render is 6:30 pm
      userPartySize: 2, // default render partySize is 2
      displayView: 'find-a-table', // default display is 'find a table' button
    };

    this.changeRenderDate = this.changeRenderDate.bind(this);
    this.timeSelectionChange = this.timeSelectionChange.bind(this);
    this.partySizeSelectionChange = this.partySizeSelectionChange.bind(this);
  }

  // componentDidMount will get initial restaurantId

  // invoke from calendar dates
  changeRenderDate(newDate) {
    // newDate should be a moment object
    this.setState({
      renderDate: newDate,
    });
  }

  // invoke from time selection drop down
  timeSelectionChange(e) {
    this.setState({
      userTargetTime: e.target.value,
    });
  }

  // invoke from partySize selection drop down
  partySizeSelectionChange(e) {
    this.setState({ userPartySize: e.target.value });
  }

  render() {
    const { 
      renderDate,
      userTargetTime,
      restaurantId,
      userPartySize,
    } = this.state;

    return (
      <div className="reservation-frame">
        <div className="reservation-title-wrapper">
          <h3 className="reservation-title">
            <span>Make a reservation</span>
          </h3>
        </div>
        <SizeDateTime
          renderDate={renderDate}
          userTargetTime={userTargetTime}
          userPartySize={userPartySize}
          timeSelectionChange={this.timeSelectionChange}
          changeRenderDate={this.changeRenderDate}
          partySizeSelectionChange={this.partySizeSelectionChange}
        />
        <div className="find-a-table-wrapper">
          <button className="find-a-table-button" type="submit">Find a Table</button>
        </div>
        <BookingStat
          restaurantId={restaurantId}
          renderDate={renderDate}
        />
      </div>
    );
  }
}

export default App;
