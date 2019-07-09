import React from 'react';
import moment from 'moment';
import SizeDateTime from './SizeDateTime';
import BookingStat from './BookingStat';
import getRequests from './helperFunc/getRequests';

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
    this.viewSwitch = this.viewSwitch.bind(this);
    this.getTimeSlot = this.getTimeSlot.bind(this);
  }

  // componentDidMount will get initial restaurantId

  // invoke from calendar dates
  changeRenderDate(newDate) {
    // newDate should be a moment object
    this.setState({ renderDate: newDate });
  }

  // invoke from time selection drop down
  timeSelectionChange(e) {
    this.setState({ userTargetTime: e.target.value });
  }

  // invoke from partySize selection drop down
  partySizeSelectionChange(e) {
    this.setState({ userPartySize: e.target.value });
  }

  // view switcher, invoke from app.jsx
  // note that clicking a date in the calendar should rerender the button again!! 
  viewSwitch(option) {
    this.setState({ displayView: option });
  }

  // get timeslots in an array with correct partysize and time range
  getTimeSlot() {
    const { restaurantId, renderDate, userTargetTime, userPartySize } = this.state;
    const requestInfo = { restaurantId, renderDate, userTargetTime, userPartySize };
    const captureData = (data) => {
      console.log(data);
    }

    getRequests(requestInfo, captureData, this.viewSwitch);
  }

  // render button or timeslots
  renderView() {
    switch (displayView) {
      case 'find-a-table':
        return (
          <div className="find-a-table-wrapper">
            <button 
              className="find-a-table-button" 
              type="submit"
              onClick={this.getTimeSlot}
            >
              Find a Table
            </button>
          </div>
        );          
      case 'has-time-slots':
        return (
          <div>There will be time slot here</div>
        );
    }
  }

  render() {
    const { 
      renderDate,
      userTargetTime,
      restaurantId,
      userPartySize,
      displayView,
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
        { this.renderView() }
        <BookingStat
          restaurantId={restaurantId}
          renderDate={renderDate}
        />
      </div>
    );
  }
}

export default App;
