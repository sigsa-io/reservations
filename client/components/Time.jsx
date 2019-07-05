import React from 'react';
import moment from 'moment';

const Time = () => {

    const timeGenerator = () => {
        let timeEntry = [];
        let hourCount = 47;
        let time = moment.startOf('day');

        while (hourCount > 0) {
            timeEntry.push(
                <option 
                    key={`${time.hour()-time.minute()}`} 
                    name={`${time.hour()-time.minute()}`}
                >
                    {time.format('hh:mm A')}
                </option>
            );
            
            time.add(30, 'mintues');
            hourCount --;
        }
    };

    return (
        <select>
            {timeGenerator()}
        </select>
    );
};

export default Time;