/* eslint-disable import/first */
jest.mock('../JobContainer', () => {
  return 'Job';
});

import React from 'react';
import { mount } from 'enzyme';

describe('<JobList />', function () {
  let JobList;

  beforeEach(() => {
    jest.resetModules();
    JobList = require('../JobList').default;

    this.params = {
      loadIfNeeded: jest.fn(),
    };

    this.makeSubject = () => {
      const { jobIds, loadIfNeeded } = this.params;

      return mount(
        <JobList
          jobIds={jobIds}
          loadIfNeeded={loadIfNeeded}
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
      expect(this.subject.html()).toMatchSnapshot();
    });
  });

  describe('when it has some jobs data', () => {
    beforeEach(() => {
      this.params.jobIds = [1, 2, 3];

      this.subject = this.makeSubject();
    });

    it('should be same as snapshot', () => {
      expect(this.subject.html()).toMatchSnapshot();
    });

    it('should has 3 items', () => {
      expect(this.subject.find('Job').length).toEqual(3);
    });
  });
});
