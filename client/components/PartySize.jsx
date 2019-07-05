import React from 'react';

const PartySize = () => {
    const generatePartySize = () => {
        let sizeEntry = [];

        for (let i = 0; i < 20; i ++) {
            sizeEntry.push(<option key={`size-${i}`} name={`size-${i}`} >{i}</option>);
        }

        return sizeEntry;
    }


    return (
        <select className="party-size-seleciton">
            {
                generatePartySize()
            }
        </select>
    )
}

export default PartySize;