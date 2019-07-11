const express = require('express');
const getTotalBookingCount = require('./models/getTotalBookingCount');
const getMaxPartySize = require('./models/getMaxPartySize');
const getTimeSlotsForDateAndTime = require('./models/getTimeSlotsForDateAndTime');
const postReservation = require('./models/postReservation');
const getRestaurantName = require('./models/getRestaurantName');

const router = express.Router();

router.get('/restaurantName/:restaurantId', getRestaurantName);
router.get('/bookingCount/:restaurantId', getTotalBookingCount);
router.get('/seatingSize/:restaurantId', getMaxPartySize);
router.get('/targettimeslots/:restaurantId', getTimeSlotsForDateAndTime);
router.post('/reservations/:restaurantId', postReservation);

module.exports = router;
