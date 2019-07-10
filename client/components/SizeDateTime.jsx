import React from 'react';
import propTypes from 'prop-types';
import moment from 'moment';
import PartySize from './PartySize';
import Time from './Time';
import Date from './Date';

const SizeDateTime = (
  { renderDate,
    changeRenderDate,
    userTargetTime,
    timeSelectionChange,
    userPartySize,
    partySizeSelectionChange,
  }
) => {
  return (
    <div>
      <div className="reservation-detail-selection">
        <div>
          <h4 className="reservation-detail-title">Party Size</h4>
          <PartySize
            userPartySize={userPartySize}
            partySizeSelectionChange={partySizeSelectionChange}
          />
        </div>
      </div>
      <div className="reservation-detail-date-time-wrapper">
        <div className="reservation-detail-date-wrapper">
          <h4 className="reservation-detail-title">Date</h4>
          <Date
            renderDate={renderDate}
            changeRenderDate={changeRenderDate}
          />
        </div>
        <div className="reservation-detail-time-wrapper">
          <h4 className="reservation-detail-title">Time</h4>
          <Time
            userTargetTime={userTargetTime}
            timeSelectionChange={timeSelectionChange}
          />
        </div>
      </div>
    </div>
  )
}

SizeDateTime.propTypes = {
  renderDate: propTypes.instanceOf(moment).isRequired,
  changeRenderDate: propTypes.func.isRequired,
}

export default SizeDateTime;
