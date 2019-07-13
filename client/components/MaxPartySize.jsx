import React from 'react';
import propTypes from 'prop-types';
import SVG from '../img/Warning';
import style from '../style/message.css';
import iconStyle from '../style/selectionIcon.css';

const MaxPartySize = ({ restaurantName }) => (
  <span className={style.no_time_slot_wrapper}>
    <div className={style.no_time_slot}>
      <div className={style.no_time_slot_text_wrap}>
        <SVG
          className={iconStyle.no_time_slot_warning}
          viewBox="0 0 1000 1000"
          fill="333333"
        />
        {`Unfortunately, your party is too large to make an online reservation at ${restaurantName}. 
            We recommend contacting the restaurant directly.`}
      </div>
    </div>
  </span>
);

MaxPartySize.propTypes = {
  restaurantName: propTypes.string.isRequired,
};

export default MaxPartySize;
