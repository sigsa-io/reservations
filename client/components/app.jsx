import React from 'react';
import moment from 'moment';
import SizeDateTime from './SizeDateTime';
import BookingStat from './BookingStat';
import TimeSlots from './TimeSlots';
import NoTimeSlot from './NoTimeSlot';
import MaxPartySize from './MaxPartySize';
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
      availableTargetTimeSlots: [],
      bookingCount: 0,
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
    const requestInfo = { restaurantId };

    getRequests.getTotalBookingCount(requestInfo, (bookingCount) => {
      this.setState({ bookingCount, restaurantId })
    });
  }

  // get timeslots in an array with correct partysize and time range
  getTimeSlot() {
    const {
      restaurantId, renderDate, userTargetTime, userPartySize,
    } = this.state;
    const requestInfo = {
      restaurantId, renderDate, userTargetTime, userPartySize,
    };
    const captureData = (data) => {
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

    getRequests.getMaxPartySize(restaurantId, (restaurantMaxSeat) => {
      if (userPartySize > restaurantMaxSeat) {
        this.setState({
          displayView: 'max-party-size',
        });
      } else {
        getRequests.getTimeSlotsForDateAndTime(requestInfo, captureData);
      }
    })

  }

  // invoke from calendar dates
  changeRenderDate(newDate) {
    this.setState({
      renderDate: newDate,
      displayView: 'find-a-table',
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

  // render button or timeslots
  renderView() {
    const { displayView, userTargetTime, availableTargetTimeSlots } = this.state;

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

    if (displayView === 'no-time-slots') {
      return (
        <NoTimeSlot
          userTargetTime={userTargetTime}
        />
      );
    }

    if (displayView === 'max-party-size') {
      return (
        <MaxPartySize />
      );
    }

    return <div />;
  }

  render() {
    const {
      renderDate,
      userTargetTime,
      userPartySize,
      availableTargetTimeSlots,
      bookingCount,
    } = this.state;

    return (
      <div className="reservation-frame">
        <div className="reservation-title-wrapper">
          <h3 className="reservation-title">
            <span>Make a reservation</span>
          </h3>
        </div>
        <div className="reservation-detail-wrapper">
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
            bookingCount={bookingCount}
            availableTargetTimeSlots={availableTargetTimeSlots}
          />
        </div>
      </div>
    );
  }
}

export default App;
