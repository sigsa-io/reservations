const moment = require('moment');
const db = require('../db/index');

module.exports = (req, res) => {
  const { restaurantId } = req.params;
  const { targetTimeUnix, userPartySize } = req.query;

  if (!targetTimeUnix || !userPartySize) {
    res.sendStatus(401);
  }

  const timeLowerBound = Number(targetTimeUnix) - 60 * 60 * 2.5;
  const timeUpperBound = Number(targetTimeUnix) + 60 * 60 * 2.5;

  const targetTimeStr = moment.unix(targetTimeUnix).format('HH:mm');
  const targetTimeNum = Number(targetTimeStr.split(':')[0]) + Number(targetTimeStr.split(':')[1]) / 60;
  const targetTimeLowerBoundNum = targetTimeNum - 2.5;
  const targetTimeUpperBoundNum = targetTimeNum + 2.5;

  const partySize = Number(userPartySize);

  // find reservations within this unix range, partysize doesn't matter
  const queryStrReservations = 'SELECT * FROM reservations WHERE restaurantId = ? '
    + 'AND start_time >= ? '
    + 'AND end_time <= ?';
  const queryArgReservations = [restaurantId, timeLowerBound, timeUpperBound];
  return db.query(queryStrReservations, queryArgReservations, (reservationErr, reservationData) => {
    if (reservationErr) {
      res.status(500).json(reservationErr);
    } else {
      // test if data is empty
      let queryStrRestaurant;
      let queryArgRestaurant;

      if (reservationData.length === 0) {
        // we then provide the count of time slots from restaurant table
        queryStrRestaurant = 'SELECT * FROM restaurants WHERE restaurantId = ? '
        + 'AND (timeSlot BETWEEN ? AND ?) ORDER BY timeSlot';
        queryArgRestaurant = [restaurantId, targetTimeLowerBoundNum, targetTimeUpperBoundNum];

        db.query(queryStrRestaurant, queryArgRestaurant, (err, data) => {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(200).json(data);
          }
        });
      } else {
        // we first get the reservation start_time in 'AMPM' format but in number
        const startTimeInReservation = {};
        for (let i = 0; i < reservationData.length; i += 1) {
          const timeSlotStr = moment.unix(reservationData[i].start_time).format('HH:mm');
          const timeSlotNum = Number(timeSlotStr.split(':')[0]) + Number(timeSlotStr.split(':')[1]) / 60;
          startTimeInReservation[timeSlotNum] = startTimeInReservation[timeSlotNum] + reservationData[i].partySize || reservationData[i].partySize;
        }
        // find within bound time slot from restaurant table
        queryStrRestaurant = 'SELECT * FROM restaurants WHERE restaurantId = ?'
          + 'AND (timeSlot BETWEEN ? AND ?)'
          + 'ORDER BY timeSlot';
        queryArgRestaurant = [restaurantId, targetTimeLowerBoundNum, targetTimeUpperBoundNum];
        db.query(queryStrRestaurant, queryArgRestaurant, (err, data) => {
          if (err) {
            res.status(500).json(err);
          } else {
            // evaluate if the time slot is full for reservation such party size
            const availableTimeSlot = [];
            for (let j = 0; j < data.length; j += 1) {
              if (startTimeInReservation[data[j].timeSlot]) {
                if (data[j].availableSeats - startTimeInReservation[data[j].timeSlot] > partySize) {
                  availableTimeSlot.push(data[j]);
                }
              } else {
                availableTimeSlot.push(data[j]);
              }
            }
            res.status(200).json(availableTimeSlot);
          }
        });
      }
    }
  });
};
