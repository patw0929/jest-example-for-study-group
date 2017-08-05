import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import MockDate from 'mockdate';
import storeFake from '../../../utils/testUtils';

describe('container <Timer />', () => {
  let subject;
  let Component;
  let TimerComponent;

  beforeEach(() => {
    jest.resetAllMocks();
    // Mocked Date
    MockDate.set(1501951314962);

    const store = storeFake({});
    const Timer = require('../Timer').default;
    const TimerContainer = require('../TimerContainer').default;

    subject = mount(
      <Provider store={store}>
        <TimerContainer />
      </Provider>
    );

    Component = subject.find(TimerContainer);
    TimerComponent = Component.find(Timer);
  });

  it('should be same as snapshot', () => {
    expect(TimerComponent.html()).toMatchSnapshot();
  });
});
