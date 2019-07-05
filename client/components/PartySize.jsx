import React from 'react';

const PartySize = () => {
    const generatePartySize = () => {
        let sizeEntry = [];

        for (let i = 0; i < 20; i ++) {
            sizeEntry.push(<option>{i}</option>);
        }

        return sizeEntry;
    }


    return (
        <div>
            <select>
                {
                    generatePartySize()
                }
            </select>
        </div>
    )
}

export default PartySize;