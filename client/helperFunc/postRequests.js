import axios from 'axios';
import moment from 'moment';

const postRequest = {
  bookTimeSlot: (requestInfo, cb) => {
    const { restaurantId, renderDate, userPartySize, bookingTimeSlot } = requestInfo;
    const partySize = userPartySize;
    const targetStartTimeUnix = moment(renderDate.format('YYYY MM DD') + ' ' + bookingTimeSlot, 'YYYY MM DD h:mm A').format('X');

    axios.post(`/reservations/${restaurantId}`, { targetStartTimeUnix, partySize })
      .then(() => cb())
      .catch(err => console.log(err));
  },
}

export default postRequest;
