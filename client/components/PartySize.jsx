import React from 'react';
import SVG from '../img/SelectionIcon.jsx';

class PartySize extends React.Component {
  constructor() {
    super();

    this.state = {
      partySize: 2,
    }

    this.generatePartySize = this.generatePartySize.bind(this);
    this.selectionChange = this.selectionChange.bind(this);
  }

  generatePartySize() {
    let sizeEntry = [];

    for (let i = 2; i < 21; i ++) {
      sizeEntry.push(
        <option 
          key={`size-${i}`} 
          value={i}
        >
          {i}
        </option>
      );
    }
    return sizeEntry;
  }

  selectionChange(e) {
    this.setState({partySize: e.target.value});
  }

  render() {
    const { partySize } = this.state;
    const { selectionChange, generatePartySize } = this;

    return (
      <div className="party-size-seleciton-wrapper">
        <div className="party-size-selection-text">For {partySize}</div>
        <SVG />
        <select 
          className="party-size-seleciton"
          onChange={selectionChange}
        >
          { generatePartySize() }
        </select>
      </div>
    );
  }
};

export default PartySize;
