const express = require('express');
const db = require('./db/index');

const router = express.Router();

router.get('/targettimeslots/:restaurant_id', (req, res) => {
  const { restaurant_id } = req.params;
  const { targetTimeUnix, userPartySize } = req.query;

  const timeLowerBound = Number(targetTimeUnix) - 60 * 60 * 2.5;
  const timeUpperBound = Number(targetTimeUnix) + 60 * 60 * 2.5;
  const partySize = Number(userPartySize);

  // need to evaluate if partysize fit
  // need to get 2.5 hr range (both before and after, thus 5hr range in total)
  const queryStr =
    'SELECT * FROM reservations_tables WHERE restaurant_id = ? ' +
    'AND availableSeats > ? AND (reservationTimeStamp BETWEEN ? AND ?)';
  const queryArg = [restaurant_id, partySize, timeLowerBound, timeUpperBound];

  return db.query(queryStr, queryArg, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
});

// get available time slots for target date
router.get('/datetimeslots/:restaurantId', (req, res) => {
  const { restaurantId } = req.params;
  const { targetDateStartUnix } = req.body;
  const targetDateEndUnix = Number(targetDateStartUnix) + 60 * 60 * 24;

  // find reservations within this unix range, partysize doesn't matter
  const queryStrReservations =
    'SELECT * FROM reservations WHERE restaurantId = ? ' +
    'AND (start_time BETWEEN ? AND ?)';
  const queryArgReservations = [restaurantId, targetDateStartUnix, targetDateEndUnix];
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
        queryArgRestaurant = [ restaurantId ];

        db.query(queryStrRestaurant, queryArgRestaurant, (err, data) => {
          if (err) {
            res.status(500).json(err);
          } else {
            console.log(data);
            res.status(200).json(data);
          }
        })
      } else {
        // we first get the reservation in 'AMPM' format but in number

      }
    }
  })




  const queryStr =
    'SELECT * FROM reservations_tables WHERE restaurant_id = ? ' +
    'AND (reservationTimeStamp BETWEEN ? AND ?)';
  const queryArg = [restaurant_id, targetDateStartUnix, targetDateEndUnix];

  return db.query(queryStr, queryArg, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
});

// create reservation when a time slot is clicked
router.post('/reservations', (req, res) => {
  const { restaurantId, targetStartTimeUnix, partySize } = req.body;
  const targetEndTimeUnix = Number(targetStartTimeUnix) + 60 * 60;

  const queryStrReservation = 'INSERT INTO reservations (restaurantId, start_time, end_time, partySize) VALUES (?, ?, ?, ?)';
  const queryArgReservation = [restaurantId, targetStartTimeUnix, targetEndTimeUnix, partySize];
  const queryStrBookingCount = 'INSERT INTO bookingCount (restaurantId, bookingCount) VALUES (?, 1) ON DUPLICATE KEY UPDATE bookingCount = VALUES(bookingCount) + 1';
  const queryArgBookingCount = [restaurantId];

  return db.query(queryStrReservation, queryArgReservation, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      // increase booking count
      db.query(queryStrBookingCount, queryArgBookingCount, (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).json(err);
        } else {
          res.status(201).json(data);
        }
      });
    }
  });
});

module.exports = router;
