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

router.get('/datetimeslots/:restaurant_id', (req, res) => {
  const { restaurant_id } = req.params;
  const { targetDateStartUnix } = req.query;
  const targetDateEndUnix = Number(targetDateStartUnix) + 60 * 60 * 24;

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

router.post('/reservations', (req, res) => {
  const { restaurantId, targetStartTimeUnix, partySize } = req.body;
  const targetEndTimeUnix = Number(targetStartTimeUnix) + 60 * 60;

  const queryStr = 'INSERT INTO reservations (restaurantId, start_time, end_time, partySize) VALUES (?, ?, ?, ?)';
  const queryArg = [restaurantId, targetStartTimeUnix, targetEndTimeUnix, partySize];

  return db.query(queryStr, queryArg, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(201).json(data);
    }
  });
});

module.exports = router;
