import React from 'react';
import propTypes from 'prop-types';
import SVG from '../img/SelectionIcon';

const PartySize = (
  {
    userPartySize,
    partySizeSelectionChange,
  },
) => {
  const generatePartySize = () => {
    const sizeEntry = [];

    for (let i = 2; i < 21; i++) {
      sizeEntry.push(
        <option
          key={`size-${i}`}
          value={i}
        >
          {i}
        </option>,
      );
    }
    return sizeEntry;
  };

  return (
    <div className="reservation-selection-wrapper">
      <div className="reservation-selection-text">
        For
        {' '}
        {userPartySize}
      </div>
      <SVG
        className="selection-icon"
        viewBox="0 0 8.07 5.24"
        fill="rgb(51, 51, 51)"
      />
      <select
        className="reservation-selection"
        onChange={partySizeSelectionChange}
      >
        { generatePartySize() }
      </select>
    </div>
  );
};

PartySize.propTypes = {
  userPartySize: propTypes.number.isRequired,
  partySizeSelectionChange: propTypes.func.isRequired,
};

export default PartySize;
