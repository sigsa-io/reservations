import React from 'react';
import moment from 'moment';
import SizeDateTime from './SizeDateTime';
import BookingStat from './BookingStat';
import TimeSlots from './TimeSlots';
import getRequests from '../helperFunc/getRequests';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurantId: null,
      renderDate: moment(), // default render date is today
      userTargetTime: '6:30 PM', // default target time for initial render is 6:30 pm
      userPartySize: 2, // default render partySize is 2
      displayView: 'find-a-table', // default display is 'find a table' button
      availableTargetTimeSlots: null,
      availableDateTimeSlots: null,
    };

    this.changeRenderDate = this.changeRenderDate.bind(this);
    this.timeSelectionChange = this.timeSelectionChange.bind(this);
    this.partySizeSelectionChange = this.partySizeSelectionChange.bind(this);
    this.viewSwitch = this.viewSwitch.bind(this);
    this.renderView = this.renderView.bind(this);
    this.getTimeSlot = this.getTimeSlot.bind(this);
  }

  // componentDidMount will get initial restaurantId
  componentDidMount() {
    const restaurantId = window.location.pathname.split('/')[1];
    const { renderDate } = this.state;
    const requestInfo = { restaurantId, renderDate };

    getRequests.getTimeSlotsCountForDate(requestInfo, (slotCount) => {
      this.setState({ 
        availableDateTimeSlots: slotCount,
        restaurantId: restaurantId,
      });
    });
  }

  // invoke from calendar dates
  changeRenderDate(newDate) {
    // newDate should be a moment object
    const { restaurantId, renderDate } = this.state;
    const requestInfo = { restaurantId, renderDate };

    getRequests.getTimeSlotsCountForDate(requestInfo, (slotCount) => {
      this.setState({
        renderDate: newDate,
        availableDateTimeSlots: slotCount,
      });
    });
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
      if (data.length > 0) {
        this.setState({
          availableTargetTimeSlots: data,
          displayView: 'has-time-slots',
        });
      } else {
        this.setState({
          availableTargetTimeSlots: data,
          displayView: 'no-time-slots',
        });
      }
    };

    getRequests.getTimeSlotsForDateAndTime(requestInfo, captureData);
  }

  // render button or timeslots
  renderView() {
    const { displayView, availableTargetTimeSlots } = this.state;

    if (displayView === 'find-a-table') {
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
    }
    
    if (displayView === 'has-time-slots') {
      return (
        <TimeSlots
          availableTargetTimeSlots={availableTargetTimeSlots}
        />
      );
    }
  }

  render() {
    const { 
      renderDate,
      userTargetTime,
      restaurantId,
      userPartySize,
      availableTargetTimeSlots,
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
          renderDate={renderDate}
          availableTargetTimeSlots={availableTargetTimeSlots}
        />
      </div>
    );
  }
}

export default App;
