import { mount, shallow } from 'enzyme';
import moment from 'moment';
import React from 'react';
import Calendar from '../client/components/Calendar';
import CalendarDays from '../client/components/CalendarDays';
import CalendarButton from '../client/img/CalendarButton';

describe('<Calendar />', () => {
  const changeRenderDateMock = jest.fn(date => date);
  const changeShowCalendarStatusMock = jest.fn(() => true);
  const wrapper = mount(<Calendar
    renderDate={moment()}
    changeShowCalendarStatus={changeShowCalendarStatusMock}
    changeRenderDate={changeRenderDateMock}
  />);

  test('should have two buttons', () => {
    expect(wrapper.find('.calendar-left-button')).toHaveLength(1);
    expect(wrapper.find('.calendar-right-button')).toHaveLength(1);
  });

  test('should render Days and Dates', () => {
    expect(wrapper.contains(<CalendarDays />)).toBe(true);
    expect(wrapper.find('.calendar-grid')).toHaveLength(1);
  });

  test('should change momentdate in state when toNextMonth or toPriorMonth function is invoked', () => {
    const e = { preventDefault: () => {} };
    wrapper.instance().toNextMonth(e);
    expect(wrapper.instance().state.momentDate.format('YYYY MM DD')).not.toBe(moment().add(1, 'month').format('YYYY MM DD'));
    expect(wrapper.find('span').text()).toBe(moment().add(1, 'month').format('MMMM YYYY'));

    wrapper.instance().toNextMonth(e);
    wrapper.instance().toPriorMonth(e);
    expect(wrapper.instance().state.momentDate.format('YYYY MM DD')).not.toBe(moment().subtract(1, 'month').format('YYYY MM DD'));
    expect(wrapper.find('span').text()).toBe(moment().add(1, 'month').format('MMMM YYYY'));
  });
});

describe('<CalendarButton />', () => {
  const switchMonthMock = jest.fn(e => e);
  const wrapper = shallow(<CalendarButton
    switchMonth={switchMonthMock}
    buttonClass="calendar-button calendar-right-button"
  />);
  test('should invoke onClick function', () => {
    wrapper.find('svg').simulate('click');
    expect(switchMonthMock.mock.calls).toHaveLength(1);
  });
});
