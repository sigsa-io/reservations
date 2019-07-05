import React from 'react';
import moment from 'moment';

const Time = () => {

    const timeGenerator = () => {
        let timeEntry = [];
        let hourCount = 48;
        let time = moment().startOf('day');

        while (hourCount > 0) {
            timeEntry.push(
                <option 
                    key={`${time.format('HH')}-${time.format('mm')}`} 
                    name={`${time.format('HH')}-${time.format('mm')}`}
                >
                    {time.format('hh:mm A')}
                </option>
            );
            
            time.add(30, 'minute');
            hourCount --;
        }

        return timeEntry;
    };

    return (
        <select>
            {timeGenerator()}
        </select>
    );
};

export default Time;