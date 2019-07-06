import React from 'react';
import PartySize from './PartySize';
import Time from './Time';
import Date from './Date';

class SizeDateTime extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="reservation-detail-wrapper">
        <div className="reservation-detail-selection">
          <div>
            <h4 className="reservation-detail-title">Party Size</h4>
            <PartySize />
          </div>
        </div>
        <div className="reservation-detail-date-time-wrapper">
          <div className="reservation-detail-date-wrapper">
            <h4 className="reservation-detail-title">Date</h4>
            <Date />
          </div>
          <div className="reservation-detail-time-wrapper">
            <h4 className="reservation-detail-title">Time</h4>
            <Time />
          </div>
        </div>
      </div>
    );
  }
}

export default SizeDateTime;
