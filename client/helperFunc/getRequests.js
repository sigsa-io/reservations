import axios from 'axios';
import moment from 'moment';

const getRequests = {
  getTimeSlotsForDateAndTime: (requestInfo, captureData, switchView) => {
    // requestInfo should be an object with restaurantId, year, date, time, partysize
    const { restaurantId, renderDate, userTargetTime, userPartySize } = requestInfo;
    // sanitize the request timestamp before sending to server
    const targetDateTimeStr = renderDate.startOf('day').format('YYYY MM DD') + ' ' + userTargetTime;
    const targetTimeUnix = moment(targetDateTimeStr, 'YYYY MM DD h:mm AA').format('X');

    // it should expect to receive the time slots in array of objects format for 2.5hr window with correct partysize
    axios.get(`/targettimeslots/${restaurantId}`, {
      params: { targetTimeUnix, userPartySize },
    })
      .then(data => captureData(data))
      .then(switchView('has-time-slots')) // need to refactor if no time slots found
      .catch(err => console.log(err));
  }, 

  getTimeSlotsCountForDate: (requestInfo, cb) => {
    const { restaurantId, renderDate } = requestInfo;
    const targetDateStartUnix = renderDate.startOf('day').format('X');

    axios.get(`/datetimeslots/${restaurantId}`, {
      params: { targetDateStartUnix },
    })
      .then(({data}) => cb(data.length))
      .catch(err => console.log(err));
  }
}

export default getRequests;