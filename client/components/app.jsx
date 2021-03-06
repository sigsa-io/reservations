import React from 'react';
import moment from 'moment';
import SizeDateTime from './SizeDateTime';
import BookingStat from './BookingStat';
import TimeSlots from './TimeSlots';
import NoTimeSlot from './NoTimeSlot';
import MaxPartySize from './MaxPartySize';
import SuccessfulBooking from './SuccessfulBooking';
import getRequests from '../helperFunc/getRequests';
import postRequests from '../helperFunc/postRequests';
import style from '../style/app.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurantId: null,
      restaurantName: '',
      renderDate: moment(), // default render date is today
      userTargetTime: '6:30 PM', // default target time for initial render is 6:30 pm
      userPartySize: 2, // default render partySize is 2
      displayView: 'find-a-table', // default display is 'find a table' button
      availableTargetTimeSlots: [],
      bookingCount: 0,
      bookedTimeSlot: '',
      inLuckView: false,
    };

    this.changeRenderDate = this.changeRenderDate.bind(this);
    this.timeSelectionChange = this.timeSelectionChange.bind(this);
    this.partySizeSelectionChange = this.partySizeSelectionChange.bind(this);
    this.renderView = this.renderView.bind(this);
    this.getTimeSlot = this.getTimeSlot.bind(this);
    this.bookTimeSlot = this.bookTimeSlot.bind(this);
  }

  // componentDidMount will get initial restaurantId
  componentDidMount() {
    const restaurantId = window.location.pathname.split('/')[1];

    getRequests.getTotalBookingCount(restaurantId, (bookingCount) => {
      getRequests.getRestaurantName(restaurantId, (restaurantName) => {
        this.setState({ bookingCount, restaurantId, restaurantName });
      });
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
          inLuckView: true,
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
    });
  }

  // invoke from calendar dates
  changeRenderDate(newDate) {
    this.setState({
      renderDate: newDate,
      displayView: 'find-a-table',
      inLuckView: false,
    });
  }

  // invoke from time selection drop down
  timeSelectionChange(e) {
    this.setState({
      userTargetTime: e.target.value,
      displayView: 'find-a-table',
      inLuckView: false,
    });
  }

  // invoke from partySize selection drop down
  partySizeSelectionChange(e) {
    this.setState({
      userPartySize: e.target.value,
      displayView: 'find-a-table',
      inLuckView: false,
    });
  }

  // book time slot
  bookTimeSlot(e, bookingTimeSlot) {
    const {
      restaurantId, renderDate, userPartySize,
    } = this.state;
    const requestInfo = {
      restaurantId, renderDate, userPartySize, bookingTimeSlot,
    };

    postRequests.bookTimeSlot(requestInfo, () => {
      getRequests.getTotalBookingCount(restaurantId, (bookingCount) => {
        this.setState({
          bookingCount,
          displayView: 'successful-book-time',
          bookedTimeSlot: bookingTimeSlot,
        });
      });
    });
  }

  // render button or timeslots
  renderView() {
    const {
      displayView,
      userTargetTime,
      availableTargetTimeSlots,
      bookedTimeSlot,
      renderDate,
      restaurantName,
    } = this.state;

    if (displayView === 'find-a-table') {
      return (
        <div className={style.find_a_table_wrapper}>
          <button
            className={style.find_a_table_button}
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
          bookTimeSlot={this.bookTimeSlot}
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
        <MaxPartySize
          restaurantName={restaurantName}
        />
      );
    }

    if (displayView === 'successful-book-time') {
      return (
        <SuccessfulBooking
          renderDate={renderDate}
          bookedTimeSlot={bookedTimeSlot}
          restaurantName={restaurantName}
        />
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
      inLuckView,
    } = this.state;

    return (
      <div className={style.reservation_frame}>
        <div className={style.reservation_title_wrapper}>
          <h3 className={style.reservation_title}>
            <span>Make a reservation</span>
          </h3>
        </div>
        <div className={style.reservation_detail_wrapper}>
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
            inLuckView={inLuckView}
          />
        </div>
      </div>
    );
  }
}

export default App;
