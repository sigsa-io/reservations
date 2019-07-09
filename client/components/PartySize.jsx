import React from 'react';
import propTypes from 'prop-types';
import SVG from '../img/SelectionIcon';

const PartySize = (
  {
    userPartySize,
    partySizeSelectionChange,
  }
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
  }

  return (
    <div className="reservation-seleciton-wrapper">
      <div className="reservation-selection-text">
        For
        {' '}
        {userPartySize}
      </div>
      <SVG />
      <select
        className="reservation-seleciton"
        onChange={partySizeSelectionChange}
      >
        { generatePartySize() }
      </select>
    </div>
  );
}

PartySize.propTypes = {
  userPartySize: propTypes.number.isRequired,
  partySizeSelectionChange: propTypes.func.isRequired,
}

export default PartySize;
