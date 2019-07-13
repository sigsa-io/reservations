import { mount } from 'enzyme';
import React from 'react';
import moment from 'moment';
import App from '../client/components/app';

describe('App Component', () => {
  const wrapper = mount(<App />);
  wrapper.instance();

  test('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('should change state when componentDidMount is invoked', () => {
    expect(wrapper.state.restaurantId).not.toBe(null);
    expect(wrapper.state.restaurantName).not.toBe('');
  });

  test('when booking table button is clicked, displayView state change', async () => {
    await wrapper.find('.find_a_table_button').simulate('click');
    expect(wrapper.state.displayView).not.toBe('find-a-table');
  });

  test('shows success message when displayView is \'successful-book-time\'', async () => {
    await wrapper.setState({ displayView: 'successful-book-time' });
    expect(wrapper.exists('.successful_booking_text_wrap')).toBe(true);
  });

  test('shows success message when displayView is \'has-time-slots\'', async () => {
    await wrapper.setState({ displayView: 'has-time-slots' });
    expect(wrapper.exists('.time_slot_wrapper')).toBe(true);
  });

  test('shows success message when displayView is \'no-time-slots\'', async () => {
    await wrapper.setState({ displayView: 'no-time-slots' });
    expect(wrapper.exists('.no_time_slot_text_wrap')).toBe(true);
  });

  test('should switch displayView if user attempts to book above the max party size of a restaurant', async () => {
    wrapper.setState({
      displayView: 'find-a-table',
      restaurantId: '173581',
      userPartySize: 36,
      renderDate: moment(),
      userTargetTime: '4:30 PM',
    }, async (state) => {
      await wrapper.instance().getTimeSlot();
      expect(state.displayView).toBe('max-party-size');
    });
  });

  test('shows success message when displayView is \'max-party-size\'', async () => {
    await wrapper.setState({ displayView: 'max-party-size' });
    expect(wrapper.exists('.no_time_slot_text_wrap')).toBe(true);
  });

  test('should switch to successful booking view when reservation is confirmed', async () => {
    wrapper.setState({
      restaurantId: '173581',
      renderDate: moment(),
      userPartySize: 2,
    }, async (state) => {
      await wrapper.instance().bookTimeSlot(null, '4:30 PM');
      expect(state.bookedTimeSlot).toBe('4:30 PM');
      expect(state.displayView).toBe('successful-book-time');
    });
  });
});
