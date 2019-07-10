const moment = require('moment');
const db = require('./index.js');
const restaurantNameId = require('./restaurantData.js');

// get each day's starting unix first, then add additinal hours to the starting point

// only available for the next 90 days reservation
const createSeed = (days, restaurantNameId, data = []) => {

  for (let i = 0; i < restaurantNameId.length; i++) {
    const { restaurant_name, restaurant_id } = restaurantNameId[i];

    // generate date for the next 90 days
    let dateCount = 0;
    let todayStartingUnix = moment().startOf('day').format('X');
    while (dateCount < days) {
      let timeSlotCount = 6;

      // generate 6 random time slots
      while (timeSlotCount > 0) {
        // hour and min randomizer
        const randHourNum = 9 + 0.5 * Math.floor(Math.random() * 24); // 24 hour from 9am - 9pm
        const randHourUnix = 60 * 60 * randHourNum;
        const reservationTimeStamp = Number(todayStartingUnix) + randHourUnix;
        const availableSeats = Math.floor(Math.random() * 20) + 5;

        const curData = [
          restaurant_id,
          restaurant_name,
          reservationTimeStamp,
          availableSeats,
        ];

        data.push(curData);
        timeSlotCount --;
      }

      dateCount += 1;
      todayStartingUnix = moment().add(dateCount, 'day').startOf('day').format('X');
    }
  }

  return data;
};

const insertToReservationTable = () => {
  const seed = createSeed(90, restaurantNameId);

  const queryStr = 'INSERT INTO reservations_tables (restaurant_id, restaurant_name, reservationTimeStamp, availableSeats) VALUES ?';
  db.query(queryStr, [seed], (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(data);
    return;
  });
};

insertToReservationTable();

module.exports = createSeed;