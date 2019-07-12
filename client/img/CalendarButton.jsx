import React from 'react';
import moment from 'moment';
import propTypes from 'prop-types';

const SVG = ({
  momentDate, buttonClass, switchMonth, viewBox,
}) => {
  const checkPastMonth = () => {
    const priorMonth = momentDate.clone().subtract(1, 'month');
    const curMonth = moment();

    if (priorMonth.diff(curMonth, 'month') >= 0) {
      return true;
    }

    return false;
  };

  const getFill = (input) => {
    if (input === buttonClass) {
      if (buttonClass.includes('calendar-left-button') && !checkPastMonth()) {
        return `${input} diable-switch-calendar`;
      }
      return input;
    }
    if (buttonClass.includes('calendar-left-button') && !checkPastMonth()) {
      return '#d8d9db';
    }
    return input;
  };

  return (
    <svg
      className={getFill(buttonClass)}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      onClick={e => switchMonth(e)}
    >
      <path
        fill={getFill()}
        d="M5.09 3.68L4.39 3 1.56.15a.5.5 0 0 0-.71 0l-.7.7a.5.5 0 0 0 0 .71L2.62 4 .15 6.51a.5.5 0 0 0 0 .71l.71.71a.5.5 0 0 0 .71 0L4.39 5.1l.71-.71a.5.5 0 0 0-.01-.71z"
      />
    </svg>
  );
};

SVG.propTypes = {
  buttonClass: propTypes.string.isRequired,
  switchMonth: propTypes.func.isRequired,
  momentDate: propTypes.instanceOf(moment).isRequired,
  viewBox: propTypes.string.isRequired,
};

export default SVG;
