const request = require('supertest');
const moment = require('moment');
const db = require('../server/db/index');
const app = require('../server/index');

describe('Get and Post API', () => {
  // create a mock entry in db before each test
  beforeEach(async () => {
    const queryStr = 'INSERT INTO restaurants (restaurantId, restaurantName, timeSlot, availableSeats) VALUES ?';
    const queryArg = [
      ['0001', 'Jest Mock', 9, 15],
      ['0001', 'Jest Mock', 10, 15],
      ['0001', 'Jest Mock', 17.5, 15],
      ['0001', 'Jest Mock', 18, 15],
      ['0001', 'Jest Mock', 19, 15],
    ];
    await db.query(queryStr, [queryArg]);
  });

  // delete the mock entry after each test
  afterEach(async () => {
    await db.query('DELETE FROM restaurants WHERE restaurantName = \'Jest Mock\'');
    await db.query('DELETE FROM reservations WHERE restaurantId = 0001');
  });

  test('Get the max party size for a restaurant', async() => {
    const response = await request(app).get('/seatingSize/0001');
    expect(response.body[0].availableSeats).toBe(15);
  });

  test('Get the name of a restaurant', async() => {
    const response = await request(app).get('/restaurantName/0001');
    expect(response.body[0].restaurantName).toBe('Jest Mock');
  });

  test('Get all timeslots for 2.5hr range before and after for a restaurant when there is no reservation created', async () => {
    let targetTimeUnix = moment('2019 08 04 6:30 PM', 'YYYY MM DD h:mm A').format('X');
    let userPartySize = 10;
    let response = await request(app).get('/targettimeslots/0001').query({ targetTimeUnix, userPartySize });
    expect(response.body.length).toBe(3);

    targetTimeUnix = moment('2019 08 04 5:30 AM', 'YYYY MM DD h:mm A').format('X');
    userPartySize = 10;
    response = await request(app).get('/targettimeslots/0001').query({ targetTimeUnix, userPartySize });
    expect(response.body.length).toBe(0);
  });

  test('Get all timeslots for 2.5hr range before and after for a restaurant some reservations are created', async () => {
    let targetStartTimeUnix = moment('2019 08 04 6:00 PM', 'YYYY MM DD h:mm A').format('X');
    let partySize = 15;
    await request(app).post('/reservations/0001').send({ targetStartTimeUnix, partySize });

    let targetTimeUnix = moment('2019 08 04 6:30 PM', 'YYYY MM DD h:mm A').format('X');
    let userPartySize = 10;
    let response = await request(app).get('/targettimeslots/0001').query({ targetTimeUnix, userPartySize });
    expect(response.body.length).toBe(2);

    targetTimeUnix = moment('2019 08 05 6:30 PM', 'YYYY MM DD h:mm A').format('X');
    userPartySize = 10;
    response = await request(app).get('/targettimeslots/0001').query({ targetTimeUnix, userPartySize });
    expect(response.body.length).toBe(3);
  });
});
