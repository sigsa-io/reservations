const db = require('./index.js');
const restaurantNameId = require('./restaurantData.js');

const timeSlotOptions = () => {
  const options = [];

  for (let slot = 9; slot < 21; slot += 0.5) {
    options.push(slot);
  }
  return options;
}

const shuffleArr = function(arr) {
  let curIndex = arr.length - 1;
  
  // the first index won't be shuffled in this loop
  while (curIndex >= 0) {
    const randomIndex = Math.floor(Math.random() * curIndex);
    const temp = arr[randomIndex];
    arr[randomIndex] = arr[curIndex];
    arr[curIndex] = temp;
    curIndex --;
  }

  return arr;
};


const createSeedRestaurants = (restaurantNameId) => {
  const seed = [];
  const timeSlotOptionsArr = timeSlotOptions();

  for (let id in restaurantNameId) {
    const randomTimeSlots = shuffleArr(timeSlotOptionsArr);
    const restaurantId = restaurantNameId[id].restaurant_id;
    const restaurantName = restaurantNameId[id].restaurant_name;
    const availableSeats = Math.floor(Math.random() * 30) + 5;
    let restaurantTimeSlotNum = Math.floor(Math.random() * 10) + 2;
    
    while (restaurantTimeSlotNum > 0) {
      seed.push([ restaurantId, restaurantName, randomTimeSlots[restaurantTimeSlotNum], availableSeats ]);
      restaurantTimeSlotNum --;
    }
  }

  return seed;
}

const createSeedBookingCount = (restaurantNameId) => {
  return restaurantNameId.map(id => [Number(id.restaurant_id)]);
}

const insertToReservationTable = () => {
  const seedRestaurants = createSeedRestaurants(restaurantNameId);
  const seedBookingCount = createSeedBookingCount(restaurantNameId);

  const queryStrRestaurants = 'INSERT INTO restaurants (restaurantId, restaurantName, timeSlot, availableSeats) VALUES ?';
  db.query(queryStrRestaurants, [seedRestaurants], (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    return;
  });

  const queryStrBookingCount = 'INSERT INTO bookingCount (restaurantId) VALUES ?';
  db.query(queryStrBookingCount, [seedBookingCount], (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    return;
  });

};

insertToReservationTable();
