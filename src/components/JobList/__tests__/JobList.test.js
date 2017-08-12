/* eslint-disable import/first */
jest.mock('../JobContainer', () => {
  return 'Job';
});

import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<JobList />', function () {
  let JobList;

  beforeEach(() => {
    jest.resetModules();
    JobList = require('../JobList').default;

    this.params = {
      loadIfNeeded: jest.fn(),
      isFetching: undefined,
    };

    this.makeSubject = () => {
      const { jobIds, loadIfNeeded, isFetching } = this.params;

      return mount(
        <JobList
          jobIds={jobIds}
          loadIfNeeded={loadIfNeeded}
          isFetching={isFetching}
        />
      );
    };
  });

  describe('when it has no any data', () => {
    beforeEach(() => {
      this.params.jobIds = [];

      this.subject = this.makeSubject();
    });

    it('should be same as snapshot', () => {
      expect(toJson(this.subject)).toMatchSnapshot();
    });
  });

  describe('when it has some jobs data', () => {
    beforeEach(() => {
      this.params.jobIds = [1, 2, 3];

      this.subject = this.makeSubject();
    });

    it('should be same as snapshot', () => {
      expect(toJson(this.subject)).toMatchSnapshot();
    });

    it('should has 3 items', () => {
      expect(this.subject.find('Job').length).toEqual(3);
    });
  });
});
