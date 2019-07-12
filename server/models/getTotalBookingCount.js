const db = require('../db/index');

module.exports = (req, res) => {
  const { restaurantId } = req.params;
  const queryStr = 'SELECT bookingCount FROM bookingCount WHERE restaurantId = ?';

  return db.query(queryStr, restaurantId, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
};
