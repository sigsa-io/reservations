import axios from 'axios';
import moment from 'moment';

const getRequests = {

  getMaxPartySize: (restaurantId, cb) => {
    axios.get(`/seatingSize/${restaurantId}`)
      .then(({data}) => {
        cb(data[0].availableSeats);
      })
      .catch(err => console.log(err));
  },

  getTimeSlotsForDateAndTime: (requestInfo, captureData) => {
    const {
      restaurantId, renderDate, userTargetTime, userPartySize,
    } = requestInfo;
    const targetDateTimeStr = renderDate.startOf('day').format('YYYY MM DD') + ' ' + userTargetTime;
    const targetTimeUnix = moment(targetDateTimeStr, 'YYYY MM DD h:mm AA').format('X');

    axios.get(`/targettimeslots/${restaurantId}`, {
      params: { targetTimeUnix, userPartySize },
    })
      .then(({ data }) => {
        const timeSlotStrArr = data.map(slot => (
          moment(Math.floor(slot.timeSlot) + ':' + (slot.timeSlot - Math.floor(slot.timeSlot)) * 60, 'HH:mm').format('h:mm A')
        ));
        captureData(timeSlotStrArr);
      })
      .catch(err => console.log(err));
  },

  getTotalBookingCount: (requestInfo, cb) => {
    const { restaurantId } = requestInfo; 
    axios.get(`/bookingCount/${restaurantId}`)
      .then(({data}) => {
        cb(data[0].bookingCount);
      })
      .catch(err => console.log(err));
  },
};

export default getRequests;
