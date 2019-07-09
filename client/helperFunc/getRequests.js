const axios = require('axios');

module.exports = {
  getTimeSlotsForDateAndTime: (requestInfo, captureData, switchView) => {
    const { restaurantId, renderDate, userTargetTime, userPartySize } = requestInfo;
    // requestInfo should be an object with restaurantId, year, date, time, partysize
    // it should expect to receive the time slots in array of objects format for 2.5hr window with correct partysize
    axios.get(`/${restaurantId}`, {
      params: { renderDate, userTargetTime, userPartySize },
    })
      .then(data => captureData(data))
      .then(switchView('has-time-slots')) // need to refactor if no time slots found
      .catch(err => console.log(err));
  }, 

  getTimeSlotsCountForDate: () => {

  }
}
