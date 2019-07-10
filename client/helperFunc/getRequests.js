import axios from 'axios';
import moment from 'moment';

const getRequests = {
  getTimeSlotsForDateAndTime: (requestInfo, captureData) => {
    const {
      restaurantId, renderDate, userTargetTime, userPartySize,
    } = requestInfo;
    const targetDateTimeStr = renderDate.startOf('day').format('YYYY MM DD') + ' ' + userTargetTime;
    const targetTimeUnix = moment(targetDateTimeStr, 'YYYY MM DD h:mm AA').format('X');

    axios.get(`/targettimeslots/${restaurantId}`, {
      params: { targetTimeUnix, userPartySize },
    })
      .then(({ data }) => captureData(data))
      .catch(err => console.log(err));
  },

  getTimeSlotsCountForDate: (requestInfo, cb) => {
    const { restaurantId, renderDate } = requestInfo;
    const targetDateStartUnix = renderDate.startOf('day').format('X');

    axios.get(`/datetimeslots/${restaurantId}`, {
      params: { targetDateStartUnix },
    })
      .then(({ data }) => cb(data.length))
      .catch(err => console.log(err));
  },
};

export default getRequests;
