/* eslint-disable import/first */
jest.mock('lodash.debounce', () => {
  return func => func;
});

import React from 'react';
import { mount } from 'enzyme';
import MockDate from 'mockdate';
import styles from '../Timer.scss';

describe('<Timer />', function () {
  let Timer;

  beforeEach(() => {
    jest.resetAllMocks();
    jest.useFakeTimers();
    // Mocked Date
    MockDate.set(1501951314962);
    Timer = require('../Timer').default;

    this.params = {
      load: jest.fn(),
    };

    this.makeSubject = () => {
      const { load } = this.params;

      return mount(
        <Timer
          load={load}
        />
      );
    };
  });

  describe('when it has no any data', () => {
    beforeEach(() => {
      this.subject = this.makeSubject();
    });

    it('should be same as snapshot', () => {
      expect(this.subject.html()).toMatchSnapshot();
    });
  });

  describe('simulate click behavior', () => {

    beforeEach(() => {
      this.subject = this.makeSubject();
    });

    it('should call load function', () => {
      MockDate.set(1501954373526);
      this.subject.find(`.${styles.refresh}`).simulate('click');

      jest.runAllTimers();

      expect(this.params.load).toBeCalled();
      expect(this.subject.state().now).toMatchSnapshot();
    });
  });
});
