const express = require('express');
const db = require('./db/index');

const router = express.Router();

router.get('/:restaurant_id', (req, res) => {
  const { restaurant_id } = req.params;

  return db.ReservationsTable.findAll(
    { where: { restaurant_id } },
  )
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

router.post('/:restaurant_id/:reservation_year/:reservation_month/:reservation_date/:reservation_hour/:reservation_min', (req, res) => {
  const { restaurant_id, reservation_year, reservation_month, reservation_date, reservation_hour, reservation_min } = req.params;
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
