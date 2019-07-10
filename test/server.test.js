const request = require('supertest');
const db = require('../server/db/index');
const app = require('../server/index');

describe('Get and Post API', () => {
  // create a mock entry in db before each test
  beforeEach(async () => {
    const queryStr = 'INSERT INTO reservations_tables (restaurant_id, restaurant_name, reservationTimeStamp, availableSeats) VALUES ?';
    const queryArg = [
      ['0001', 'Jest Mock', 1562707800, 20], // 7/9/19 9:30pm
      ['0001', 'Jest Mock', 1562704200, 3], // 7/9/19 8:30pm
      ['0001', 'Jest Mock', 1562700600, 10], // 7/9/19 7:30pm
      ['0001', 'Jest Mock', 1562698800, 15], // 7/9/19 7:00pm
      ['0001', 'Jest Mock', 1562794200, 9], // 7/10/19 9:30pm
      ['0001', 'Jest Mock', 1562774400, 18], // 7/10/19 4:00pm
    ];
    await db.query(queryStr, [queryArg]);
  });

  // delete the mock entry after each test
  afterEach(async () => {
    const queryStr = 'DELETE FROM reservations_tables WHERE restaurant_name = \'Jest Mock\'';
    await db.query(queryStr);
  });

  // test GET API
  // TO FIX in db refactor branch
  test('Get timeslots for 2.5hr range before and after for a restaurant', async () => {
    const response = await request(app).get('/0001',
      {
        partySize: 5,
        targetTimeStamp: 1562700600,
      },
    );
    expect(response.body[0].timeSlots.length).toEqual(2);
    expect(response.statusCode).toBe(200);
  });

  // test POST API
  // TO FIX in db refactor branch
  test('Reserving a table should descrease the available seating in restaurant', async () => {
    const response = await request(app).post('/0001/2019/7/5/8/30').send({ party_size: 10 });
    expect(response.statusCode).toBe(201);

    const RestaurantReservation = await request(app).get('/0001');
    expect(RestaurantReservation.body[0].available_seats).toEqual(70);
    expect(RestaurantReservation.statusCode).toBe(200);

    const userReservation = await db.ReservationsUser.findOne({ where: { restaurant_name: 'Jest Mock' } });
    expect(userReservation.dataValues.party_size).toBe(10);
    expect(userReservation.dataValues.reservation_month).toBe(7);
    expect(userReservation.dataValues.reservation_hour).toBe(8);

    await db.ReservationsUser.destroy({ where: { restaurant_name: 'Jest Mock' } });
  });
});
