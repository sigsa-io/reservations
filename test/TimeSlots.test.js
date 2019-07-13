import { shallow } from 'enzyme';
import React from 'react';
import TimeSlotEntry from '../client/components/TimeSlotEntry';

describe('<TimeSlotEntry />', () => {
  const timeSlotOnClickFn = jest.fn((e, slot) => slot);
  const wrapper = shallow(<TimeSlotEntry slot="6:30" bookTimeSlot={timeSlotOnClickFn} />);

  test('should invoke onclick function', () => {
    wrapper.find('.time_slot_entry_inner').simulate('click');
    expect(timeSlotOnClickFn.mock.calls).toHaveLength(1);
  });
});
