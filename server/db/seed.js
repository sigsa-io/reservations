const Reservations = require('./index.js');
const _restaurant_name_id = require('./restaurantData.js');
const moment = require('moment');

// only available for the next 30 days reservation
const createSeed = (days, data = []) => {
    let dateCount = days;
    let today = moment();
    
    for (let i = 0; i < _restaurant_name_id.length; i ++) {
        const { restaurant_name, restaurant_id } = _restaurant_name_id[i];

        // generate date for the next 90 days
        while (dateCount >= 0) {
            let timeSlotCount = 6;

            const reservation_date = today.date();// note: moment.date() is a number from 1 through 31
            const reservation_month = today.month(); // note: moment.month() is a number from 0 through 11
            const reservation_year = today.year();

            // generate 6 random time slots
            while (timeSlotCount > 0) {
                // hour and min randomizer
                const reservation_hour = 9 + Math.floor(Math.random() * 12);
                const reservation_min = 30 * (Math.floor(Math.random() * 2) % 2);
                const available_seats = Math.floor(Math.random() * 20) + 5;

                const curData = { 
                    restaurant_name, 
                    restaurant_id, 
                    reservation_date, 
                    reservation_month,
                    reservation_year,
                    reservation_hour,
                    reservation_min,
                    available_seats,
                };

                data.push(curData);
                timeSlotCount --;
            }

            today.add(1, 'day');
            dateCount --;
        }
    }

    return data;
};

const insertToReservationTable = () => {
    const seed = createSeed(90);

    Reservations.Reservations_table.bulkCreate(seed)
    .then(() => console.log('data created'))
    .catch(err => console.log(err));
};

insertToReservationTable();