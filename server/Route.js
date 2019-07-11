const express = require('express');
const moment = require('moment');
const db = require('./db/index');

const router = express.Router();

router.get('/bookingCount/:restaurantId', (req, res) => {
  const { restaurantId } = req.params;
  const queryStr = 'SELECT bookingCount FROM bookingCount WHERE restaurantId = ?';

  return db.query(queryStr, restaurantId, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
});

// front end will first call this to evaluate if the party size is too big
router.get('/seatingSize/:restaurantId', (req, res) => {
  const { restaurantId } = req.params;

  const queryStr = 'SELECT availableSeats FROM restaurants WHERE restaurantId = ? LIMIT 1';

  return db.query(queryStr, restaurantId, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
});

// after validating the partysize fit, then we find the available seating slots
router.get('/targettimeslots/:restaurantId', (req, res) => {
  const { restaurantId } = req.params;
  const { targetTimeUnix, userPartySize } = req.body;

  const timeLowerBound = Number(targetTimeUnix) - 60 * 60 * 2.5;
  const timeUpperBound = Number(targetTimeUnix) + 60 * 60 * 2.5;

  const targetTimeStr = moment.unix(targetTimeUnix).format('HH:mm');
  const targetTimeNum = Number(targetTimeStr.split(':')[0]) + Number(targetTimeStr.split(':')[1]) / 60;
  const targetTimeLowerBoundNum = targetTimeNum - 2.5;
  const targetTimeUpperBoundNum = targetTimeNum + 2.5;

  const partySize = Number(userPartySize);

  // find reservations within this unix range, partysize doesn't matter
  const queryStrReservations =
    'SELECT * FROM reservations WHERE restaurantId = ? ' +
    'AND start_time >= ? ' +
    'AND end_time <= ?';
  const queryArgReservations = [restaurantId, timeLowerBound, timeUpperBound];
  return db.query(queryStrReservations, queryArgReservations, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      // test if data is empty
      let queryStrRestaurant;
      let queryArgRestaurant;

      if (data.length === 0) {
        // we then provide the count of time slots from restaurant table
        queryStrRestaurant = 'SELECT COUNT(*) FROM restaurants WHERE restaurantId = ?';
        queryArgRestaurant = [restaurantId];

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
        for (let i = 0; i < data.length; i ++) {
          const timeSlotStr = moment.unix(data[i].start_time).format('HH:mm');
          const timeSlotNum = Number(timeSlotStr.split(':')[0]) + Number(timeSlotStr.split(':')[1]) / 60;
          startTimeInReservation[timeSlotNum] = startTimeInReservation[timeSlotNum] + data[i].partySize || data[i].partySize;
        }
        // find within bound time slot from restaurant table
        queryStrRestaurant =
          'SELECT * FROM restaurants WHERE restaurantId = ?' +
          'AND (timeSlot BETWEEN ? AND ?)';
        queryArgRestaurant = [restaurantId, targetTimeLowerBoundNum, targetTimeUpperBoundNum];
        db.query(queryStrRestaurant, queryArgRestaurant, (err, data) => {
          if (err) {
            res.status(500).json(err);
          } else {
            // evaluate if the time slot is full for reservation such party size
            const availableTimeSlot = [];
            for (let j = 0; j < data.length; j++) {
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
});

// create reservation when a time slot is clicked
router.post('/reservations', (req, res) => {
  const { restaurantId, targetStartTimeUnix, partySize } = req.body;
  const targetEndTimeUnix = Number(targetStartTimeUnix) + 60 * 60;

  const queryStrReservation = 'INSERT INTO reservations (restaurantId, start_time, end_time, partySize) VALUES (?, ?, ?, ?)';
  const queryArgReservation = [restaurantId, targetStartTimeUnix, targetEndTimeUnix, partySize];
  const queryStrBookingCount = 'UPDATE bookingCount SET bookingCount = bookingCount + 1 WHERE restaurantId = ?';
  const queryArgBookingCount = [restaurantId];

  return db.query(queryStrReservation, queryArgReservation, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      // increase booking count
      db.query(queryStrBookingCount, queryArgBookingCount, (err, data) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(201).json(data);
        }
      });
    }
  });
});

module.exports = router;
