import React from 'react';
import SVG from '../img/SelectionIcon';

class PartySize extends React.Component {
  constructor() {
    super();

    this.state = {
      partySize: 2,
    };

    this.generatePartySize = this.generatePartySize.bind(this);
    this.selectionChange = this.selectionChange.bind(this);
  }

  generatePartySize() {
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

  selectionChange(e) {
    this.setState({ partySize: e.target.value });
  }

  render() {
    const { partySize } = this.state;

    return (
      <div className="reservation-seleciton-wrapper">
        <div className="reservation-selection-text">
          For
          {' '}
          {partySize}
        </div>
        <SVG />
        <select
          className="reservation-seleciton"
          onChange={this.selectionChange}
        >
          { this.generatePartySize() }
        </select>
      </div>
    );
  }
}

export default PartySize;
