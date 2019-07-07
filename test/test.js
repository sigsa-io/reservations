const request = require('supertest');
const db = require('../server/db/index');
const app = require('../server/index');

describe('Get and Post API', () => {
  // create a mock entry in db before each test
  beforeEach(async () => {
    await db.ReservationsTable.create({
      restaurant_name: 'Jest Mock',
      restaurant_id: '0001',
      reservation_date: 5,
      reservation_month: 7,
      reservation_year: 2019,
      reservation_hour: 8,
      reservation_min: 30,
      available_seats: 80,
    });
  });

  // delete the mock entry after each test
  afterEach(async () => {
    await db.ReservationsTable.destroy({ where: { restaurant_name: 'Jest Mock' } });
  });

  // test GET API
  test('Get reservation data for a specific restaurant', async () => {
    const response = await request(app).get('/0001');
    expect(response.body[0].available_seats).toEqual(80);
    expect(response.statusCode).toBe(200);
  });

  // test POST API
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
