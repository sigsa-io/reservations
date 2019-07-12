const db = require('../db/index');

module.exports = (req, res) => {
  const { restaurantId } = req.params;
  const { targetStartTimeUnix, partySize } = req.body;
  const targetEndTimeUnix = Number(targetStartTimeUnix) + 60 * 60;

  const queryStrReservation = 'INSERT INTO reservations (restaurantId, start_time, end_time, partySize) VALUES (?, ?, ?, ?)';
  const queryArgReservation = [restaurantId, targetStartTimeUnix, targetEndTimeUnix, partySize];
  const queryStrBookingCount = 'UPDATE bookingCount SET bookingCount = bookingCount + 1 WHERE restaurantId = ?';
  const queryArgBookingCount = [restaurantId];

  return db.query(queryStrReservation, queryArgReservation, (err) => {
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
};
