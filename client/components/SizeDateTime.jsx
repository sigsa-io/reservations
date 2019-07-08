import React from 'react';
import moment from 'moment';
import PartySize from './PartySize';
import Time from './Time';
import Date from './Date';

class SizeDateTime extends React.Component {
  constructor() {
    super();

    this.state = {
      renderDate: moment(),
    }

    this.changeRenderDate = this.changeRenderDate.bind(this);
  }

  changeRenderDate(newDate) {
    // newDate should be a moment object
    this.setState({
      renderDate: newDate,
    });
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
            <Date
              renderDate={this.state.renderDate}
              changeRenderDate={this.changeRenderDate}
            />
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
