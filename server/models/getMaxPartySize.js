const db = require('./db/index');

module.exports = (req, res) => {
  const { restaurantId } = req.params;

  const queryStr = 'SELECT availableSeats FROM restaurants WHERE restaurantId = ? LIMIT 1';

  return db.query(queryStr, [Number(restaurantId)], (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
};
