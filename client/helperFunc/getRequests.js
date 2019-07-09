import axios from 'axios';
import moment from 'moment';

const getRequests = {
  getTimeSlotsForDateAndTime: (requestInfo, captureData, switchView) => {
    // requestInfo should be an object with restaurantId, year, date, time, partysize
    const { restaurantId, renderDate, userTargetTime, userPartySize } = requestInfo;
    // sanitize the request timestamp before sending to server
    const targetDateTimeStr = renderDate.startOf('day').format('YYYY MM DD') + ' ' + userTargetTime;
    const targetTimeUnxi = moment(targetDateTimeStr, 'YYYY MM DD h:mm AA').format('X');

    // it should expect to receive the time slots in array of objects format for 2.5hr window with correct partysize
    axios.get(`/${restaurantId}`, {
      params: { targetTimeUnxi, userPartySize },
    })
      .then(data => captureData(data))
      .then(switchView('has-time-slots')) // need to refactor if no time slots found
      .catch(err => console.log(err));
  }, 

  getTimeSlotsCountForDate: () => {

  }
}

export default getRequests;