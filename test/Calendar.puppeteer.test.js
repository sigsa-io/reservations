const moment = require('moment');
const puppeteer = require('puppeteer');

let browser;
let page;

describe('Show Calendar', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      slowMo: 200,
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/160822/reservations');
    await page.screenshot({ path: './test/test_img/reservation_image.jpg', type: 'jpeg' });
  });

  afterAll(async () => {
    page.close();
  });

  // evaluate innital date text
  test('should have date input field default to today\'s date', async () => {
    const dateText = await page.$eval('.date-input-text', e => e.innerHTML);
    expect(dateText).toBe(moment().format('ddd, MM/D'));
  });

  // calendar should be shown when clicked into date text
  test('calendar should be shown when clicked into date text', async () => {
    await page.click('.date-input-text');
    await page.screenshot({ path: './test/test_img/calendar_image.jpg', type: 'jpeg' });
    const hasCalendar = await page.$eval('.outer-calendar-container', e => e.innerHTML);
    expect(hasCalendar === null).toBe(false);
    await page.click('html');
  });

  test('should render next month\'s calendar when clicking next calendar button', async () => {
    await page.click('.date-input-text');
    await page.click('.calendar-right-button');
    const monthTitle = await page.$eval('.calendar-month', e => e.firstChild.innerHTML);
    expect(monthTitle).toBe(moment().add(1, 'month').format('MMMM YYYY'));
  });

  test('should capture the date selected in the calendar picker', async () => {
    await page.evaluate(() => {
      const dates = document.getElementsByClassName('out-of-calendar');
      const firstDateOnCaldendar = dates[0];
      firstDateOnCaldendar.click();
    });
    await page.screenshot({ path: './test/test_img/select_new_date_image.jpg', type: 'jpeg' });
    const dateText = await page.$eval('.date-input-text', e => e.innerHTML);
    expect(dateText).toBe('Sun, 07/28');
  });
});
