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

// !!to be fixed in the next PR
router.post('/:restaurant_id/:reservation_year/:reservation_month/:reservation_date/:reservation_hour/:reservation_min', (req, res) => {
  const {
    restaurant_id,
    reservation_year,
    reservation_month,
    reservation_date,
    reservation_hour,
    reservation_min,
  } = req.params;
  const { party_size } = req.body;

  return db.ReservationsTable.findOne(
    {
      where: {
        restaurant_id,
        reservation_year,
        reservation_month,
        reservation_date,
        reservation_hour,
        reservation_min,
      },
    },
  )
    .tap((reservation) => {
      reservation.decrement('available_seats', { by: party_size });
    })
    .tap((reservation) => {
      reservation.increment('restaurant_total_booking_num', { by: 1 });
    })
    .tap((reservation) => {
      const { restaurant_name } = reservation.dataValues;
      db.ReservationsUser.create({
        restaurant_name,
        restaurant_id,
        reservation_year,
        reservation_month,
        reservation_date,
        reservation_hour,
        reservation_min,
        party_size,
      });
    })
    .then(() => res.status(201).send('Reservation booked!'))
    .catch(err => res.status(500).send(err));
});

module.exports = router;
