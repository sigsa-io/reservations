import React from 'react';
import propTypes from 'prop-types';
import moment from 'moment';
import PartySize from './PartySize';
import Time from './Time';
import Date from './Date';
import style from '../style/selection.css';

const SizeDateTime = (
  {
    renderDate,
    changeRenderDate,
    userTargetTime,
    timeSelectionChange,
    userPartySize,
    partySizeSelectionChange,
  },
) => (
  <div>
    <div className={style.reservation_detail_selection}>
      <div>
        <h4 className={style.reservation_detail_title}>Party Size</h4>
        <PartySize
          userPartySize={userPartySize}
          partySizeSelectionChange={partySizeSelectionChange}
        />
      </div>
    </div>
    <div className={style.reservation_detail_date_time_wrapper}>
      <div className={style.reservation_detail_date_wrapper}>
        <h4 className={style.reservation_detail_title}>Date</h4>
        <Date
          renderDate={renderDate}
          changeRenderDate={changeRenderDate}
        />
      </div>
      <div className={style.reservation_detail_time_wrapper}>
        <h4 className={style.reservation_detail_title}>Time</h4>
        <Time
          userTargetTime={userTargetTime}
          timeSelectionChange={timeSelectionChange}
        />
      </div>
    </div>
  </div>
);

SizeDateTime.propTypes = {
  renderDate: propTypes.instanceOf(moment).isRequired,
  changeRenderDate: propTypes.func.isRequired,
  userTargetTime: propTypes.string.isRequired,
  timeSelectionChange: propTypes.func.isRequired,
  userPartySize: propTypes.number.isRequired,
  partySizeSelectionChange: propTypes.func.isRequired,
};

export default SizeDateTime;
