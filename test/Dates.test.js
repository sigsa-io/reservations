import { mount } from 'enzyme';
import moment from 'moment';
import React from 'react';
import Dates from '../client/components/Date';

describe('<Date />', () => {
  const wrapper = mount(<Dates renderDate={moment()} />);
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation(init => [init, setState]);

  test('calendar should show when click date text field', () => {
    wrapper.find('.date_input_text').simulate('click');
    expect(wrapper.find('.outer_calendar_container')).toHaveLength(1);
  });
});
